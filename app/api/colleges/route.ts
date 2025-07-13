import { NextResponse } from "next/server";
import { connectDB, College } from "@/lib/database";

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.toLowerCase() || "";

    // Filter colleges based on search query
    let query = {};
    if (search) {
      query = {
        name: { $regex: search, $options: "i" },
      };
    }

    const colleges = await College.find(query).select("_id name").lean();

    // Transform the response to match the expected format
    const transformedColleges = colleges.map((college) => ({
      id: (college._id as string).toString(),
      name: college.name as string,
    }));

    return NextResponse.json({
      status: "success",
      colleges: transformedColleges,
      total: transformedColleges.length,
    });
  } catch (error) {
    console.error("Colleges fetch error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch colleges",
        error: String(error),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const data = await request.json();
    const { name } = data;

    if (!name?.trim()) {
      return NextResponse.json(
        {
          status: "error",
          message: "College name is required",
        },
        { status: 400 }
      );
    }

    // Check if college already exists
    const existingCollege = await College.findOne({
      name: { $regex: `^${name.trim()}$`, $options: "i" },
    });

    if (existingCollege) {
      return NextResponse.json(
        {
          status: "error",
          message: "College already exists",
        },
        { status: 409 }
      );
    }

    // Create new college
    const newCollege = await College.create({
      name: name.trim(),
    });

    return NextResponse.json({
      status: "success",
      message: "College added successfully",
      college: {
        id: newCollege._id.toString(),
        name: newCollege.name,
      },
    });
  } catch (error) {
    console.error("Add college error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to add college",
        error: String(error),
      },
      { status: 500 }
    );
  }
}

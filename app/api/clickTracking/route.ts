import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import mongoose from "mongoose";

// Click tracking schema
const clickTrackingSchema = new mongoose.Schema(
  {
    buttonType: {
      type: String,
      required: true,
      enum: ["hero_register", "navbar_register_desktop", "navbar_register_mobile"],
    },
    userAgent: {
      type: String,
      default: "",
    },
    ipAddress: {
      type: String,
      default: "",
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    referrer: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Export model
const ClickTracking =
  mongoose.models.ClickTracking ||
  mongoose.model("ClickTracking", clickTrackingSchema);

// POST - Track register button click
export async function POST(request: Request) {
  try {
    await connectDB();

    const { buttonType, userAgent, referrer } = await request.json();

    // Get IP address from headers
    const forwarded = request.headers.get("x-forwarded-for");
    const ipAddress = forwarded ? forwarded.split(",")[0] : "unknown";

    // Validate buttonType
    const validButtonTypes = ["hero_register", "navbar_register_desktop", "navbar_register_mobile"];
    if (!validButtonTypes.includes(buttonType)) {
      return NextResponse.json(
        { error: "Invalid button type" },
        { status: 400 }
      );
    }

    // Create new click tracking record
    const clickRecord = new ClickTracking({
      buttonType,
      userAgent: userAgent || "",
      ipAddress,
      referrer: referrer || "",
    });

    await clickRecord.save();

    return NextResponse.json(
      { message: "Click tracked successfully", clickId: clickRecord._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error tracking click:", error);
    return NextResponse.json(
      { error: "Failed to track click" },
      { status: 500 }
    );
  }
}

// GET - Get click statistics
export async function GET() {
  try {
    await connectDB();

    // Get total clicks
    const totalClicks = await ClickTracking.countDocuments();

    // Get clicks by button type
    const clicksByType = await ClickTracking.aggregate([
      {
        $group: {
          _id: "$buttonType",
          count: { $sum: 1 },
        },
      },
    ]);

    // Get clicks by date (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const clicksByDate = await ClickTracking.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Get recent clicks (last 100)
    const recentClicks = await ClickTracking.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .select("buttonType createdAt ipAddress userAgent");

    return NextResponse.json({
      totalClicks,
      clicksByType: clicksByType.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      clicksByDate,
      recentClicks,
    });
  } catch (error) {
    console.error("Error fetching click statistics:", error);
    return NextResponse.json(
      { error: "Failed to fetch click statistics" },
      { status: 500 }
    );
  }
}

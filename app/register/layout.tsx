import Script from "next/script";

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-9DD3GB78NB"
      ></Script>
      <Script id="google-analytics-register">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-9DD3GB78NB');
        `}
      </Script>
      {children}
    </>
  );
}



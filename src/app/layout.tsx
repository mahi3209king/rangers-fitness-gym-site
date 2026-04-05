import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rangers Fitness | Unyielding Performance",
  description: "Elite Performance Center. Build Strength. Transform Your Life. Engineered for those who refuse to settle for average.",
  keywords: "gym, fitness, workout, personal training, powerlifting, rangers fitness",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:ital,wght@0,300;0,400;0,500;0,600;0,700;0,900;1,900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,1,0&display=swap" />
      </head>
      <body>{children}</body>
    </html>
  );
}

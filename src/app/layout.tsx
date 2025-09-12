import type { Metadata, Viewport } from "next"

import "./globals.css"

export const metadata: Metadata = {
  title: "Next.js Boilerplate 2508",
  description: "Next.js 프로젝트 보일러플레이트",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // maximumScale: 1, // 최대 확대 배율 제한
  // userScalable: false, // 확대/축소 불가 설정
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="kr">
      <body className="flex flex-col">{children}</body>
    </html>
  )
}

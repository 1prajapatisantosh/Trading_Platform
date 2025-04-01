import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import { AuthProvider } from "@/lib/auth-context"
import ClientBody from "./ClientBody"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CryptoFlex - Advanced Crypto Trading Platform",
  description: "A modern cryptocurrency trading platform with advanced charts and features",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <ClientBody>
              {children}
              <Toaster richColors position="top-right" />
            </ClientBody>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

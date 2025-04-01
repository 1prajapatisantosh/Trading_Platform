import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-2xl">CryptoFlex</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/markets" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                Markets
              </Link>
              <Link href="/trade" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                Trade
              </Link>
              <Link href="/derivatives" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                Derivatives
              </Link>
              <Link href="/wallet" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                Wallet
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="w-full py-24 md:py-32 lg:py-40 bg-gradient-to-b from-background to-background/80">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                  Trade Crypto with Confidence
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Access global markets, advanced charting, and professional tools for successful crypto trading.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/trade">Start Trading</Link>
                </Button>
                <Button variant="outline" asChild size="lg">
                  <Link href="/markets">View Markets</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              {/* Placeholder for trading chart image or animation */}
              <div className="w-full max-w-[600px] rounded-lg border bg-card p-8 shadow">
                <div className="h-[300px] w-full bg-gradient-to-br from-primary/20 to-muted rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Trading Reimagined
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Our platform offers a seamless trading experience with cutting-edge tools and features.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="m2 9 3-3 3 3" />
                  <path d="M13 18H7a2 2 0 0 1-2-2V6" />
                  <path d="m22 15-3 3-3-3" />
                  <path d="M11 6h6a2 2 0 0 1 2 2v10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Spot Trading</h3>
              <p className="text-sm text-muted-foreground text-center">
                Buy and sell cryptocurrencies at current market rates with low fees and high liquidity.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Derivatives</h3>
              <p className="text-sm text-muted-foreground text-center">
                Trade futures and options with up to 100x leverage for maximized trading potential.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Secure Wallet</h3>
              <p className="text-sm text-muted-foreground text-center">
                Store your digital assets with industry-leading security measures and cold storage.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col gap-4 md:flex-row md:gap-8">
          <div className="flex-1">
            <div className="flex h-full flex-col justify-between gap-4">
              <div className="space-y-2">
                <Link href="/" className="flex items-center space-x-2">
                  <span className="font-bold text-lg">CryptoFlex</span>
                </Link>
                <p className="text-sm text-muted-foreground">
                  Advanced cryptocurrency trading platform.
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                © 2025 CryptoFlex. All rights reserved.
              </p>
            </div>
          </div>
          <nav className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Products</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/trade" className="text-sm text-muted-foreground hover:text-foreground">
                    Trading
                  </Link>
                </li>
                <li>
                  <Link href="/derivatives" className="text-sm text-muted-foreground hover:text-foreground">
                    Derivatives
                  </Link>
                </li>
                <li>
                  <Link href="/wallet" className="text-sm text-muted-foreground hover:text-foreground">
                    Wallet
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-sm text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/help" className="text-sm text-muted-foreground hover:text-foreground">
                    Help
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </footer>
    </main>
  )
}

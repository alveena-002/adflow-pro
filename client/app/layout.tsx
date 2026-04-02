import './globals.css'

export const metadata = {
  title: 'AdFlow Pro',
  description: 'Advanced Ads Marketplace',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
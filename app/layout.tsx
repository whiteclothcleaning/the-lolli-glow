import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'The Lolli Glow | Luxury Facials & Skin Treatments | Sowerby Bridge',
  description: 'Luxury facials, microneedling, chemical peels and skin treatments in Sowerby Bridge. Step into your own relaxation zone with The Lolli Glow.',
  keywords: 'facials Sowerby Bridge, skin treatments Sowerby Bridge, microneedling Sowerby Bridge, chemical peel, glass skin facial, The Lolli Glow, Lauren',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}

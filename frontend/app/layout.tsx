import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import StyledComponentsRegistry from './lib/registry'
import GlobalStyles from './styles/GlobalStyles'
import DemoToggle from './components/DemoToggle'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Matrix Terminal Interface',
  description: 'A Matrix-style terminal interface for AI chat',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <GlobalStyles />
          <DemoToggle />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}

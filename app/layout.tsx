import './global.css'

export const metadata = {
  title: 'jakpakoun.com | Project Hub',
  description: 'A focused navigation hub for Jean-Jacques Akpakoun projects.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

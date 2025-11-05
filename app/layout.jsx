import './globals.css';

export const metadata = {
  title: 'Hollister $500 Fall/Winter Program',
  description: 'Light, airy, elegant feedback microsite style quiz',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

export const metadata = {
  title: 'Codeflix | Watch',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className=' text-white scrollbar-hide [&_nav]:hidden [&_main]:pb-0'>
        {children}
      </body>
    </html>
  );
}
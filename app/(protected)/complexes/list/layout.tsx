export default function ComplexListLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <span>ComplexList from layout</span>
      {children}
    </>
  );
}

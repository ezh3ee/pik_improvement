export default function ComplexListLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Таблица ЖК
      </h3>
      {children}
    </>
  );
}

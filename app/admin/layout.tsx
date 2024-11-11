export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 max-h-[72vh] -mt-5 ">
      <div className="inline-block text-center justify-center overflow-scroll rounded-lg scrollbar-hide">
        {children}
      </div>
    </section>
  );
}

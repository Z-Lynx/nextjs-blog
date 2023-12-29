export default function BLogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <h1 className="p-8 w-full flex flex-col items-center text-5xl font-bold">
        Blogs
      </h1>
      {children}
    </div>
  );
}

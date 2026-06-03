import RecruiterSidebar from "../components/RecruiterSidebar";

export default function RecruiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <RecruiterSidebar />

      <main className="flex-1">
        <header className="h-16 border-b flex items-center justify-end px-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-300" />

            <span>Alpesh</span>
          </div>
        </header>

        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}

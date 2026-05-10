export function Footer() {
  return (
    <footer className="w-full border-t border-indigo-300 bg-indigo-900 py-5">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">

        <div className="flex items-center gap-2">
          <span>© 2026 CourseSphere Labs</span>
        </div>

        <div className="flex items-center gap-2 text-slate-300">
          <span className="h-1 w-1 rounded-full bg-slate-400" />
          <span>Transformando o mundo com educação</span>
        </div>
        
      </div>
    </footer>
  );
}
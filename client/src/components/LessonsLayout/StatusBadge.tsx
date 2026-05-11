import { cn } from "@/lib/utils";

export function StatusBadge({ status }: { status: "draft" | "published" }) {
  const isPublished = status === "published";
  
  return (
    <span className={cn(
      "inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider border",
      isPublished 
        ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
        : "bg-amber-50 text-amber-600 border-amber-100"
    )}>
      <span className={cn(
        "mr-1.5 h-1 w-1 rounded-full",
        isPublished ? "bg-emerald-500" : "bg-amber-500"
      )} />
      {isPublished ? "Publicada" : "Rascunho"}
    </span>
  );
}
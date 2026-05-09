import { Sparkles } from "lucide-react";

export function CourseSphere() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white/15 backdrop-blur">
        <Sparkles className="h-4 w-4" />
      </div>

      <span className="text-sm font-semibold">CourseSphere</span>
    </div>
  );
}

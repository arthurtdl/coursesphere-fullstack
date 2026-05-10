import { Link } from "react-router-dom";
import { ArrowRight, User } from "lucide-react";
import type { Course } from "@/types/Course";
import { Button } from "@/components/ui/button";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-sm transition-all hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-indigo-500/10">
      {/* Thumbnail Placeholder com Gradiente */}
      <div className="relative aspect-video overflow-hidden bg-linear-to-br from-indigo-900 to-slate-800">
        <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:scale-110 transition-transform duration-500">
           <span className="text-4xl font-bold text-white uppercase tracking-tighter">
             {course.name.substring(0, 2)}
           </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold tracking-tight text-white group-hover:text-indigo-400 transition-colors">
          {course.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-slate-400 leading-relaxed">
          {course.description}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-slate-800 pt-5">
          <div className="flex items-center gap-2.5">
            <User className="h-5 w-5 text-slate-500" />
            <div className="leading-tight">
              <p className="text-xs font-medium text-slate-200">{course.author?.name || "Autor Desconhecido"}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Instrutor</p>
            </div>
          </div>

          <Button size="sm" className="bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/20" asChild>
            <Link to={`/courses/${course.id}`}>
              Acessar <ArrowRight className="ml-2 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
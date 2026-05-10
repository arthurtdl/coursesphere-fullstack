import { Link } from "react-router-dom";
import { ArrowRight, User } from "lucide-react";
import type { Course } from "@/types/Course";
import { Button } from "@/components/ui/button";
import { truncate } from "@/lib/truncate";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md">
      
      {/* Thumbnail Placeholder */}
      <div className="relative aspect-video overflow-hidden bg-linear-to-br from-indigo-500 to-violet-900">
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
        <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 group-hover:scale-110">
           <span className="text-2xl font-extrabold text-white uppercase tracking-tighter drop-shadow-md">
             {truncate(course.name, 20)}
           </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
          {course.name}
        </h3>
        
        <p className="mt-2 line-clamp-2 text-sm text-slate-600 leading-relaxed">
          {course.description}
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <User className="h-4 w-4" />
            </div>
            
            <div className="leading-tight">
              <p className="text-xs font-medium text-slate-900">
                {course.author?.name || "Autor Desconhecido"}
              </p>
              <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                Instrutor
              </p>
            </div>
          </div>

          <Button 
            size="sm" 
            className="bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm" 
            asChild
          >
            <Link to={`/courses/${course.id}`}>
              Acessar <ArrowRight className="ml-2 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
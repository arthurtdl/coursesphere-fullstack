import { Link } from "react-router-dom";
import { ArrowRight, User, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import type { Course } from "@/types/Course";
import { Button } from "@/components/ui/button";
import { truncate } from "@/lib/truncate";
import { getCourseGradient } from "@/lib/getCourseGradient";
import { cn } from "@/lib/utils";
import { useDeleteCourse } from "@/hooks/useCourses";
import { CustomAlertDialog } from "../Shared/AlertDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CourseCardProps {
  course: Course;
  isMyCourses: boolean;
  onEdit: (course: Course) => void;
}

export function CourseCard({ course, isMyCourses, onEdit }: CourseCardProps) {
  const gradientClass = getCourseGradient(course.name);
  const { mutate: deleteCourse, isPending: isDeleting } = useDeleteCourse();

  const handleDelete = () => { deleteCourse(course.id.toString()); }

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md">
      
      {/* Thumbnail Area */}
      <div className={cn("relative aspect-video overflow-hidden", gradientClass)}>
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
        
        {/* Status Badge & Actions */}
        {isMyCourses && (
          <>
            {/* Status Badge*/}
            <div className="absolute left-3 top-3 z-10">
              <span className={cn(
                "inline-flex items-center rounded-lg border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-md",
                course.status === "published"
                  ? "bg-emerald-50/90 text-emerald-700 border-emerald-200"
                  : "bg-slate-100/90 text-slate-600 border-slate-200"
              )}>
                {course.status === "published" ? "Publicado" : "Rascunho"}
              </span>
            </div>

            {/* Dropdown Actions */}
            <div className="absolute right-3 top-3 z-20">
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    className="h-8 w-8 bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white border-none"
                  >
                    <MoreHorizontal className="h-4 w-4 text-slate-700" />
                  </Button>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent align="end" className="w-40 rounded-xl border-slate-100 shadow-xl">
                  <DropdownMenuItem 
                    onClick={() => onEdit(course)}
                    className="cursor-pointer text-slate-600 focus:text-indigo-600 focus:bg-indigo-50"
                  >
                    <Pencil className="mr-2 h-4 w-4" /> Editar
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator className="bg-slate-50" />
                  
                  {/* CustomAlertDialog */}
                  <CustomAlertDialog
                    title="Excluir Curso"
                    description={`Tem certeza que deseja excluir "${course.name}"? Esta ação não pode ser desfeita.`}
                    actionName={isDeleting ? "Excluindo..." : "Excluir"}
                    onConfirm={handleDelete}
                    trigger={
                      <DropdownMenuItem 
                        onSelect={(e) => e.preventDefault()} 
                        className="cursor-pointer text-rose-600 focus:text-rose-700 focus:bg-rose-50"
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Excluir
                      </DropdownMenuItem>
                    }
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        )}

        {/* Course Name Overlay */}
        <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 group-hover:scale-110">
           <span className="text-2xl font-extrabold text-white uppercase tracking-tighter drop-shadow-md text-center px-4">
             {truncate(course.name, 20)}
           </span>
        </div>
      </div>

      {/* Card Content */}
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
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 border border-slate-100">
              <User className="h-4 w-4" />
            </div>
            
            <div className="leading-tight">
              <p className="text-xs font-bold text-slate-900">
                {course.author?.name || "Autor Desconhecido"}
              </p>
              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
                Instrutor
              </p>
            </div>
          </div>

          <Button 
            size="sm" 
            className="bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm rounded-lg h-9 px-4 transition-all active:scale-95" 
            asChild
          >
            <Link to={`/dashboard/${isMyCourses ? "my-courses" : "explore"}/${course.id}`}>
              {isMyCourses ? "Gerenciar" : "Acessar"} 
              <ArrowRight className="ml-2 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
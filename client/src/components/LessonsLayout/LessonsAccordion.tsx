"use client";

import { Pencil, Trash2, Video, FileText, ChevronDown } from "lucide-react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import type { Lesson } from "@/types/Lesson";
import { useDeleteLesson } from "@/hooks/useLessons";
import { CustomAlertDialog } from "../Shared/AlertDialog";
import { StatusBadge } from "./StatusBadge";

interface LessonAccordionProps {
  lessons: Lesson[];
  isOwner: boolean;
  courseId: string | number;
}

export function LessonAccordion({ lessons, isOwner, courseId }: LessonAccordionProps) {
  const { mutate: deleteLesson, isPending: isDeleting } = useDeleteLesson(courseId);

  const visibleLessons = isOwner 
    ? lessons 
    : lessons.filter((l) => l.status === "published");

  if (visibleLessons.length === 0) {
    return (
      <div className="py-16 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-white/50">
        <p className="text-slate-400 text-sm font-medium italic">
          Nenhuma lição disponível por aqui ainda.
        </p>
      </div>
    );
  }

  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {visibleLessons.map((lesson, index) => (
        <AccordionItem 
          key={lesson.id} 
          value={`item-${lesson.id}`}
          className="border border-slate-200 bg-white rounded-2xl overflow-hidden px-2 shadow-sm transition-all data-[state=open]:shadow-md data-[state=open]:border-indigo-100"
        >
          <div className="flex items-center gap-4 pr-4">
            <AccordionTrigger className="flex-1 hover:no-underline py-5 px-4 group [&>svg]:hidden">
              <div className="flex items-center gap-4 text-left">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-[10px] font-black text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  {String(index + 1).padStart(2, '0')}
                </div>
                
                <div className="space-y-1.5">
                  <p className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">
                    {lesson.name}
                  </p>
                  {isOwner && <StatusBadge status={lesson.status} />}
                </div>
              </div>
              <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </AccordionTrigger>

            {/* Owner Actions */}
            {isOwner && (
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-9 w-9 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Pencil className="h-4 w-4" />
                </Button>

                {/* CustomAlertDialog */}
                <CustomAlertDialog
                  title="Excluir Aula?"
                  description={`Tem certeza que deseja excluir "${lesson.name}"? Esta lição e seus dados serão removidos permanentemente.`}
                  actionName="Excluir"
                  onConfirm={() => deleteLesson(lesson.id)}
                  trigger={
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      disabled={isDeleting}
                      className="h-9 w-9 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  }
                />
              </div>
            )}
          </div>

          <AccordionContent className="px-6 pb-6 pt-2 border-t border-slate-50">
            <div className="space-y-6 pt-4">
              <div className="flex gap-3">
                <FileText className="h-4 w-4 text-slate-300 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-500 leading-relaxed italic">
                  {lesson.description || "Sem descrição disponível."}
                </p>
              </div>

              {lesson.video_url && (
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 group/link">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center shadow-sm text-indigo-600">
                      <Video className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-600 truncate max-w-50 sm:max-w-xs">
                      {lesson.video_url}
                    </span>
                  </div>
                  <a 
                    href={lesson.video_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:underline"
                  >
                    Abrir aula
                  </a>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

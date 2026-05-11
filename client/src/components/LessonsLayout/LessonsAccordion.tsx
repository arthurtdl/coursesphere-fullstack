"use client";

import { useState } from "react";
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
import { Pagination } from "../Shared/Pagination";

interface LessonAccordionProps {
  lessons: Lesson[];
  isOwner: boolean;
  courseId: string | number;
}

export function LessonAccordion({ lessons, isOwner, courseId }: LessonAccordionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const { mutate: deleteLesson, isPending: isDeleting } = useDeleteLesson(courseId);

  const visibleLessons = isOwner 
    ? lessons 
    : lessons.filter((l) => l.status === "published");

  const startIndex = (currentPage - 1) * perPage;
  const paginatedLessons = visibleLessons.slice(startIndex, startIndex + perPage);

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
    <div className="space-y-6">
      <Accordion type="single" collapsible className="w-full space-y-4">
        {paginatedLessons.map((lesson, index) => (
          <AccordionItem 
            key={lesson.id} 
            value={`item-${lesson.id}`}
            className="border border-slate-200 bg-white rounded-2xl overflow-hidden shadow-sm transition-all data-[state=open]:shadow-md data-[state=open]:border-indigo-100"
          >

            <AccordionTrigger className="w-full hover:no-underline py-5 px-6 group [&>svg]:hidden data-[state=open]:[&_.custom-chevron]:rotate-180 cursor-pointer">
              <div className="flex items-center w-full">
                
                <div className="flex items-center gap-4 flex-1 text-left min-w-0">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-[10px] font-black text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    {String(startIndex + index + 1).padStart(2, '0')}
                  </div>
                  
                  <div className="space-y-1 min-w-0 pr-4">
                    <p className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors truncate">
                      {lesson.name}
                    </p>
                    {isOwner && <StatusBadge status={lesson.status} />}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 ml-auto">
                  
                  {/* Actions for Owner */}
                  {isOwner && (
                    <div className="flex items-center gap-1 mr-2 border-r border-slate-100 pr-3">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Lógica de Edit aqui
                        }}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>

                      <CustomAlertDialog
                        title="Excluir Aula?"
                        description={`Tem certeza que deseja excluir "${lesson.name}"?`}
                        actionName="Excluir"
                        onConfirm={() => deleteLesson(lesson.id)}
                        trigger={
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            disabled={isDeleting}
                            className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        }
                      />
                    </div>
                  )}

                  <div className="p-1 rounded-full bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                    <ChevronDown className="custom-chevron h-4 w-4 transition-transform duration-300" />
                  </div>
                </div>

              </div>
            </AccordionTrigger>

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
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center shadow-sm text-indigo-600 shrink-0">
                        <Video className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-bold text-slate-600 truncate">
                        {lesson.video_url}
                      </span>
                    </div>
                    <a 
                      href={lesson.video_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:underline shrink-0"
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

      <Pagination 
        total={visibleLessons.length} 
        perPage={perPage} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
}
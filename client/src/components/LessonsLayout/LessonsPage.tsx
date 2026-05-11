"use client";

import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Calendar, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { useCourse } from "@/hooks/useCourses";
import { LessonAccordion } from "./LessonsAccordion";

export function LessonsPage() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Identify path logic
  const isOwner = pathname.includes("my-courses");
  const backPath = isOwner ? "/dashboard/my-courses" : "/dashboard/explore";

  // Data search using hook
  const { data: course, isLoading, isError } = useCourse(id);

  if (isLoading) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Carregando o conteúdo...</p>
      </div>
    );
  }

  if (isError || !course) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-6 text-center">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Curso não encontrado</h2>
          <p className="text-slate-500">O conteúdo que você busca pode ter sido removido.</p>
        </div>
        <Button onClick={() => navigate(backPath)} variant="outline" className="rounded-xl px-8">
          Voltar
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        
        {/* Navigation Header */}
        <button 
          onClick={() => navigate(backPath)}
          className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-all mb-8 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          VOLTAR PARA {isOwner ? "MEUS CURSOS" : "EXPLORAR"}
        </button>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Course Info */}
            <section className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-3xl">
                  {course.name}
                </h1>
                <p className="leading-relaxed text-slate-600">
                  {course.description}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-500 shadow-sm">
                  <Calendar className="h-4 w-4 text-indigo-500" />
                  <span>
                    {format(new Date(course.start_date), "dd 'de' MMM", { locale: ptBR })} — {format(new Date(course.end_date), "dd 'de' MMM", { locale: ptBR })}
                  </span>
                </div>
              </div>
            </section>

            {/* Course Content */}
            <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900">Grade de Aulas</h2>
                    <p className="text-sm font-medium text-slate-500">
                      {course.lessons?.length || 0} lições organizadas para você
                    </p>
                  </div>
                </div>

                {isOwner && (
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95">
                    <Plus className="mr-2 h-4 w-4" /> Nova Lição
                  </Button>
                )}
              </div>

              {/* LessonAccordion */}
              <LessonAccordion
                lessons={course.lessons || []}
                isOwner={isOwner}
                courseId={course.id}
              />
            </section>
          </div>

          <aside className="space-y-8">
            
            {/* GuestInstructor */}
            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm text-center">
              <p className="mb-8 text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
                Instrutor Convidado
              </p>
              
              <div className="flex flex-col items-center gap-4">
                <div className="h-28 w-28 rounded-full bg-slate-100 animate-pulse ring-4 ring-slate-50 shadow-inner" />
                <div className="space-y-2">
                  <div className="h-5 w-32 mx-auto rounded bg-slate-100 animate-pulse" />
                  <div className="h-4 w-48 mx-auto rounded bg-slate-100 animate-pulse" />
                </div>
              </div>
            </section>

          </aside>

        </div>
      </main>
    </div>
  );
}
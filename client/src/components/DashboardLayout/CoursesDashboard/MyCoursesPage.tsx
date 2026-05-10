"use client";

import { useState, useMemo } from "react";
import { Plus, Search } from "lucide-react";
import { useMyCourses } from "@/hooks/useCourses";
import { CourseCard } from "@/components/Courses/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type CourseStatus = "all" | "published" | "draft";

export function MyCoursesPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<CourseStatus>("all");
  
  const { data: courses, isLoading } = useMyCourses();

  const filteredCourses = useMemo(() => {
    if (!courses) return [];
    return courses.filter((c) => {
      const matchesName = c.name.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === "all" || c.status === statusFilter;
      return matchesName && matchesStatus;
    });
  }, [query, statusFilter, courses]);

  return (
    <div className="pb-10">
      {/* Header with filters */}
      <header className="bg-white border-b border-slate-200 mb-8">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
                Painel do Criador
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                Meus Cursos
              </h1>
            </div>
            
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
              <Plus className="mr-2 h-4 w-4" /> Novo Curso
            </Button>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar nos seus cursos..."
                className="pl-10 h-10 border-slate-200 focus-visible:ring-indigo-500 text-slate-900"
              />
            </div>

            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg w-fit">
              {(["all", "published", "draft"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    statusFilter === status
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {status === "all" ? "Todos" : status === "published" ? "Publicados" : "Rascunhos"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 lg:px-8">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-80 animate-pulse rounded-xl bg-slate-200" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="mt-12 py-16 text-center rounded-xl border border-dashed border-slate-300 bg-white">
                <p className="text-slate-500 text-sm font-medium">
                  Nenhum curso encontrado.
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
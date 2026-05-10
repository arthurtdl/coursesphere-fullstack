"use client";

import { useState, useMemo } from "react";
import { Search, Compass } from "lucide-react";
import { useExploreCourses } from "@/hooks/useCourses";
import { CourseCard } from "@/components/Courses/CourseCard";
import { Input } from "@/components/ui/input";
import { truncate } from "@/lib/truncate";
import { Pagination } from "@/components/Shared/Pagination";

export function ExplorePage() {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const { data: courses, isLoading, error } = useExploreCourses();

  const filteredCourses = useMemo(() => {
    if (!courses) return [];
    return courses.filter((c) =>
      c.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query, courses]);

  const paginatedCourses = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCourses.slice(start, start + itemsPerPage);
  }, [filteredCourses, currentPage]);

  const handleSearch = (val: string) => {
    setQuery(val);
    setCurrentPage(1);
  };

  if (error)
    return (
      <div className="text-center py-20 text-red-400">
        Erro ao conectar com o servidor. Tente novamente mais tarde.
      </div>
    );

  return (
    <div className="pb-10 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative w-screen left-1/2 right-1/2 -mx-[50vw] -mt-6 lg:-mt-8 mb-10 overflow-hidden bg-linear-to-br from-indigo-600 via-indigo-700 to-slate-900 px-4 py-14 text-white sm:px-12 lg:px-16">
        <div className="pointer-events-none absolute -top-24 right-10 h-72 w-72 rounded-full bg-indigo-400/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-sm">
            <Compass className="h-3.5 w-3.5" /> Catálogo da plataforma
          </div>

          <h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Aprenda com quem constrói o que há de melhor.
          </h1>

          <p className="mt-4 max-w-xl text-indigo-100 sm:text-lg">
            Cursos curados, instrutores especialistas e uma trilha clara para o
            próximo nível da sua carreira.
          </p>

          <div className="relative mt-8 max-w-xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-100" />
            <Input
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Buscar cursos por nome..."
              className="h-14 w-full border-0 bg-white pl-12 text-base text-slate-100 shadow-md ring-offset-0 placeholder:text-slate-300 focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-0"
            />
          </div>
        </div>
      </section>

      {/* Courses grid */}
      <main className="mx-auto max-w-7xl">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-80 animate-pulse rounded-xl bg-slate-200"
              />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            {filteredCourses.length === 0 ? (
              <div className="mt-12 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
                <p className="text-slate-500 font-medium">
                  {query ? `Nenhum resultado para "${truncate(query, 60)}"` : "Nenhum curso disponível"}
                </p>
              </div>
            ) : (
              <Pagination 
                total={filteredCourses.length} 
                perPage={itemsPerPage} 
                onPageChange={setCurrentPage} 
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}
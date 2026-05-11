"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchRandomInstructor } from "@/services/external";
import { UserCheck, MapPin, Mail, Loader2 } from "lucide-react";

interface GuestInstructorProps {
  courseId: string | number;
}

export function GuestInstructor({ courseId }: GuestInstructorProps) {
  const { data: instructor, isLoading, isError } = useQuery({
    queryKey: ["guest-instructor", courseId], 
    queryFn: () => fetchRandomInstructor(courseId),
    staleTime: Infinity,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8 bg-white rounded-3xl border border-slate-100 h-48">
        <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (isError || !instructor) return null;

  return (
    <div className="group relative overflow-hidden bg-white p-6 rounded-3xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
      {/* Badge */}
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-indigo-50 opacity-50 transition-transform group-hover:scale-110" />
      
      <div className="relative space-y-4">
        <div className="flex items-center gap-2 text-indigo-600">
          <UserCheck className="h-4 w-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Instrutor Convidado
          </span>
        </div>

        <div className="flex items-center gap-4">
          <img 
            src={instructor.avatar} 
            alt={instructor.name}
            className="h-14 w-14 rounded-2xl object-cover ring-2 ring-indigo-50"
          />
          <div className="min-w-0">
            <h4 className="font-bold text-slate-900 truncate">{instructor.name}</h4>
            <p className="text-xs text-indigo-600 font-medium">{instructor.specialty}</p>
          </div>
        </div>

        <div className="pt-4 space-y-2 border-t border-slate-50">
          <div className="flex items-center gap-2 text-slate-500">
            <MapPin className="h-3 w-3" />
            <span className="text-xs truncate">{instructor.location}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <Mail className="h-3 w-3" />
            <span className="text-xs truncate">{instructor.email}</span>
          </div>
        </div>
        
        <p className="text-[10px] text-slate-400 italic leading-relaxed">
          * Este instrutor foi selecionado aleatoriamente via API externa para enriquecer sua jornada.
        </p>
      </div>
    </div>
  );
}
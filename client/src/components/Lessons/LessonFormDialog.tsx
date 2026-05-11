"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import type { Lesson } from "@/types/Lesson";
import { useCreateLesson, useUpdateLesson } from "@/hooks/useLessons";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// zod verification
const lessonSchema = z.object({
  name: z.string().min(5, "No mínimo 5 caracteres"),
  description: z.string().min(10, "No mínimo 10 caracteres"),
  video_url: z.string().url("Insira uma URL válida"),
  status: z.enum(["draft", "published"], {
    message: "Selecione um status",
  }),
});

type LessonFormValues = z.infer<typeof lessonSchema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lessonToEdit?: Lesson | null;
  courseId: string | number;
}

export function LessonFormDialog({ open, onOpenChange, lessonToEdit, courseId }: Props) {
  const isEditing = !!lessonToEdit;

  // hooks
  const { mutate: createLesson, isPending: isCreating } = useCreateLesson(courseId);
  const { mutate: updateLesson, isPending: isUpdating } = useUpdateLesson(courseId);

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<LessonFormValues>({
    resolver: zodResolver(lessonSchema),
    defaultValues: { 
      name: "",
      description: "",
      video_url: "",
      status: "draft"
    }
  });

  // Form reset
  useEffect(() => {
    if (open) {
      if (lessonToEdit) {
        reset({
          name: lessonToEdit.name,
          description: lessonToEdit.description,
          video_url: lessonToEdit.video_url || "",
          status: lessonToEdit.status,
        });
      } else {
        reset({
          name: "",
          description: "",
          video_url: "",
          status: "draft",
        });
      }
    }
  }, [lessonToEdit, open, reset]);

  const onSave = (data: LessonFormValues) => {
  if (isEditing && lessonToEdit) {
    updateLesson({ 
      id: lessonToEdit.id.toString(), 
      data
    });
  } else {
    createLesson({ 
      ...data, 
      course_id: courseId 
    });
  }
};

  const isPending = isCreating || isUpdating;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-115 bg-white p-8 border-none shadow-2xl rounded-2xl">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold tracking-tight text-slate-900">
            {isEditing ? "Editar Aula" : "Nova Aula"}
          </DialogTitle>
          <DialogDescription className="text-slate-500 text-sm leading-relaxed">
            {isEditing 
              ? "Atualize as informações do conteúdo." 
              : "Preencha as informações para adicionar um novo conteúdo à grade."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSave)} className="space-y-6 mt-4">
          
          {/* Name field */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">Nome da aula</label>
            <Input
              {...register("name")}
              placeholder="Ex: Introdução ao Módulo"
              className="bg-slate-50/50 border-slate-100 h-11 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-all"
            />
            {errors.name && <p className="text-[10px] text-red-500 font-medium px-1">{errors.name.message}</p>}
          </div>

          {/* Description field */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">Descrição</label>
            <Textarea 
              {...register("description")}
              placeholder="Descreva os tópicos que serão abordados nesta aula..."
              className="w-full max-w-full max-h-24 break-all overflow-x-hidden bg-slate-50/50 border-slate-100 resize-none min-h-25 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-all"
            />
            {errors.description && <p className="text-[10px] text-red-500 font-medium px-1">{errors.description.message}</p>}
          </div>

          {/* URL field */}
          <div className="space-y-1.5">
            {/* 🟢 Tag 'Opcional' removida daqui */}
            <label className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">URL do Vídeo</label>
            <Input
              {...register("video_url")}
              placeholder="Ex: https://youtube.com/..."
              className="bg-slate-50/50 border-slate-100 h-11 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-all"
            />
            {errors.video_url && <p className="text-[10px] text-red-500 font-medium px-1">{errors.video_url.message}</p>}
          </div>

          {/* Status field */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">Status de visibilidade</label>
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <div className="flex w-full rounded-xl bg-slate-100/50 p-1.5 gap-1">
                  <button
                    type="button"
                    onClick={() => field.onChange("draft")}
                    className={cn(
                      "flex-1 rounded-lg py-2 text-xs font-bold transition-all cursor-pointer",
                      field.value === "draft"
                        ? "bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200/50"
                        : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    Rascunho
                  </button>
                  <button
                    type="button"
                    onClick={() => field.onChange("published")}
                    className={cn(
                      "flex-1 rounded-lg py-2 text-xs font-bold transition-all cursor-pointer",
                      field.value === "published"
                        ? "bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200/50"
                        : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    Publicado
                  </button>
                </div>
              )}
            />
          </div>

          {/* Save button */}
          <DialogFooter className="mt-8 gap-3 sm:gap-0">
            <Button
              type="submit"
              disabled={isPending}
              className="bg-indigo-600 min-w-35 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 rounded-xl font-bold transition-all active:scale-95 cursor-pointer"
            >
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> :
                isEditing ? "Salvar Alterações" : "Criar Aula"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
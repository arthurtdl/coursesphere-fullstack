"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { useCreateCourse } from "@/hooks/useCourses";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const courseSchema = z.object({
  name: z.string().min(5, "No mínimo 5 caracteres"),
  description: z.string().min(10, "No mínimo 10 caracteres"),
  startDate: z.date({ error: "Início obrigatório" }),
  endDate: z.date({ error: "Término obrigatório" }),
  status: z.enum(["draft", "published"], { error: "Selecione um status" }),
});

type CourseFormValues = z.infer<typeof courseSchema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CourseFormDialog({ open, onOpenChange }: Props) {
  const { mutate: createCourse, isPending } = useCreateCourse();

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: { status: "draft" }
  });

  const onSave = (data: CourseFormValues) => {
    createCourse(data, {
      onSuccess: () => {
        reset();
        onOpenChange(false)
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-115 bg-white p-8 border-none shadow-2xl rounded-2xl">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold tracking-tight text-slate-900">
            Novo Curso
          </DialogTitle>
          <DialogDescription className="text-slate-500 text-sm leading-relaxed">
            Preencha as informações para organizar seu novo conteúdo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSave)} className="space-y-6 mt-4">
          {/* Name Field */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">Nome do curso</label>
            <Input
              {...register("name")}
              placeholder="Ex: Curso de Programação"
              className="bg-slate-50/50 border-slate-100 h-11 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-all"
            />
            {errors.name && <p className="text-[10px] text-red-500 font-medium px-1">{errors.name.message}</p>}
          </div>

          {/* Description Field */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">Descrição</label>
            <Textarea 
            {...register("description")}
            placeholder="Do que se trata o curso?"
            className="w-full max-w-full max-h-24 break-all overflow-x-hiddenbg-slate-50/50 border-slate-100 resize-none min-h-25 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 transition-all"
            />
            {errors.description && <p className="text-[10px] text-red-500 font-medium px-1">{errors.description.message}</p>}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">Data de Início</label>
              <Controller
                control={control}
                name="startDate"
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-11 justify-start border-slate-100 bg-slate-50/50 px-3 font-normal text-slate-600 hover:bg-slate-100/50 transition-all",
                          !field.value && "text-slate-400"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                        {field.value ? format(field.value, "dd 'de' MMM", { locale: ptBR }) : <span>Início</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 border-none shadow-xl" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} locale={ptBR} />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.startDate && <p className="text-[10px] text-red-500 font-medium px-1">{errors.startDate.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">Data de Término</label>
              <Controller
                control={control}
                name="endDate"
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-11 justify-start border-slate-100 bg-slate-50/50 px-3 font-normal text-slate-600 hover:bg-slate-100/50 transition-all",
                          !field.value && "text-slate-400"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                        {field.value ? format(field.value, "dd 'de' MMM", { locale: ptBR }) : <span>Término</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 border-none shadow-xl" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} locale={ptBR} />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.endDate && <p className="text-[10px] text-red-500 font-medium px-1">{errors.endDate.message}</p>}
            </div>
          </div>

          {/* Course Status */}
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
                      "flex-1 rounded-lg py-2 text-xs font-bold transition-all",
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
                      "flex-1 rounded-lg py-2 text-xs font-bold transition-all",
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

          <DialogFooter className="mt-8 gap-3 sm:gap-0">
            <Button
              type="submit"
              disabled={isPending}
              className="bg-indigo-600 min-w-35 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 rounded-xl font-bold transition-all active:scale-95"
            >
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Criar agora"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
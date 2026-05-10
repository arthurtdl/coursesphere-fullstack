"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
  onSubmit: (data: CourseFormValues) => void;
}

export function CourseFormDialog({ open, onOpenChange, onSubmit }: Props) {
  const { register, handleSubmit, control, reset, formState: { errors },
  } = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
  });

  const onSave = (data: CourseFormValues) => {
    onSubmit(data);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-112.5 bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Novo Curso</DialogTitle>

          <DialogDescription>Preencha os campos abaixo.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSave)} className="space-y-4 py-2">
          {/* Name Field */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Nome</label>

            <Input
              {...register("name")}
              placeholder="Ex: React Mastery"
              className="border-slate-200 focus-visible:ring-indigo-500"
            />

            {errors.name && (
              <p className="text-[10px] text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Description Field */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Descrição
            </label>

            <Textarea
              {...register("description")}
              placeholder="Do que trata o curso?"
              className="resize-none border-slate-200 focus-visible:ring-indigo-500"
            />

            {errors.description && (
              <p className="text-[10px] text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Start Date */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Início
              </label>

              <Controller
                control={control}
                name="startDate"
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start border-slate-200 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-slate-400" />

                        {field.value ? (
                          format(field.value, "dd/MM/yyyy")
                        ) : (
                          <span className="text-slate-400">Selecione</span>
                        )}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        locale={ptBR}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />

              {errors.startDate && (
                <p className="text-[10px] text-red-500">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            {/* End Date */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Término
              </label>

              <Controller
                control={control}
                name="endDate"
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start border-slate-200 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-slate-400" />

                        {field.value ? (
                          format(field.value, "dd/MM/yyyy")
                        ) : (
                          <span className="text-slate-400">Selecione</span>
                        )}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        locale={ptBR}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />

              {errors.endDate && (
                <p className="text-[10px] text-red-500">
                  {errors.endDate.message}
                </p>
              )}
            </div>
          </div>

          {/* Status */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Status
            </label>

            <select
              {...register("status")}
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:ring-2 focus:ring-indigo-500"
              >
              <option value="">Selecione um status</option>
              <option value="draft">Rascunho</option>
              <option value="published">Publicado</option>
            </select>

            {errors.status && (
              <p className="text-[10px] text-red-500">{errors.status.message}</p>
            )}
          </div>

          <DialogFooter className="gap-2 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="text-slate-500"
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              className="bg-indigo-600 px-8 text-white hover:bg-indigo-700"
            >
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

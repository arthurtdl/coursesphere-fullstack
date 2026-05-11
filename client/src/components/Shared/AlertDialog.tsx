import type React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface AlertDialogProps {
  title: string;
  description: string;
  actionName: string;
  onConfirm: () => void;
  trigger: React.ReactNode;
}

export function CustomAlertDialog({
  title,
  description,
  actionName,
  onConfirm,
  trigger,
}: AlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>

          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>

          <AlertDialogAction onClick={onConfirm} className="cursor-pointer">
            {actionName}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

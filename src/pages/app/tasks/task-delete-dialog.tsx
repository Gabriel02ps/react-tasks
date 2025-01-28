import { deleteTaskById } from "@/api/delete-task";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Task } from "./task-table-row";

interface TaskEditionDialogProps {
  task: Task; 
}

export function TaskDeleteDialog({ task }: TaskEditionDialogProps) {
  
  const { mutateAsync: deleteTask } = useMutation({
    mutationFn: deleteTaskById,
  })

  async function handleDeleteTask() {
    try {
      await deleteTask({
        id: task.id
      })
  
      toast.success("Tarefa excluida com sucesso!"); 

      window.location.reload();
    } catch {
      toast.error("Erro ao excluir.");
    }
  }

  return (
    <DialogContent className="bg-custom-blue text-white">
      <DialogHeader>
        <DialogTitle className="text-white text-2xl">Excluir Tarefa</DialogTitle>
      </DialogHeader>
      <p>Tem certeza que deseja excluir a tarefa?</p>

      <div className="flex justify-end gap-2">
        <Button variant="ghost">Cancelar</Button>
        <Button onClick={handleDeleteTask} variant="destructive">Excluir</Button>
      </div>

    </DialogContent>
  )
}

import { Button } from "@/components/ui/button";
import { DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Task } from "./task-table-row";
import { useMutation } from "@tanstack/react-query";
import { updateTask } from "@/api/update-task";

interface TaskEditionDialogProps {
  task: Task; 
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const taskUpdateForm = z.object({
  title: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
  description: z.string().min(3, "A descrição deve ter pelo menos 3 caracteres."),
  status: z.string(),
});

type TaskUpdateForm = z.infer<typeof taskUpdateForm>;

export  function TaskEditionDialog({ task }: TaskEditionDialogProps) {
  const {
      register,
      handleSubmit,
      formState: { isSubmitting },
    } = useForm<TaskUpdateForm>();

    const { mutateAsync: update } = useMutation({
      mutationFn: updateTask,
    })

    async function handleUpdateTask(data: TaskUpdateForm) {
      try {
        await update({
          title: data.title,
          description: data.description,
          status: data.status,
          id: task.id
        })
  
        toast.success("Atualização realizada com sucesso!"); 

        window.location.reload();
      } catch {
        toast.error("Erro ao atualizar.");
      }
    }  

  return (
    <DialogContent className="bg-custom-blue text-white">
      <DialogHeader>
        <DialogTitle className="text-white text-2xl">Editar Tarefa</DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateTask)} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1 text-white">
            Título
          </label>
          <Input
            id="title"
            type="text"
            style={{ color: "white" }}
            defaultValue={task.title}
            placeholder="Digite o título"
            {...register("title")}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1 text-white">
            Descrição
          </label>
          <Input
            id="description"
            type="text"
            style={{ color: "white" }}
            defaultValue={task.description}
            placeholder="Digite sua descrição"
            {...register("description")}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1 text-white">
            Status
          </label>
          <Select defaultValue={task.status}>
            <SelectTrigger className="text-white">
              <SelectValue className="h-8 w-[180px] text-white"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pendente">Pendente</SelectItem>
              <SelectItem value="Em andamento">Pendente</SelectItem>
              <SelectItem value="Concluida">Concluída</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end">
          <DialogClose asChild>
            <Button disabled={isSubmitting} type="submit" variant="secondary" className="h-8">
              Atualizar
            </Button>
          </DialogClose>
        </div>
      </form>
    </DialogContent>
  )
}

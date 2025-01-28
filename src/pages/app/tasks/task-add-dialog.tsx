import { addTask } from "@/api/add-task";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const taskUpdateForm = z.object({
  title: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
  description: z.string().min(3, "A descrição deve ter pelo menos 3 caracteres."),
  status: z.string(),
});

type TaskUpdateForm = z.infer<typeof taskUpdateForm>;

export  function TaskAddDialog() {
  const {
      register,
      handleSubmit,
      formState: { isSubmitting },
    } = useForm<TaskUpdateForm>();

    const { mutateAsync: add } = useMutation({
      mutationFn: addTask,
    })

    async function handleUpdateTask(data: TaskUpdateForm) {
      try {
        await add({
          title: data.title,
          description: data.description,
        })
  
        toast.success("Tarefa adicionada com sucesso!"); 

        window.location.reload();
      } catch {
        toast.error("Erro ao adicionar.");
      }
    }  

  return (
    <DialogContent className="bg-custom-blue text-white">
      <DialogHeader>
        <DialogTitle className="text-white text-2xl">Adicionar Tarefa</DialogTitle>
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
            placeholder="Digite sua descrição"
            {...register("description")}
          />
        </div>

        <div className="flex justify-end">
          <DialogClose asChild>
            <Button disabled={isSubmitting} type="submit" variant="secondary" className="h-8">
              Adicionar
            </Button>
          </DialogClose>
        </div>
      </form>
    </DialogContent>
  )
}

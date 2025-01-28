import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "react-router-dom";

const taskFiltersSchema = z.object({
  taskId: z.string().optional(),
  title: z.string().optional(),
  status: z.string().optional(),
})

type TaskFiltersSchema = z.infer<typeof taskFiltersSchema>

export default function TaskTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const taskId = searchParams.get("taskId");
  const title = searchParams.get("title");
  const status = searchParams.get("status");

  const {register, handleSubmit, control} = useForm<TaskFiltersSchema>({
    resolver: zodResolver(taskFiltersSchema),
    defaultValues: {
      taskId: taskId ?? '',
      title: title ?? '',
      status: status ?? ''
    }
  })

  function handleFilter({ taskId, title, status }: TaskFiltersSchema) {
    setSearchParams(state => {
      if (taskId) {
        state.set('taskId', taskId);
      } else {
        state.delete('taskId');
      }
      if (title) {
        state.set('title', title);
      } else {
        state.delete('title');
      }
      if (status) {
        state.set('status', status);
      } else {
        state.delete('status');
      }

      state.set('page', "1");
      return state
    })
  }

  return (
    <form onSubmit={handleSubmit(handleFilter)} className="flex items-center gap-2">
      <span className="text-sm font-semibold">
        Filtros:
      </span>
      <Input placeholder="Buscar tarefa" className="h-9 w-5/6" {...register("title")}/>
      <Controller name='status' control={control} render={({ field: { name, onChange, value , disabled }}) => {
        return (
          <Select 
            defaultValue="all" 
            name={name} 
            onValueChange={onChange} 
            value={value} 
            disabled={disabled}>
              <SelectTrigger>
                <SelectValue className="h-8 w-[180px] text-white"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="progress">Em andamento</SelectItem>
                <SelectItem value="concluded">Concluída</SelectItem>
              </SelectContent>
          </Select>
        )
      }}>
        
      </Controller>

      <Button type="submit" variant={"secondary"} className="h-8 w-1/6">
        Filtrar resultados
      </Button>

      <Button type="button" variant={"ghost"} className="h-8 w-1/6">
        Remover filtros
      </Button>
    </form>
  )
}

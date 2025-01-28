import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TaskTableRow, { Task } from "./task-table-row";
import TaskTableFilters from "./task-table-filters";
import Pagination from "@/components/pagination";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TaskAddDialog } from "./task-add-dialog";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/api/get-tasks";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

export function Tasks() {
  const [searchParams, setSearchParams] = useSearchParams();

  const taskId = searchParams.get("taskId");
  const title = searchParams.get("title");  
  const status = searchParams.get("status");

  const pageIndex = z.coerce.number()
  .transform(page => page - 1)
  .parse(searchParams.get("page") ?? "1");

  const perPage = 10;

  const { data: result, isLoading, isError } = useQuery({
    queryKey: ["tasks", pageIndex, taskId, title, status],
    queryFn: () => getTasks({ pageIndex, taskId, title, status }),
  });

  if (isLoading) {
    return <p>Carregando tarefas...</p>;
  }

  if (isError || !result) {
    return <p>Erro ao carregar tarefas.</p>;
  }

  function handlePaginate(pageIndex: number) {
    setSearchParams(state => {
      state.set('page', (pageIndex + 1).toString());
      return state
    })
  }

  return (
    <>
      <Header />
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex justify-between">
          <h1 className=" text-3xl font-bold tracking-tight">Tarefas</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant='outline'>Adicionar tarefa</Button>
            </DialogTrigger>
            <TaskAddDialog />
          </Dialog>
        </div>
      <div className="space-y-2.5 mt-4">
        <TaskTableFilters />

        <div className="border rounded-md p-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">ID</TableHead>
                <TableHead className="text-white">Título</TableHead>
                <TableHead className="text-white">Descrição</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-white">Data de criação</TableHead>
                <TableHead className="text-white">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result.map((task: Task) => (
                <TaskTableRow key={task.id} task={task} />  
              ))}
            </TableBody>
          </Table>
          </div>

         { result && (
          <Pagination
            onPageChange={handlePaginate}
            totalCount={result.length}
            pageIndex={pageIndex}
            perPage={perPage}
          />
        )}     
        </div>
      </div>
    </>
  )
}

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableRow, TableCell } from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";
import { TaskEditionDialog } from "./task-edition-dialog";
import { TaskDeleteDialog } from "./task-delete-dialog";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;
}

interface TaskTableRowProps {
  task: Task; 
}

export default function TaskTableRow({ task }: TaskTableRowProps) {
  return (
    <TableRow>
      <TableCell className="font-mono text-xs font-medium">
        {task.id}
      </TableCell> 
      <TableCell> {task.title}</TableCell> 
      <TableCell>
        <p>{task.description}</p>  
      </TableCell> 
      <TableCell>
        <div className="flex items-center gap-2">
          <span>{task.status}</span>
        </div>  
      </TableCell> 
      <TableCell>{task.createdAt.slice(0, 10).split("-").reverse().join("/")}</TableCell> 
      <TableCell className="flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"edition"}>
              <Pencil />
            </Button>  
          </DialogTrigger>

          <TaskEditionDialog task={task}/>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"destructive"}>
              <Trash/>
            </Button>  
          </DialogTrigger>

          <TaskDeleteDialog task={task}/>
        </Dialog>
      </TableCell> 
    </TableRow>
  )
}

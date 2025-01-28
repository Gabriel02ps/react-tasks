import { api } from "@/lib/axios";

export interface AddTaskBody {
  title: string
  description: string
  status: string
  id: number
}

export async function updateTask({ title, description, status, id }: AddTaskBody) {
  await api.post(`/task/update/${id}`, {
    title,
    description,
    status
  });
}
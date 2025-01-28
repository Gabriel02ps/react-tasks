import { api } from "@/lib/axios";

export interface AddTaskBody {
  title: string
  description: string
}

export async function addTask({ title, description }: AddTaskBody) {
  await api.post("/task/create", {
    title,
    description
  });
}
import { api } from "@/lib/axios";

export interface DeleteTask {
  id: number
}

export async function deleteTaskById({ id }: DeleteTask) {
  await api.delete(`/task/${id}`);
}
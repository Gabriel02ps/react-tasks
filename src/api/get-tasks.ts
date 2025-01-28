import { api } from "@/lib/axios";

export interface GetTasksQuery {
  pageIndex?: number | null;
  taskId?: string | null;
  title?: string | null;
  status?: string | null;
}

export async function getTasks({ pageIndex, taskId, title, status }: GetTasksQuery) {
  try {
    const response = await api.get("/task/all", {
      params: {
        pageIndex,
        taskId,
        title,
        status
      },
    });

    return response.data; 
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
    throw error; 
  }
}

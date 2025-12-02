import type Task from "@/types/Task"
import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

export const taskService = {
  getAll: () => api.get<Task[]>("/tasks"),
  getById: (id: number) => api.get<Task>(`/tasks/${id}`),
  create: (task: Omit<Task, "id" | "created_at" | "updated_at">) =>
    api.post<Task>("/tasks", task),
  update: (id: number, task: Partial<Task>) =>
    api.patch<Task>(`/tasks/${id}`, task),
  delete: (id: number) => api.delete(`tasks/${id}`),
}

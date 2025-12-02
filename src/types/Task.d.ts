export default interface Task {
  id: number
  title: string
  description?: string
  priority: "low" | "medium" | "high"
  completed: boolean
  created_at: string
  updated_at: string
}

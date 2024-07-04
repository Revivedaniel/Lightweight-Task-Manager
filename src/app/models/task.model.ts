export interface TaskModel {
  title: string;
  description: string;
  dueDate: Date | null;
}

export interface TaskResponse extends TaskModel {
  id: number;
}

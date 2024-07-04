export interface TaskModel {
  title: string;
  description: string;
  dueDate: Date | null;
  status: 'completed' | 'active' | 'canceled';
}

export interface TaskResponse extends TaskModel {
  id: number;
}

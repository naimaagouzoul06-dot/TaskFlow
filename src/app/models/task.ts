export type Status = 'todo' | 'inprogress' | 'done';
export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  assignee: string;
  dueDate: string;
  status: Status;
}
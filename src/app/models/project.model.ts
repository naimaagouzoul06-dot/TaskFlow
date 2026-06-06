export interface Project {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'archived';
  owner: string;
  membersCount: number;
  tasksCount: number;
  completedTasks: number;
  color: string;
  createdAt: string;
}
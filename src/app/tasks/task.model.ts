export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdOn?: Date;
  completedOn?: Date;
  updatedOn?: Date;
}

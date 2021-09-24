export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN PROGRESS',
  DONE = 'DONE',
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

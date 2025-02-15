export interface ITaskHistory {
  id?: string;
  field: string;
  old_value?: string;
  new_value?: string;
  changed_at: Date;
  user_id: string;
  task_id: string;
}
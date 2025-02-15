export interface IProjectHistory {
  id?: string;
  field: string;
  old_value?: string;
  new_value?: string;
  changed_at: Date;
  user_id: string;
  project_id: string;
}
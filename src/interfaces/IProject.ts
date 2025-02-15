export interface IProject {
  id?: string;
  name: string;
  description?: string;
  start_date: Date;
  end_date?: Date;
  state_id: string;
  type_id: string;
}
import { historyActions } from "../enums/historyActions";

export interface IProjectHistory {
  id?: string;
  field: string;
  old_value?: string;
  new_value?: string;
  action: historyActions;
  user_id: string;
  project_id: string;
}
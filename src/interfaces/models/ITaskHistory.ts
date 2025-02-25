import { historyActions } from "../enums/historyActions";

export interface ITaskHistory {
  id?: string;
  field: string;
  old_value?: string;
  new_value?: string;
  action: historyActions;
  user_id: string;
  task_id: string;
}
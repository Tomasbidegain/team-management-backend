interface errors {
  property: string;
  constraints: string;
}

export interface IHttpException {
  status: number;
  message: string;
  code: string;
  errors?: errors[];
}

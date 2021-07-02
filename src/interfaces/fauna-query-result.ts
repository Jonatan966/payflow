export interface FaunaQueryResult<T> {
  ref: {
    id: string;
  };
  data: T;
}

export interface FaunaQueryResults<T> {
  data: FaunaQueryResult<T>[];
}

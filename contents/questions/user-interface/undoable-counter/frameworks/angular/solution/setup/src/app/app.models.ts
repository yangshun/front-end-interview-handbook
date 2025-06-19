export interface Operation {
  type: string;
  number: number;
}

export interface History {
  operation: string;
  oldCounter: number;
  newCounter: number;
}

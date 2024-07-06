export interface Result {
  name: string;
  height: string;
  description: string;
}
export interface Person {
  name: string;
  height: string;
}

export interface ApiResponse {
  results: Person[];
}
export interface ApiResponse<T> {
  code?: string;
  exitoso?: boolean;
  messages?: string;
  data?: Response<T>;
}

export class Pagination<T> {
  pageNumber?: number;
  pageSize?: number;
  list?: T[];
  totalElements?: number;
  totalPages?: number;
  lastRow?: boolean;
}

export class Response<T> {
  pagination?: Pagination<T>;
  t?: T;
}


export interface Paginated<T> {
  total: number;
  currentPage: number;
  nextPage: number | null;
  previousPage: number | null;
  totalPages: number;
  currentUserId?: number;
  data: T[];
}

export interface IQueryParams {
  limit?: number;
  page?: number;
}

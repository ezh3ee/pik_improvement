export type FetchedPaginatedResult<T> = {
  status: "success";
  totalPages: number;
  currentPage: number;
  data: T[] | [];
};

export type FetchError = {
  status: "error";
  error: string;
  data: null | [];
};

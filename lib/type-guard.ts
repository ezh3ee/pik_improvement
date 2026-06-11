import { FetchedPaginatedResult, FetchError } from "@/lib/types";

export function isFetchedError<T>(
  result: FetchedPaginatedResult<T> | FetchError,
): result is FetchError {
  return "error" in result;
}

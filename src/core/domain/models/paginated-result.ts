import { Pagination } from './pagination';

export class PaginatedList<T> {
  public pagination: Pagination;

  public results: T[];

  constructor(list: T[], pagination: Pagination) {
    this.results = list;
    this.pagination = pagination;
  }
}

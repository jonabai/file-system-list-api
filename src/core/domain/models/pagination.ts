export class Pagination {
  private readonly _pageSize: number;
  private readonly _page: number;
  private readonly _total: number;

  constructor(pageSize: number, page: number, total: number) {
    this._page = page;
    this._pageSize = pageSize;
    this._total = total;
  }

  get pageSize(): number {
    return this._pageSize;
  }

  get page(): number {
    return this._page;
  }

  get total(): number {
    return this._total;
  }
}

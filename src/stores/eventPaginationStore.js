import { decorate, observable, action } from "mobx";

const defaultPageSize = 20;

export class EventPaginationStore {
  page = 0;
  pageSize = defaultPageSize;
  hasNext = true;

  incrementPage() {
    if (this.hasNext) {
      this.page++;
    }
  }

  setHasNext() {
    this.hasNext = false;
  }

  resetPagination() {
    this.page = 0;
  }

  getNextPageParams = () => {
    return {
      offset: this.pageSize * this.page,
      limit: this.pageSize
    };
  };
}

decorate(EventPaginationStore, {
  page: observable,
  hasNext: observable,
  incrementPage: action,
  setHasNext: action,
  resetPagination: action
});

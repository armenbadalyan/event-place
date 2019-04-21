import { decorate, observable, action, computed } from "mobx";
import uniqBy from "lodash.uniqby";

const defaultPageSize = 20;

export class EventStore {
  eventStorage = [];
  loading = false;
  offset = 0;
  pageSize = defaultPageSize;

  constructor(eventService) {
    this.eventService = eventService;
  }

  get events() {
    return this.eventStorage;
  }

  getEvent(eventId) {
    return this.eventStorage.find(event => event.id === eventId);
  }

  setOffset(offset) {
    this.offset = offset;
  }

  resetPagination() {
    this.offset = 0;
    this.eventStorage = [];
  }

  loadEvents() {
    this.loading = true;

    return this.eventService
      .search({
        limit: this.pageSize,
        offset: this.offset
      })
      .then(
        action("loadEvents success", ({ data }) => {
          this.eventStorage = uniqBy(
            this.eventStorage.concat(data.results),
            "id"
          );
          this.setOffset(this.eventStorage.length);
        })
      )
      .finally(
        action("loadEvents complete", () => {
          this.loading = false;
        })
      );
  }

  loadEvent(eventId) {
    return this.eventService
      .get(eventId)
      .then(
        action("loadEvent success", ({ data }) => {
          let idx = this.eventStorage.findIndex(event => event.id === data.id);
          this.eventStorage.splice(idx, 1, data);
        })
      )
      .finally(
        action("loadEvent complete", () => {
          this.loading = false;
        })
      );
  }

  updateEvent(id, eventFields) {
    return this.eventService
      .update(id, eventFields)
      .then(
        action("updateEvent success", ({ data }) => {
          const event = this.getEvent(id);
          Object.assign(event, eventFields);
        })
      )
      .catch(({ response }) => {
        console.log(response);
      });
  }
}

decorate(EventStore, {
  eventStorage: observable,
  loading: observable,
  currentPage: observable,
  pageSize: observable,
  events: computed,
  nextPage: action,
  resetPagination: action,
  loadEvents: action,
  loadEvent: action,
  updateEvent: action
});

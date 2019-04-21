import { decorate, observable, action, computed } from "mobx";
import uniqBy from "lodash.uniqby";

const defaultPageSize = 20;

export class EventStore {
  eventStorage = [];
  loading = false;
  page = 0;
  pageSize = defaultPageSize;
  hasNext = true;

  constructor(eventService) {
    this.eventService = eventService;
  }

  get events() {
    return this.eventStorage;
  }

  getEvent(eventId) {
    return this.eventStorage.find(event => event.id === eventId);
  }

  resetPagination() {
    this.page = 0;
    this.eventStorage = [];
  }

  loadEvents() {
    this.loading = true;

    return this.eventService
      .search({
        limit: this.pageSize,
        offset: this.page * this.pageSize
      })
      .then(
        action("loadEvents success", ({ events, hasNext }) => {
          this.eventStorage = uniqBy(this.eventStorage.concat(events), "id");
          this.page++;
          this.hasNext = hasNext;
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
        action("loadEvent success", receviedEvent => {
          let idx = this.eventStorage.findIndex(
            event => event.id === receviedEvent.id
          );
          this.eventStorage.splice(idx, 1, receviedEvent);
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
        action("updateEvent success", () => {
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
  events: computed,
  hasNext: observable,
  setOffset: action,
  resetPagination: action,
  loadEvents: action,
  loadEvent: action,
  updateEvent: action
});

import { decorate, observable, action, computed } from "mobx";
import uniqBy from "lodash.uniqby";

export class EventStore {
  eventStorage = [];
  loading = false;

  constructor(eventService) {
    this.eventService = eventService;
  }

  get events() {
    return this.eventStorage;
  }

  getEvent(eventId) {
    return this.eventStorage.find(event => event.id === eventId);
  }

  loadEvents(paginationParams = {}) {
    this.loading = true;

    return this.eventService
      .search({
        ...paginationParams
      })
      .then(
        action("loadEvents success", ({ events, hasNext }) => {
          this.eventStorage = uniqBy(this.eventStorage.concat(events), "id");

          return {
            hasNext,
            events
          };
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

  clearEvents() {
    this.eventStorage.length = 0;
  }
}

decorate(EventStore, {
  eventStorage: observable,
  loading: observable,
  events: computed,
  loadEvents: action,
  loadEvent: action,
  updateEvent: action,
  clearEvents: action
});

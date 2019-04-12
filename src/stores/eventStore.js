import { decorate, observable, action, computed } from "mobx";
import api from "../common/api";

const defaultPageSize = 20;

class EventStore {
  eventStorage = [];
  loading = false;
  currentPage = 0;
  pageSize = defaultPageSize;

  get events() {
    return this.eventStorage;
  }

  getEvent(eventId) {
    return this.eventStorage.find(event => event.id === eventId);
  }

  nextPage() {
    this.currentPage++;
  }

  resetPagination() {
    this.currentPage = 0;
    this.eventStorage = [];
  }

  loadEvents() {
    this.loading = true;

    api
      .get("/events/search", {
        limit: this.pageSize,
        offset: this.pageSize * this.currentPage
      })
      .then(
        action("loadEvents success", ({ data }) => {
          this.eventStorage = this.eventStorage.concat(data.results);
        })
      )
      .finally(
        action("loadEvents complete", () => {
          this.loading = false;
        })
      );
  }

  loadEvent(eventId) {
    return api
      .get(`/events/${eventId}`)
      .then(
        action("loadEvent success", ({ data }) => {
          let idx = this.eventStorage.findIndex(event => event.id === data.id);
          this.eventStorage.splice(idx, 1, data); // =  eventStorage.concat(data.results);
        })
      )
      .finally(
        action("loadEvent complete", () => {
          this.loading = false;
        })
      );
  }

  updateEvent(id, eventFields) {
    return api
      .patch(`/events/${id}/`, eventFields)
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

export default new EventStore();

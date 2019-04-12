import { decorate, observable, action } from "mobx";

export class EventDetailsStore {
  eventId = null;

  constructor(eventStore) {
    this.eventStore = eventStore;
  }

  setEventId(eventId) {
    this.eventId = eventId;

    this.eventStore.loadEvent(eventId);
  }

  updateEventName(name) {
    this.eventStore.updateEvent(this.eventId, { name });
  }
}

decorate(EventDetailsStore, {
  eventId: observable,
  setEventId: action,
  updateEventName: action
});

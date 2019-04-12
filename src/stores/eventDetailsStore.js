import { decorate, observable, action } from "mobx";
import eventStore from "./eventStore";

class EventDetailsStore {
  eventId = null;

  setEventId(eventId) {
    this.eventId = eventId;

    eventStore.loadEvent(eventId);
  }

  updateEventName(name) {
    eventStore.updateEvent(this.eventId, { name });
  }
}

decorate(EventDetailsStore, {
  eventId: observable,
  setEventId: action,
  updateEventName: action
});

export default new EventDetailsStore();

import { AuthStore } from "./authStore";
import { EventStore } from "./eventStore";
import { EventDetailsStore } from "./eventDetailsStore";
import AuthService from "../services/authService";
import EventService from "../services/eventService";
import { EventPaginationStore } from "./eventPaginationStore";

export default function initStores() {
  const authService = new AuthService();
  const eventService = new EventService();
  const authStore = new AuthStore(authService);
  const eventPaginationStore = new EventPaginationStore();
  const eventStore = new EventStore(eventService);
  const eventDetailsStore = new EventDetailsStore(eventStore);

  return {
    authStore,
    eventStore,
    eventDetailsStore,
    eventPaginationStore
  };
}

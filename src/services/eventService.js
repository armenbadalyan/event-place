import api from "./api";

export default class EventService {
  get(id) {
    return api.get(`/events/${id}/`);
  }
  update(id, event) {
    return api.patch(`/events/${id}/`, event);
  }
  search(searchParams) {
    return api.get("/events/search", searchParams);
  }
}

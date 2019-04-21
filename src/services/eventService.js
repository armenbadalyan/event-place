import api from "./api";

export default class EventService {
  get(id) {
    return api.get(`/events/${id}/`).then(({ data }) => {
      return data;
    });
  }
  update(id, event) {
    return api.patch(`/events/${id}/`, event);
  }
  search(searchParams) {
    return api.get("/events/search", searchParams).then(({ data }) => {
      return {
        events: data.results,
        hasNext: !!data.next
      };
    });
  }
}

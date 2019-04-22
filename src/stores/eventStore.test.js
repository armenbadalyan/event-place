import { EventStore } from "./eventStore";

describe("eventStore tests", () => {
  test("loadEvents returns hasNext and events as provided by the server", async () => {
    let serverEvents = [
      { id: 1, start_time: "2019-07-31T22:30:00Z" },
      { id: 2, start_time: "2019-07-26T16:30:00Z" },
      { id: 3, start_time: "2019-07-26T15:00:00Z" }
    ];
    let store = setupStore(serverEvents, true);

    let { hasNext, events } = await store.loadEvents();

    expect(hasNext).toBe(true);
    events.forEach((event, idx) => {
      expect(event).toMatchObject(serverEvents[idx]);
    });
  });

  test("loadEvents saves loaded events to store", async () => {
    let serverEvents = [
      { id: 1, start_time: "2019-07-31T22:30:00Z" },
      { id: 2, start_time: "2019-07-26T16:30:00Z" },
      { id: 3, start_time: "2019-07-26T15:00:00Z" }
    ];
    let store = setupStore(serverEvents, true);

    await store.loadEvents();

    let eventsFromStore = store.events;

    eventsFromStore.forEach((event, idx) => {
      expect(event).toMatchObject(serverEvents[idx]);
    });
  });

  test("loadEvents removes duplicates from store", async () => {
    let expectedEvents = [
      { id: 1, start_time: "2019-07-31T22:30:00Z" },
      { id: 2, start_time: "2019-07-26T16:30:00Z" },
      { id: 3, start_time: "2019-07-26T15:00:00Z" }
    ];
    let serverEvents = expectedEvents.concat([
      { id: 2, start_time: "2019-07-26T16:30:00Z" }
    ]);
    let store = setupStore(serverEvents, true);

    await store.loadEvents();

    let eventsFromStore = store.events;

    eventsFromStore.forEach((event, idx) => {
      expect(event).toMatchObject(serverEvents[idx]);
    });
  });
});

function setupStore(events, hasNext) {
  return new EventStore({
    search: jest.fn().mockResolvedValue({ events, hasNext })
  });
}

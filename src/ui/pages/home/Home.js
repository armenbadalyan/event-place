import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "../../components/Header";
import EventCard from "../../components/EventCard";
import { GridRow, GridItem } from "../../components/Grid";

export class Home extends React.Component {
  componentDidMount() {
    if (this.props.eventPaginationStore.page === 0) {
      this.loadMoreEvents();
    }
  }

  loadMoreEvents = async () => {
    const paginationStore = this.props.eventPaginationStore;
    const { getNextPageParams } = paginationStore;
    const { hasNext } = await this.props.eventStore.loadEvents(
      getNextPageParams()
    );

    if (hasNext) {
      paginationStore.incrementPage();
    } else {
      paginationStore.setHasNext(false);
    }
  };

  refreshEvents = () => {
    this.props.eventStore.clearEvents();
    this.props.eventPaginationStore.resetPagination();
    this.loadMoreEvents();
  };

  render() {
    const { events } = this.props.eventStore;
    const { hasNext } = this.props.eventPaginationStore;

    return (
      <>
        <Header />
        <main>
          <EventWall>
            <InfiniteScroll
              dataLength={events}
              next={this.loadMoreEvents}
              hasMore={hasNext}
            >
              <GridRow>
                {events &&
                  events.map(event => (
                    <GridItem key={event.id}>
                      <Link to={`event/${event.id}`}>
                        <EventCard event={event} />
                      </Link>
                    </GridItem>
                  ))}
              </GridRow>
            </InfiniteScroll>
          </EventWall>
        </main>
      </>
    );
  }
}

Home.propTypes = {
  eventStore: PropTypes.shape({
    events: PropTypes.array,
    loading: PropTypes.bool,
    hasNext: PropTypes.bool,
    resetPagination: PropTypes.func,
    loadEvents: PropTypes.func
  })
};

export default inject("eventStore", "eventPaginationStore")(observer(Home));

const EventWall = styled.div`
  max-width: 1440px;
  padding: 10px;
  padding-top: 60px;
  margin: 0 auto;
`;

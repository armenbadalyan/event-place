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
    this.props.eventStore.resetPagination();
    this.props.eventStore.loadEvents();
  }

  loadMoreEvents = () => {
    this.props.eventStore.loadEvents();
  };

  render() {
    const { events, hasNext } = this.props.eventStore;

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

export default inject("eventStore")(observer(Home));

const EventWall = styled.div`
  max-width: 1440px;
  padding: 10px;
  padding-top: 60px;
  margin: 0 auto;
`;

import React from "react";
import { inject, observer } from "mobx-react";
import styled from "styled-components";
import Header from "../../components/Header";
import Image from "../../components/Image";
import PriceRange from "../../components/PriceRange";
import Padding from "../../components/Padding";
import DescriptionRenderer from "./DescriptionRenderer";
import { GridRow, GridItem13, GridItem23 } from "../../components/Grid";
import { Label, MultiLabel } from "../../components/Label";
import { formatDate, formatTime } from "../../common/utils";
import EditableLabel from "./EditableLabel";

export class EventDetails extends React.Component {
  constructor(props) {
    super(props);
    this.props.eventDetailsStore.setEventId(+this.props.match.params.id);
  }

  onSaveName = value => {
    this.props.eventDetailsStore.updateEventName(value);
  };

  render() {
    const event = this.props.eventStore.getEvent(
      this.props.eventDetailsStore.eventId
    );
    const { authStore } = this.props;

    return (
      <>
        <Header />
        <main>
          {event && (
            <EventContainer>
              <GridRow>
                <GridItem23>
                  <Image src={event.logo_uri} alt={event.name} />
                </GridItem23>
                <GridItem13>
                  <EventInfo>
                    <DetailsLabel uppercase textTheme="light">
                      {event.category && event.category.name}
                    </DetailsLabel>

                    {authStore.isLoggedIn ? (
                      <EditableLabel
                        component={MultiLabel}
                        bold
                        size="1.2rem"
                        lines={3}
                        value={event.name}
                        onSave={this.onSaveName}
                      />
                    ) : (
                      <MultiLabel bold size="1.2rem" lines={3}>
                        {event.name}
                      </MultiLabel>
                    )}

                    <Padding top="10px">
                      <DetailsLabel>
                        {formatDate(event.start_time)}
                      </DetailsLabel>
                      <DetailsLabel>
                        {formatTime(event.start_time) +
                          " - " +
                          formatTime(event.finish_time)}
                      </DetailsLabel>
                    </Padding>
                    <Padding top="10px">
                      <PriceRange
                        size="0.9rem"
                        textTheme="light"
                        bold
                        minPrice={event.min_ticket_price}
                        maxPrice={event.max_ticket_price}
                      />
                    </Padding>
                  </EventInfo>
                </GridItem13>
              </GridRow>
              <EventDescription>
                <DetailsLabel uppercase textTheme="light">
                  About this event
                </DetailsLabel>
                <DescriptionRenderer htmlText={event.description_html} />
              </EventDescription>
            </EventContainer>
          )}
        </main>
      </>
    );
  }
}

const EventContainer = styled.article`
  max-width: 1080px;
  margin: 0 auto;
  margin-top: 80px;
  background-color: white;
`;

const EventInfo = styled.section`
  padding: 10px;
`;

const EventDescription = styled.section`
  padding: 10px;
`;

const DetailsLabel = styled(Label).attrs(props => ({
  bold: true,
  textTheme: "light",
  size: "0.9rem"
}))``;

export default inject("eventStore", "eventDetailsStore", "authStore")(
  observer(EventDetails)
);

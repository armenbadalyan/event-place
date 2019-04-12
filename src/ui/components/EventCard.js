import React from "react";
import styled from "styled-components";
import moment from "moment";
import { Label, MultiLabel } from "./Label";
import Image from "./Image";

export default function EventCard({ event }) {
  const startDate = moment(event.start_time);
  return (
    <CardContainer>
      <Image src={event.logo_uri} alt={event.name} />
      <EventDetails>
        <EventDate>
          <Label uppercase bold textTheme="accent">
            {startDate.format("MMM")}
          </Label>
          <Label uppercase size="1rem" textTheme="light">
            {startDate.format("DD")}
          </Label>
        </EventDate>
        <EventMainInfo>
          <Label uppercase bold textTheme="light">
            {event.category && event.category.name}
          </Label>
          <MultiLabel bold size="0.9rem" lines={3}>
            {event.name}
          </MultiLabel>
          <Label textTheme="light">{`Starts from $${parseFloat(
            event.min_ticket_price
          ).toFixed(2)}`}</Label>
        </EventMainInfo>
      </EventDetails>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: "stretch";
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  :hover {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    background-color: white;
  }
`;

const EventDetails = styled.div`
  flex: 1;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  padding-top: 10px;
`;

const EventDate = styled.div`
  width: 3rem;
`;

const EventMainInfo = styled.section`
  flex: 1;
`;

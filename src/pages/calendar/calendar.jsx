import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import { faCheck, faCog, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from '@themesberg/react-bootstrap';




export class Calendar extends React.Component {
    calendarComponentRef = React.createRef();

    calendarComponentRef = React.createRef();

    state = {
        calendarWeekends: true,
        calendarEvents: [
            // initial event data
            { title: "Event Now", start: new Date() }
        ]
    };
  constructor(props) {
    super(props);


  }

  componentDidMount() {
    console.log("mounting")
  }
    toggleWeekends = () => {
        this.setState({
            // update a property
            calendarWeekends: !this.state.calendarWeekends
        });
    };

    gotoPast = () => {
        let calendarApi = this.calendarComponentRef.current.getApi();
        calendarApi.gotoDate("2000-01-01"); // call a method on the Calendar object
    };

    handleDateClick = arg => {

    };
  render() {
    return (
        <>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
            <div className="d-block mb-4 mb-md-0">
              <Breadcrumb className="d-none d-md-inline-block"
                          listProps={{className: "breadcrumb-dark breadcrumb-transparent"}}>
                <Breadcrumb.Item><FontAwesomeIcon icon={faHome}/></Breadcrumb.Item>
                <Breadcrumb.Item>Calendar</Breadcrumb.Item>
              </Breadcrumb>
              <h4>Calendar</h4>
              <p className="mb-0">Tweet Schedule below.</p>
            </div>

          </div>
            <FullCalendar
                defaultView="dayGridMonth"
                header={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
                }}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                ref={this.calendarComponentRef}
                weekends={this.state.calendarWeekends}
                events={this.state.calendarEvents}
                dateClick={this.handleDateClick}
            />
        </>
    );
  };
}

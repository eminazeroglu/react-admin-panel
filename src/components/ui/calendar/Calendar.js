import React from 'react';
import "./Calendar.css"
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from "moment";
import azLocale from "@fullcalendar/core/locales/az";

function Calendar(
    {
        dataSource,
        interval = '30',
        eventContent = false,
        eventClick,
        dateClick,
        ...props
    }
) {

    const renderEventContent = (event) => {
        const item = event.event;
        return (
            <div className="px-2 w-full">
                <button
                    type={'button'}
                    className="p-1 flex cursor-pointer flex-col text-xs w-full overflow-hidden text-[8px] md:text-xs"
                    style={{
                        backgroundColor: item?.backgroundColor,
                        color: item?.textColor
                    }}
                    id={item.id}
                    onClick={() => eventClick ? eventClick(item) : false}
                >
                    <span>{item.title}</span>
                    <span>({moment(item.start).format('HH:mm')})</span>
                </button>
            </div>
        )
    }

    return (
        <FullCalendar
            locale={azLocale}
            events={dataSource}
            initialDate={new Date()}
            initialView='dayGridMonth'
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
                left: '',
                center: '',
                right: 'dayGridMonth,timeGridWeek,timeGridDay prev,today,next',
            }}
            slotDuration={`00:${interval}:00`}
            contentHeight="auto"
            dateClick={dateClick ? dateClick : false}
            eventContent={eventContent ? eventContent : renderEventContent}
            {...props}
        />
    );
}

export default Calendar;

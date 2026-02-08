import { type EventContentArg } from '@fullcalendar/core';


const ReportFullCalendarEventContent = (arg: EventContentArg) => {
    const timeText = arg.timeText ?? '';

    return (
        <div className="bg-blue-500 text-white rounded px-1 text-xs">
            {timeText} {arg.event.title}
        </div>
    );
};

export default ReportFullCalendarEventContent;
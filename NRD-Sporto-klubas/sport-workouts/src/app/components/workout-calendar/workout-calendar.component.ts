import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs/Subject';
import { getMonth, startOfMonth, startOfWeek, endOfWeek  } from 'date-fns';
import { AlertModule } from 'ng2-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarDateFormatter
} from 'angular-calendar';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import * as RRule from 'rrule';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

interface RecurringEvent {
  title: string;
  color: any;
  rrule?: {
    freq: RRule.Frequency,
    bymonth?: number,
    bymonthday?: number,
    byweekday?: RRule.Weekday[]
  };
}


@Component({
  selector: 'app-workout-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './workout-calendar.component.html',
  styleUrls: ['./workout-calendar.component.css'],
   providers: [{
    provide: CalendarDateFormatter,
    useClass: CustomDateFormatter
  }]
})

export class WorkoutCalendarComponent implements OnInit{

  view: string = 'month';

  viewDate: Date = new Date();

  recurringEvents: RecurringEvent[] = [{
    title: 'Recurs on the 5th of each month',
    color: colors.yellow,
    rrule: {
      freq: RRule.MONTHLY,
      bymonthday: 5
    }
  }, {
    title: 'Recurs yearly on the 10th of the current month',
    color: colors.blue,
    rrule: {
      freq: RRule.YEARLY,
      bymonth: getMonth(new Date()) + 1,
      bymonthday: 10
    }
  }, {
    title: 'Recurs weekly on mondays',
    color: colors.red,
    rrule: {
      freq: RRule.WEEKLY,
      byweekday: [RRule.MO],
    }
  }];


calendarEvents: CalendarEvent[] = [];
  ngOnInit() {
     this.updateCalendarEvents();
  }
  @ViewChild('modalContent') modalContent: TemplateRef<any>;


   locale: string = 'lt';

  modalData: {
    action: string,
    event: CalendarEvent
  };

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [{
    start: subDays(startOfDay(new Date()), 1),
    end: addDays(new Date(), 1),
    title: 'A 3 day event',
    color: colors.red
  }, {
    start: startOfDay(new Date()),
    title: 'An event with no end date',
    color: colors.yellow
  }, {
    start: subDays(endOfMonth(new Date()), 3),
    end: addDays(endOfMonth(new Date()), 3),
    title: 'A long event that spans 2 months',
    color: colors.blue
  }];

  activeDayIsOpen: boolean = true;

  constructor(private modal: AlertModule) {}

  dayClicked({date, events}: {date: Date, events: CalendarEvent[]}): void {

    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }
  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = {event, action};
  }
  
    updateCalendarEvents(): void {

    this.calendarEvents = [];

    const startOfPeriod: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay
    };

    const endOfPeriod: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay
    };

    this.recurringEvents.forEach(event => {

      const rule: RRule = new RRule(Object.assign({}, event.rrule, {
        dtstart: startOfPeriod[this.view](this.viewDate),
        until: endOfPeriod[this.view](this.viewDate)
      }));

      rule.all().forEach((date) => {
        this.calendarEvents.push(Object.assign({}, event, {
          start: new Date(date)
        }));
      });

    });

  }

}
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
import { getMonth, startOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { AlertModule } from 'ng2-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarDateFormatter
} from 'angular-calendar';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import * as RRule from 'rrule';
import { DataServiceService } from "app/services/data-service.service";
import { Workout } from "app/models/workout";


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
      id: number;
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
  providers: [DataServiceService]
})

export class WorkoutCalendarComponent implements OnInit {
  workouts: Workout[];


  isLoading: boolean = false;
  constructor(private modal: AlertModule, private dataService: DataServiceService) { }

  view: string = 'month';

  viewDate: Date = new Date();


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
  activeDayIsOpen: boolean = true;

  recurringEvents: RecurringEvent[] = [{
    id: 1,
    title: 'Kojų ir pilvo preso treniruotė',
    color: colors.red,
    rrule: {
      freq: RRule.MONTHLY,
      byweekday: RRule.MO.nth(+2), // MO nurodo primadieni, +2 nurodo kad bus antra menesio savaite
    }
  }];

  dayClicked({ date, events }: { date: Date, events: CalendarEvent[] }): void {

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
    this.modalData = { event, action };
    console.log(this.modalData);
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
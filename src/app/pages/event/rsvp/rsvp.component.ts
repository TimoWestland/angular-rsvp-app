import {
  Component,
  OnInit,
  Input,
  OnDestroy
} from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { ApiService } from '../../../core/api.service';
import { UtilsService } from '../../../core/utils.service';
import { FilterSortService } from '../../../core/filter-sort.service';
import { RsvpModel } from '../../../core/models/rsvp.model';
import { Subscription } from 'rxjs/Subscription';
import { expandCollapse } from '../../../core/expand-collapse.animation';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss'],
  animations: [expandCollapse],
})
export class RsvpComponent implements OnInit, OnDestroy {
  rsvpsSub: Subscription;
  rsvps: RsvpModel[];
  loading: boolean;
  error: boolean;
  userRsvp: RsvpModel;
  totalAttending: number;
  footerTense: string;
  showAllRsvps = false;
  showRsvpsText = 'View All RSVPs';

  @Input() eventId: string;
  @Input() eventPast: string;

  constructor(private api: ApiService,
              public auth: AuthService,
              public utils: UtilsService,
              public fs: FilterSortService) { }

  ngOnInit() {
    this.footerTense = !this.eventPast ? 'plan to attend this event.' : 'attended this event.';
    this._getRSVPs();
  }

  private _getRSVPs() {
    this.loading = true;
    // Get RSVPs by event ID
    this.rsvpsSub = this.api
      .getRsvpsByEventId$(this.eventId)
      .subscribe(
        res => {
          this.rsvps = res;
          this._updateRsvpState();
          this.loading = false;
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
        }
      );
  }

  toggleShowRsvps() {
    this.showAllRsvps = !this.showAllRsvps;
    this.showRsvpsText = this.showAllRsvps ? 'Hide RSVPs' : 'Show All RSVPs';
  }

  private _updateRsvpState() {
    // TODO: we will add more functionality here later
    this._setUserRsvpGetAttending();
  }

  private _setUserRsvpGetAttending() {
    // Iterate over RSVPs to get/set user's RSVP
    // and get total number of attending guests
    let guests = 0;
    const rsvpArr = this.rsvps.map(rsvp => {
      // If user has an existing RSVP
      if (rsvp.userId === this.auth.userProfile.sub) {
        this.userRsvp = rsvp;
      }
      // Count total number attendees
      // + additional guests
      if (rsvp.attending) {
        guests++;
        if (rsvp.guests) {
          guests += rsvp.guests;
        }
      }
      return rsvp;
    });
    this.rsvps = rsvpArr;
    this.totalAttending = guests;
  }

  ngOnDestroy() {
    this.rsvpsSub.unsubscribe();
  }
}

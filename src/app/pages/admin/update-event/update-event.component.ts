import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../../auth/auth.service';
import { ApiService } from '../../../core/api.service';
import { UtilsService } from '../../../core/utils.service';
import { EventModel } from '../../../core/models/event.model';


@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.scss']
})
export class UpdateEventComponent implements OnInit, OnDestroy {
  pageTitle = 'Update Event';
  routeSub: Subscription;
  eventSub: Subscription;
  event: EventModel;
  loading: boolean;
  error: boolean;
  tabSub: Subscription;
  tab: string;
  private _id: string;

  constructor(private route: ActivatedRoute,
              private api: ApiService,
              private title: Title,
              public auth: AuthService,
              public utils: UtilsService) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);

    // Set event ID from route params and subscribe
    this.routeSub = this.route.params
      .subscribe(params => {
        this._id = params['id'];
        this._getEvent();
      });

    // Subscribe to query params to watch for tab changes
    this.tabSub = this.route.queryParams
      .subscribe(queryParams => {
        this.tab = queryParams['tab'] || 'edit';
      });
  }

  private _getEvent() {
    this.loading = true;
    // Get event by ID
    this.eventSub = this.api
      .getEventById$(this._id)
      .subscribe(
        res => {
          this.event = res;
          this.loading = false;
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
        }
      );
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.tabSub.unsubscribe();
    this.eventSub.unsubscribe();
  }
}

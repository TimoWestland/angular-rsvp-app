import { Component } from '@angular/core';

@Component({
  selector: 'app-submitting',
  template: `
    <img src="/assets/images/loading.svg" alt="Form submitting...">
  `,
  styles: [`
    :host {
      display: inline-block;
    }

    img {
      display: inline-block;
      width: 30px;
      margin: 4px 3px;
    }
  `]
})
export class SubmittingComponent {}

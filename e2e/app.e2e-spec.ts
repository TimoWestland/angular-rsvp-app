import { MeanRsvpPage } from './app.po';

describe('mean-rsvp App', () => {
  let page: MeanRsvpPage;

  beforeEach(() => {
    page = new MeanRsvpPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});

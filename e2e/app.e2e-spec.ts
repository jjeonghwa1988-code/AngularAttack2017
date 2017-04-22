import { LeapPage } from './app.po';

describe('leap App', () => {
  let page: LeapPage;

  beforeEach(() => {
    page = new LeapPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

import { TwinMoonPage } from './app.po';

describe('twin-moon App', () => {
  let page: TwinMoonPage;

  beforeEach(() => {
    page = new TwinMoonPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

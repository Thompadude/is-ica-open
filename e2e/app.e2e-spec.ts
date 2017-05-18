import { BalooPage } from './app.po';

describe('baloo App', () => {
  let page: BalooPage;

  beforeEach(() => {
    page = new BalooPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

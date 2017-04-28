import { Matias2588ContextmenuPage } from './app.po';

describe('matias2588-contextmenu App', function() {
  let page: Matias2588ContextmenuPage;

  beforeEach(() => {
    page = new Matias2588ContextmenuPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

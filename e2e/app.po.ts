import { browser, element, by } from 'protractor';

export class Matias2588ContextmenuPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}

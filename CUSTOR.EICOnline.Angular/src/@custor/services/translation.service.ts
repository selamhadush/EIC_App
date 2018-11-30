import { of as observableOf, Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { TranslateService, TranslateLoader } from '@ngx-translate/core';

declare const require: any;

@Injectable()
export class AppTranslationService {
  private _languageChanged = new Subject<string>();
  readonly defaultLanguage = 'et';

  constructor(private translate: TranslateService) {
    this.setDefaultLanguage(this.defaultLanguage);
  }

  addLanguages(lang: string[]) {
    this.translate.addLangs(lang);
  }

  setDefaultLanguage(lang: string) {
    this.translate.setDefaultLang(lang);
  }

  getDefaultLanguage() {
    return this.translate.defaultLang;
  }

  getBrowserLanguage() {
    return this.translate.getBrowserLang();
  }

  useBrowserLanguage(): string | void {
    let browserLang = this.getBrowserLanguage();

    if (browserLang.match(/en|am/)) {
      this.changeLanguage(browserLang);
      return browserLang;
    }
  }

  changeLanguage(language: string = 'et') {
    if (!language) {
      language = this.translate.defaultLang;
    }

    if (language != this.translate.currentLang) {
      setTimeout(() => {
        this.translate.use(language);
        this._languageChanged.next(language);
      });
    }

    return language;
  }

  getTranslation(key: string | Array<string>, interpolateParams?: Object): string | any {
    return this.translate.instant(key, interpolateParams);
  }

  getTranslationAsync(key: string | Array<string>, interpolateParams?: Object): Observable<string | any> {
    return this.translate.get(key, interpolateParams);
  }

  languageChangedEvent() {
    return this._languageChanged.asObservable();
  }
}

export class TranslateLanguageLoader implements TranslateLoader {
  public getTranslation(lang: string): any {
    switch (lang) {
      case 'en':
        return observableOf(require('../../app/assets/locale/en.json'));
      case 'et':
        return observableOf(require('../../app/assets/locale/et.json'));

      default:
    }
  }
}
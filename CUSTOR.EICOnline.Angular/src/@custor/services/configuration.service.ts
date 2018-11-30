import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppTranslationService } from './translation.service';
import { LocalStoreManager } from './storeManager.service';
import { settingKeys } from '../helpers/settingKeys';
import { Utilities } from '../helpers/utilities';
import { environment } from '../../environments/environment';

// tslint:disable-next-line:interface-over-type-literal
type UserConfiguration = {
    language: string,
    homeUrl: string,
    themeId: number
};

@Injectable()
export class ConfigurationService {
    public static readonly appVersion: string = '1.0';

    // public baseUrl = environment.baseUrl || Utilities.baseUrl();
    public baseUrl = 'http://localhost:5050/';
    // public tokenUrl = environment.tokenUrl || environment.baseUrl || Utilities.baseUrl();
    public tokenUrl = 'http://localhost:5050';
    public loginUrl = environment.loginUrl;
    public fallbackBaseUrl = 'http://custor.net';

    public static readonly defaultLanguage: string = 'et';
    public static readonly defaultHomeUrl: string = '/';
    public static readonly defaultThemeId: number = 1;

    private _language: string = null;
    private _homeUrl: string = null;
    private _themeId: number = null;

    private onConfigurationImported: Subject<boolean> = new Subject<boolean>();

    configurationImported$ = this.onConfigurationImported.asObservable();

    constructor(
        private localStorage: LocalStoreManager,
        private translationService: AppTranslationService,
    ) {
        this.loadLocalChanges();
    }

    private loadLocalChanges() {
        if (this.localStorage.exists(settingKeys.LANGUAGE)) {
            this._language = this.localStorage.getDataObject<string>(settingKeys.LANGUAGE);
            this.translationService.changeLanguage(this._language);
        } else {
            this.resetLanguage();
        }

        if (this.localStorage.exists(settingKeys.HOME_URL)) {
            this._homeUrl = this.localStorage.getDataObject<string>(settingKeys.HOME_URL);
        }

        if (this.localStorage.exists(settingKeys.THEME_ID)) {
            this._themeId = this.localStorage.getDataObject<number>(settingKeys.THEME_ID);
        }
    }

    private saveToLocalStore(data: any, key: string) {
        setTimeout(() => this.localStorage.savePermanentData(data, key));
    }

    public import(jsonValue: string) {
        this.clearLocalChanges();

        if (jsonValue) {
            const importValue: UserConfiguration = Utilities.JsonTryParse(jsonValue);

            if (importValue.language != null) {
                this.language = importValue.language;
            }

            if (importValue.homeUrl != null) {
                this.homeUrl = importValue.homeUrl;
            }

            if (importValue.themeId != null) {
                this.themeId = importValue.themeId;
            }
        }

        this.onConfigurationImported.next();
    }

    public export(changesOnly = true): string {
        const exportValue: UserConfiguration = {
                language: changesOnly ? this._language : this.language,
                homeUrl: changesOnly ? this._homeUrl : this.homeUrl,
                themeId: changesOnly ? this._themeId : this.themeId
            };

        return JSON.stringify(exportValue);
    }

    public clearLocalChanges() {
        this._language = null;
        this._homeUrl = null;
        this._themeId = null;

        this.localStorage.deleteData(settingKeys.LANGUAGE);
        this.localStorage.deleteData(settingKeys.HOME_URL);
        this.localStorage.deleteData(settingKeys.THEME_ID);

        this.resetLanguage();
    }

    private resetLanguage() {
        const language = this.translationService.useBrowserLanguage();

        if (language) {
            this._language = language;
        } else {
            this._language = this.translationService.changeLanguage();
        }
    }

    set language(value: string) {
        this._language = value;
        this.saveToLocalStore(value, settingKeys.LANGUAGE);
        this.translationService.changeLanguage(value);
    }
    get language() {
        return this._language || ConfigurationService.defaultLanguage;
    }

    set homeUrl(value: string) {
        this._homeUrl = value;
        this.saveToLocalStore(value, settingKeys.HOME_URL);
    }
    get homeUrl() {
        return this._homeUrl || ConfigurationService.defaultHomeUrl;
    }

    set themeId(value: number) {
        this._themeId = value;
        this.saveToLocalStore(value, settingKeys.THEME_ID);
    }
    get themeId() {
        return this._themeId || ConfigurationService.defaultThemeId;
    }
}

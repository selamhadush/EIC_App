import { FormGroup, FormControl, FormBuilder, Validators, NgForm, Form } from '@angular/forms';
import { Component, ViewEncapsulation, ChangeDetectionStrategy, NgModule, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule, MatMenuModule, MatMenuTrigger, MatButtonModule, MatIconModule, MatTooltipModule } from '@angular/material';
import { ConfigurationService } from '../../services/configuration.service';

@Component({
  selector: 'app-lang-switcher',
  templateUrl: 'lang-switcher.component.html',
  styleUrls: ['lang-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LangSwitcher {
  // @ViewChild('form')
  // langForm: FormGroup;
  selectedLanguage: string;
  selectedLanguageName: string;
  languages: UserLanguage[] = [
    { name: 'English', locale: 'en' },
    { name: 'አማርኛ', locale: 'et' },
  ];
  constructor(private config: ConfigurationService) {
    config.configurationImported$.subscribe(() => this.setLang(this.currentLang));
    this.selectedLanguage = this.currentLang;
    this.selectedLanguageName = this.getLangName(this.selectedLanguage);
  }
  get currentLang(): string {
    return this.config.language || '';
  }

  setLang(lang: string) {
    if (lang) {
      this.config.language = lang;
      this.selectedLanguage = lang;
      this.selectedLanguageName = this.getLangName(lang);
    }
  }
  private getLangName(locale: string): string {
    switch (locale) {
      case 'et':
        return 'አማርኛ';
      case 'en':
        return 'English';
      default:
        return 'አማርኛ';
    }
  }
}

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatSelectModule,
    MatTooltipModule
  ],
  exports: [LangSwitcher],
  declarations: [LangSwitcher],
  providers: [ConfigurationService],
})
export class LangSwitcherModule { }

export interface UserLanguage {
  name: string;
  locale: string;
}
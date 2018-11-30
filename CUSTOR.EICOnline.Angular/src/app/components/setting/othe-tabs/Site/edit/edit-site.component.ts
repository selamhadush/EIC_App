import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {SitesService} from '../site.service';
import {ToastrService} from 'ngx-toastr';
import {AppConfiguration} from '../../../../../config/appconfig';
import {SiteModel} from '../../../../../model/Site.model';
import {ErrorMessage} from '../../../../../../@custor/services/errMessageService';

@Component({
  selector: 'app-edit-site',
  templateUrl: './edit-site.component.html',
  styleUrls: ['./edit-site.component.scss']
})
export class EditSiteComponent implements OnInit, OnDestroy {
  @ViewChild('form')

  sitesSub: Subscription;
  private form: NgForm;
  title: string;
  /*siteId:number;*/
  isNewSite = false;
  sites: SiteModel;

  /*sitesModel: SiteModel[] = [];*/
  sitesForm: FormGroup;
  loadingIndicator: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private config: AppConfiguration,
              private sitesService: SitesService, private errMsg: ErrorMessage,
              private toastr: ToastrService,
              private fb: FormBuilder) {
    this.sites = <SiteModel>{};
    // initialize the form
    this.initForm();
    this.initStaticData('en');
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id < 1) {
      this.isNewSite = true;
      this.title = 'Create a new Site';
      /*this.getSite();*/
      return;
    }
    if (id) {
      // to-do
      // get the selected customer either through @Input or shared site
      this.getSites(id);
    }
  }

  initStaticData(currentLang) {
  }

  getSites(id) {
    this.isNewSite = false;
    this.loadingIndicator = true;
    this.sitesSub = this.sitesService
      .getSite(id)
      .subscribe(result => {
          this.sites = result;
          this.updateForm();
        },
        error => this.toastr.error(this.errMsg.getError(error)));
    this.loadingIndicator = false;
  }

  updateForm() {
    this.sitesForm.setValue({
      cIsActive: this.sites.IsActive,
      cName: this.sites.Name == null ? '' : this.sites.Name.toString(),
      cNameEnglish: this.sites.NameEnglish == null ? '' : this.sites.NameEnglish.toString(),
    });
    // },4000);

    this.isNewSite = false;
  }

  initForm() {
    this.sitesForm = this.fb.group({
      cIsActive: true,
      cName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50),
        Validators.pattern('^([ \u1200-\u137F])+$')])],
      cNameEnglish: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(62),
        Validators.pattern('^[a-zA-Z /]+$')])]
    });
  }

  public onSubmit() {
    if (!this.sitesForm.valid) {
      return;
    }

    if (this.isNewSite) {
      /* if (this.checkRecordExistance()) {
         this.toastr.show(
           'Record Exist', 'message', {
             closeButton: true
           })
         return;
       }*/
      this.loadingIndicator = true;
    }
    return this.sitesService.saveSite(
      this.getEditedSite()).subscribe((sites: SiteModel) => {
        this.saveCompleted(sites);
      },
      err => this.handleError(err));
  }

  /* checkRecordExistance(): boolean {
     const formModel = this.sitesForm.value;
     this.sitesSub = this.sitesService
       .getSites(formModel.cNameEnglish, formModel.cSiteType)
       .subscribe(result => {
         this.sites = result
       })
     if (this.sites.SiteId == null) {
       return false;
     } else {
       return true;
     }
   }*/

  private saveCompleted(sites ?: SiteModel) {
    if (sites) {
      this.sites = sites;
    }
    this.loadingIndicator = false;
    this.toastr.success('Record saved successfully!');
   // this.router.navigate(['sites/list']);
    window.history.back();
  }

  private handleError(err) {
    this.loadingIndicator = false;
    this.toastr.error(this.errMsg.getError(err));
    this.loadingIndicator = false;
  }

  private getEditedSite(): SiteModel {
    const formModel = this.sitesForm.value;
    return {
      SiteId: this.isNewSite ? null : this.sites.SiteId,
      Name: formModel.cName,
      NameEnglish: formModel.cNameEnglish,
      IsActive: formModel.cIsActive,
    };
  }

  ngOnDestroy() {
    // this.sitesSub.unsubscribe();
  }

  onBack() {
    // this.router.navigate(['sites/list']);
    window.history.back();
  }

  get Name() { return this.sitesForm.get('cName'); }
  get NameEnglish() { return this.sitesForm.get('cNameEnglish'); }
}

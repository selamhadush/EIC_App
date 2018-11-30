import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorMessage} from '@custor/services/errMessageService';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {LookuptypesModel} from '../../../../../model/lookuptypes';
import {ActivatedRoute, Router} from '@angular/router';
import {LookupsModel} from '../../../../../model/lookups';
import {determineId} from '@custor/helpers/compare';
import {Subscription} from 'rxjs/index';
import {AppConfiguration} from '../../../../../config/appconfig';
import {ToastrService} from 'ngx-toastr';
import {LookupsService} from '../lookups.service';

@Component({
  selector: 'app-edit-lookups',
  templateUrl: './edit-lookups.component.html',
  styleUrls: ['./edit-lookups.component.scss']
})
export class EditLookupsComponent implements OnInit, OnDestroy {
  @ViewChild('form')

  sublookupsSub: Subscription;
  private form: NgForm;
  title: string;
  isNewSubLookups = false;
  sublookups: LookupsModel;
  lookuptypesModels: LookuptypesModel[] = [];

  subLookupsForm: FormGroup;
  loadingIndicator: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private config: AppConfiguration,
              private sublookupsService: LookupsService, private errMsg: ErrorMessage,
              private toastr: ToastrService,
              private fb: FormBuilder) {
    this.sublookups = <LookupsModel>{};
    // initialize the form
    this.initForm();
    this.initStaticData('en');
  }

  ngOnInit() {
    this.getLookupstype();
    const id = this.activatedRoute.snapshot.params['id'];
    if (id < 1) {
      this.isNewSubLookups = true;
      this.title = 'Create a new Lookup';
      /*this.getService();*/
      return;
    }
    if (id) {
      this.getLookup(id);
    }
  }

  getLookupstype() {
    this.sublookupsService.getLookuptype()
      .subscribe(result => {
          this.lookuptypesModels = result;
        },
        error => this.toastr.error(this.errMsg.getError(error)));
  }

  initStaticData(currentLang) {
    /*let SecType: SectorType = new SectorType();
    SectorTypes.forEach(pair => {
      SecType = {
        'Id': pair.Id.toString(),
        'DescriptionEnglish': pair.DescriptionEnglish,
        'Amharic': pair.Amharic
      };
      this.sectorTypes.push(SecType);
    });*/
  }

  getLookup(id) {
    this.isNewSubLookups = false;
    this.loadingIndicator = true;
    this.sublookupsSub = this.sublookupsService
      .getLookup(id)
      .subscribe(result => {
          this.sublookups = result;
          this.updateForm();
        },
        error => this.toastr.error(this.errMsg.getError(error)));
    this.loadingIndicator = false;
  }

  updateForm() {
    console.log(this.sublookups);
    this.subLookupsForm.patchValue({
      cAmharic: this.sublookups.Amharic == null ? '' : this.sublookups.Amharic.toString(),
      cEnglish: this.sublookups.English == null ? '' : this.sublookups.English.toString(),
      cLookUpTypeId: this.sublookups.LookUpTypeId,
      cLookupId: this.sublookups.LookupId,
    });
    // },4000);

    this.isNewSubLookups = false;
  }

  initForm() {
    this.subLookupsForm = this.fb.group({
      cAmharic: ['', Validators.compose([Validators.required, Validators.maxLength(150),
        Validators.pattern('^([ \u1200-\u137F])+$')])],
      cEnglish: ['', Validators.compose([Validators.required, Validators.maxLength(200),
        Validators.pattern('^[a-zA-Z /,]+$')])],
      cLookUpTypeId: [0, Validators.required],
      cLookupId: ['', Validators.required],
    });
  }

  compareIds(id1: any, id2: any): boolean {
    const a1 = determineId(id1);
    const a2 = determineId(id2);
    return a1 === a2;
  }

  public onSubmit() {
    if (!this.subLookupsForm.valid) {
      return;
    }

    if (this.isNewSubLookups) {
      /* if (this.checkRecordExistance()) {
         this.toastr.show(
           'Record Exist', 'message', {
             closeButton: true
           })
         return;
       }*/
      this.loadingIndicator = true;
    }
    return this.sublookupsService.saveLookups(
      this.getEditedLookups()).subscribe((sublookups: LookupsModel) => {
        this.saveCompleted(sublookups);
      },
      err => this.handleError(err));
  }

  /* checkRecordExistance(): boolean {
     const formModel = this.servicesForm.value;
     this.sectorsSub = this.sectorsService
       .getServices(formModel.cServiceNameEnglish, formModel.cServiceType)
       .subscribe(result => {
         this.sectors = result
       })
     if (this.sectors.ServiceId == null) {
       return false;
     } else {
       return true;
     }
   }*/

  private saveCompleted(sublookups ?: LookupsModel) {
    if (sublookups) {
      this.sublookups = sublookups;
    }
    this.loadingIndicator = false;
    this.toastr.success('Record saved successfully!');
    //this.router.navigate(['sublookups/list']);
    window.history.back();
  }

  private handleError(err) {
    this.loadingIndicator = false;
    this.toastr.error(this.errMsg.getError(err));
    this.loadingIndicator = false;
  }

  private getEditedLookups(): LookupsModel {
    const formModel = this.subLookupsForm.value;
    return {
      LookupId: this.isNewSubLookups ? null : this.sublookups.LookupId,
      LookUpTypeId: formModel.cLookUpTypeId,
      Amharic: formModel.cAmharic,
      English: formModel.cEnglish,
      DescriptionEnglish: null
    };
  }

  ngOnDestroy() {
    // this.sublookupsSub.unsubscribe();
  }

  onBack() {
    window.history.back();
  }

  get Amharic() {
    return this.subLookupsForm.get('cAmharic');
  }

  get English() {
    return this.subLookupsForm.get('cEnglish');
  }

}

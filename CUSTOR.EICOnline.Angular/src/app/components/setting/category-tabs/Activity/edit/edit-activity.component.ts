import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/index';
import { HttpClient } from '@angular/common/http';
import { SectorModel } from '../../../../../model/sector';
import { AppConfiguration } from '../../../../../config/appconfig';
import { SubSectorModel } from '../../../../../model/subSector';
import { ToastrService } from 'ngx-toastr';
import { ActivityModel } from '../../../../../model/activity';
import { ActivityService } from '../activity.service';
import { ErrorMessage } from '../../../../../../@custor/services/errMessageService';
import { determineId } from '../../../../../../@custor/helpers/compare';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.css']
})
export class EditActivityComponent implements OnInit, OnDestroy {
  @ViewChild('form')

  activitySub: Subscription;
  private form: NgForm;
  title: string;
  /*serviceId:number;*/
  isNewActivity = false;
  activityModels: ActivityModel[] = [];
  activity: ActivityModel;
  sectorModels: SectorModel[] = [];
  subsectorModels: SubSectorModel[] = [];
  fillterssubsectorModels: SubSectorModel[] = [];
  activityForm: FormGroup;
  loadingIndicator: boolean;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private config: AppConfiguration,
    private activityService: ActivityService, private errMsg: ErrorMessage,
    private toastr: ToastrService,
    private fb: FormBuilder) {
    this.activity = <ActivityModel>{};
    // initialize the form
    this.initForm();
    this.initStaticData('en');
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id < 1) {
      this.isNewActivity = true;
      this.title = 'Create a new Service';
      /*this.getService();*/
      this.getSector();
      this.getSubSector();
      return;
    }
    if (id) {
      this.getActivity(id);
    }
  }

  getSector() {
    this.activityService.getSector()
      .subscribe(result => {
        this.sectorModels = result;
      },
        error => this.toastr.error(this.errMsg.getError(error)));
  }

  getSubSector() {
    this.activityService.getSubSector()
      .subscribe(result => {
        this.subsectorModels = result;
        this.filterSector(this.activity.SubSector.SectorId);
      },
        error => this.toastr.error(this.errMsg.getError(error)));
  }

  initStaticData(currentLang) {
    /*let SecType: SectorType = new SectorType();
    SectorTypes.forEach(pair => {
      SecType = {
        'Id': pair.Id.toString(),
        'DescriptionEnglish': pair.DescriptionEnglish,
        'Description': pair.Description
      };
      this.sectorTypes.push(SecType);
    });*/
  }

  getActivity(id) {
    this.isNewActivity = false;
    this.loadingIndicator = true;
    this.activitySub = this.activityService
      .getActivity(id)
      .subscribe(result => {
        this.activity = result;
        this.getSector();
        this.getSubSector();
        this.updateForm();
      },
        error => this.toastr.error(this.errMsg.getError(error)));
    this.loadingIndicator = false;
  }

  updateForm() {
    console.log(this.activity);
    this.activityForm.patchValue({
      cDescription: this.activity.Description == null ? '' : this.activity.Description.toString(),
      cDescriptionAlias: this.activity.DescriptionAlias == null ? '' : this.activity.DescriptionAlias.toString(),
      cDescriptionEnglish: this.activity.DescriptionEnglish == null ? '' : this.activity.DescriptionEnglish.toString(),
      cDescriptionEnglishAlias: this.activity.DescriptionEnglishAlias == null ? '' : this.activity.DescriptionEnglishAlias.toString(),
      cSector: this.activity.SubSector.SectorId,
      cSubSector: this.activity.SubSectorId,
    });
    // },4000);

    this.isNewActivity = false;
  }

  initForm() {
    this.activityForm = this.fb.group({
      cDescription: ['', Validators.compose([Validators.required, Validators.maxLength(150),
      Validators.pattern('^([ \u1200-\u137F])+$')])],
      cDescriptionAlias: ['', Validators.pattern('^([ \u1200-\u137F])+$')],
      cDescriptionEnglish: ['', Validators.compose([Validators.required, Validators.maxLength(200),
      Validators.pattern('^[a-zA-Z /,]+$')])],
      cDescriptionEnglishAlias: ['', Validators.pattern('^[a-zA-Z /,]+$')],
      cSector: [0, Validators.required],
      cSubSector: [0, Validators.required]
    });
  }

  compareIds(id1: any, id2: any): boolean {
    const a1 = determineId(id1);
    const a2 = determineId(id2);
    return a1 === a2;
  }

  public onSubmit() {
    if (!this.activityForm.valid) {
      return;
    }

    if (this.isNewActivity) {
      /* if (this.checkRecordExistance()) {
         this.toastr.show(
           'Record Exist', 'message', {
             closeButton: true
           })
         return;
       }*/
      this.loadingIndicator = true;
    }
    return this.activityService.saveAcitivity(
      this.getEditedActivity()).subscribe((activity: ActivityModel) => {
        this.saveCompleted(activity);
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

  private saveCompleted(activity?: ActivityModel) {
    if (activity) {
      this.activity = activity;
    }
    this.loadingIndicator = false;
    this.toastr.success('Record saved successfully!');
    //this.router.navigate(['activitys/list']);
    this.router.navigate(['category']);
  }

  private handleError(err) {
    this.loadingIndicator = false;
    this.toastr.error(this.errMsg.getError(err));
    this.loadingIndicator = false;
  }

  private getEditedActivity(): ActivityModel {
    const formModel = this.activityForm.value;
    return {
      ActivityId: this.isNewActivity ? 0 : this.activity.ActivityId,
      SectorId: formModel.cSector,
      SubSectorId: formModel.cSubSector,
      Description: formModel.cDescription,
      DescriptionAlias: formModel.cDescriptionAlias,
      DescriptionEnglish: formModel.cDescriptionEnglish,
      DescriptionEnglishAlias: formModel.cDescriptionEnglishAlias,
      Sector: null,
      SubSector: null,
    };
  }

  filterSector(sectorCode: number) {
    if (!sectorCode) {
      return;
    }
    this.fillterssubsectorModels = null;
    this.fillterssubsectorModels = this.subsectorModels.filter((item) => {
      return item.SectorId === sectorCode;
    });
  }

  ngOnDestroy() {
  //  this.activitySub.unsubscribe();
  }

  onBack() {
    //this.router.navigate(['activitys/list']);
    this.router.navigate(['category']);
  }

  get Description() {
    return this.activityForm.get('cDescription');
  }

  get DescriptionAlias() {
    return this.activityForm.get('cDescriptionAlias');
  }

  get DescriptionEnglish() {
    return this.activityForm.get('cDescriptionEnglish');
  }

  get DescriptionEnglishAlias() {
    return this.activityForm.get('cDescriptionEnglishAlias');
  }
}

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/index';

import { ToastrService } from 'ngx-toastr';
import { InvActivityModel } from '../../../../../model/invactivity';
import { InvactivityService } from '../invactivity.service';
import { SubSectorModel } from '../../../../../model/subSector';
import { ActivityModel } from '../../../../../model/activity';
import { SectorModel } from '../../../../../model/sector';
import { AppConfiguration } from '../../../../../config/appconfig';
import { ErrorMessage } from '../../../../../../@custor/services/errMessageService';
import { determineId } from '../../../../../../@custor/helpers/compare';

@Component({
  selector: 'app-edit-invactivity',
  templateUrl: './edit-invactivity.component.html',
  styleUrls: ['./edit-invactivity.component.css']
})
export class EditInvactivityComponent implements OnInit, OnDestroy {
  @ViewChild('form')

  invactivitySub: Subscription;
  private form: NgForm;
  title: string;
  /*serviceId:number;*/
  isNewInvActivity = false;

  invactivity: InvActivityModel = new InvActivityModel();
  sectorModels: SectorModel[] = [];

  subsectorModels: SubSectorModel[] = [];
  fillterssubsectorModels: SubSectorModel[] = [];

  activity: ActivityModel;

  activityModels: ActivityModel[] = [];
  filltersActivityModels: ActivityModel[] = [];

  invActivityForm: FormGroup;
  loadingIndicator: boolean;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private config: AppConfiguration,
    private invactivityService: InvactivityService, private errMsg: ErrorMessage,
    private toastr: ToastrService,
    private fb: FormBuilder) {
    this.invactivity = <InvActivityModel>{};
    // initialize the form
    this.initForm();
    this.initStaticData('en');
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id < 1) {
      this.isNewInvActivity = true;
      this.title = 'Create a new Service';
      this.getSectors();
      this.getSubSectors();
      this.getActivitys();
      return;
    }
    if (id) {
      this.getInvActivity(id);
    }
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

  getInvActivity(id) {
    this.isNewInvActivity = false;
    this.loadingIndicator = true;
    this.invactivitySub = this.invactivityService
      .getInvActivity(id)
      .subscribe(result => {
        this.invactivity = result;
        this.getSectors();
        this.getSubSectors();
        this.getActivitys();
        this.updateForm();
      },
        error => this.toastr.error(this.errMsg.getError(error)));
    this.loadingIndicator = false;
  }

  updateForm() {
    console.log(this.invactivity.ActivityId);
    this.invActivityForm.patchValue({
      cDescription: this.invactivity.Description == null ? '' : this.invactivity.Description.toString(),
      cDescriptionAlias: this.invactivity.DescriptionAlias == null ? '' : this.invactivity.DescriptionAlias.toString(),
      cDescriptionEnglish: this.invactivity.DescriptionEnglish == null ? '' : this.invactivity.DescriptionEnglish.toString(),
      cDescriptionEnglishAlias: this.invactivity.DescriptionEnglishAlias == null ? '' : this.invactivity.DescriptionEnglishAlias.toString(),
      cInAddisOromiaAreas: this.invactivity.InAddisOromiaAreas == null ? '' : this.invactivity.InAddisOromiaAreas.toString(),
      cInOtherAreas: this.invactivity.InOtherAreas == null ? '' : this.invactivity.InOtherAreas.toString(),
      cSector: this.invactivity.Activity.SubSector.SectorId,
      cSubSector: this.invactivity.Activity.SubSectorId,
      cActivity: this.invactivity.ActivityId,
    });
    // },4000);

    this.isNewInvActivity = false;
  }

  initForm() {
    this.invActivityForm = this.fb.group({
      cDescription: ['', Validators.compose([Validators.required, Validators.maxLength(150),
      Validators.pattern('^([ \u1200-\u137F])+$')])],
      cDescriptionAlias: ['', Validators.pattern('^([ \u1200-\u137F])+$')],
      cDescriptionEnglish: ['', Validators.compose([Validators.required, Validators.maxLength(200),
      Validators.pattern('^[a-zA-Z /,]+$')])],
      cDescriptionEnglishAlias: ['', Validators.pattern('^[a-zA-Z /,]+$')],
      cInAddisOromiaAreas: ['', Validators.pattern('^[0-9]+$')],
      cInOtherAreas: ['', Validators.pattern('^[0-9]+$')],
      cSector: [0, Validators.required],
      cSubSector: [0, Validators.required],
      cActivity: [0, Validators.required]
    });
  }

  compareIds(id1: any, id2: any): boolean {
    const a1 = determineId(id1);
    const a2 = determineId(id2);
    return a1 === a2;
  }

  public onSubmit() {
    if (!this.invActivityForm.valid) {
      return;
    }

    if (this.isNewInvActivity) {
      /* if (this.checkRecordExistance()) {
         this.toastr.show(
           'Record Exist', 'message', {
             closeButton: true
           })
         return;
       }*/
      this.loadingIndicator = true;
    }
    return this.invactivityService.saveInvAcitivity(
      this.getEditedInvActivity()).subscribe((invactivity: InvActivityModel) => {
        this.saveCompleted(invactivity);
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

  private saveCompleted(invactivity?: InvActivityModel) {
    if (invactivity) {
      this.invactivity = invactivity;
    }
    this.loadingIndicator = false;
    this.toastr.success('Record saved successfully!');
    // this.router.navigate(['invactivitys/list']);
    this.router.navigate(['category']);
  }

  private handleError(err) {
    this.loadingIndicator = false;
    this.toastr.error(this.errMsg.getError(err));
    this.loadingIndicator = false;
  }

  private getEditedInvActivity(): InvActivityModel {
    const formModel = this.invActivityForm.value;
    // console.log(this.invactivity.InvActivityId);
    return {
      InvActivityId: this.isNewInvActivity ? 0 : this.invactivity.InvActivityId,
      ActivityId: formModel.cActivity,
      SectorId: formModel.cSector,
      SubSectorId: formModel.cSubSector,
      Description: formModel.cDescription,
      DescriptionAlias: formModel.cDescriptionAlias,
      DescriptionEnglish: formModel.cDescriptionEnglish,
      DescriptionEnglishAlias: formModel.cDescriptionEnglishAlias,
      InAddisOromiaAreas: formModel.cInAddisOromiaAreas,
      InOtherAreas: formModel.cInOtherAreas,
      Sector: null,
      SubSector: null,
      Activity: null,
    };
  }

  ngOnDestroy() {
   // this.invactivitySub.unsubscribe();
  }

  getSectors() {
    this.invactivityService.getSectors()
      .subscribe(result => {
        this.sectorModels = result;
      },
        error => this.toastr.error(this.errMsg.getError(error)));
  }

  getSubSectors() {
    this.invactivityService.getSubSectors()
      .subscribe(result => {
        this.subsectorModels = result;
        if (this.isNewInvActivity) {
          const formModel = this.invActivityForm.value;
          this.filterSector(formModel.cSector);
        } else {
          this.filterSector(this.invactivity.Activity.SubSector.SectorId);
        }
      },
        error => this.toastr.error(this.errMsg.getError(error)));
  }

  filterSector(sectorCode: number) {
    if (!sectorCode) {
      return;
    }
    this.fillterssubsectorModels = null;
    // this.filltersActivityModels = null;
    this.fillterssubsectorModels = this.subsectorModels.filter((item) => {
      return item.SectorId === sectorCode;
    });
  }

  getActivitys() {
    this.invactivityService.getActivitys()
      .subscribe(result => {
        this.activityModels = result;
        if (this.isNewInvActivity) {
          const formModel = this.invActivityForm.value;
          this.filterSubSector(formModel.cSubSector);
        } else {
          this.filterSubSector(this.invactivity.Activity.SubSectorId);
        }
      },
        error => this.toastr.error(this.errMsg.getError(error)));
  }

  filterSubSector(SubSecId: number) {
    if (!SubSecId) {
      return;
    }
    console.log(this.activityModels);
    this.filltersActivityModels = null;
    this.filltersActivityModels = this.activityModels.filter((item) => {
      console.log(SubSecId + 'item' + item.SubSectorId);

      return item.SubSectorId === SubSecId;
    });
  }

  onBack() {
    // this.router.navigate(['invactivitys/list']);
    this.router.navigate(['category']);
  }

  get Description() {
    return this.invActivityForm.get('cDescription');
  }

  get DescriptionAlias() {
    return this.invActivityForm.get('cDescriptionAlias');
  }

  get DescriptionEnglish() {
    return this.invActivityForm.get('cDescriptionEnglish');
  }

  get DescriptionEnglishAlias() {
    return this.invActivityForm.get('cDescriptionEnglishAlias');
  }

  get InAddisOromiaAreas() {
    return this.invActivityForm.get('cInAddisOromiaAreas');
  }

  get InOtherAreas() {
    return this.invActivityForm.get('cInOtherAreas');
  }
}

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AppConfiguration } from '../../../../../config/appconfig';
import { ActivatedRoute, Router } from '@angular/router';

import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/index';
import { HttpClient } from '@angular/common/http';
import { SectorModel } from '../../../../../model/sector';
import { SectorService } from '../sector.service';
import { ToastrService } from 'ngx-toastr';

import { ErrorMessage } from '../../../../../../@custor/services/errMessageService';
import { SectorTypes } from '../../../../../../@custor/const/consts';
import { determineId } from '../../../../../../@custor/helpers/compare';
import { SectorType } from '../../../../../model/lookupData';

@Component({
  selector: 'app-edit-sector',
  templateUrl: './edit-sector.component.html',
  styleUrls: ['./edit-sector.component.css']
})
export class EditSectorComponent implements OnInit, OnDestroy {
  @ViewChild('form')

  sectorsSub: Subscription;
  private form: NgForm;
  title: string;
  /*serviceId:number;*/
  isNewSector = false;
  sectors: SectorModel;
  sectorTypes: SectorType[] = [];

  sectorsForm: FormGroup;
  loadingIndicator: boolean;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private config: AppConfiguration,
    private sectorsService: SectorService, private errMsg: ErrorMessage,
    private toastr: ToastrService,
    private fb: FormBuilder) {
    this.sectors = <SectorModel>{};
    // initialize the form
    this.initForm();
    this.initStaticData('en');
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id < 1) {
      this.isNewSector = true;
      this.title = 'Create a new Service';
      /*this.getService();*/
      return;
    }
    if (id) {
      // to-do
      // get the selected customer either through @Input or shared service
      this.getSectors(id);
    }
  }

  initStaticData(currentLang) {
    let SecType: SectorType = new SectorType();
    SectorTypes.forEach(pair => {
      SecType = {
        'Id': pair.Id.toString(),
        'DescriptionEnglish': pair.DescriptionEnglish,
        'Description': pair.Description
      };
      this.sectorTypes.push(SecType);
    });
  }

  getSectors(id) {
    this.isNewSector = false;
    this.loadingIndicator = true;
    this.sectorsSub = this.sectorsService
      .getSector(id)
      .subscribe(result => {
        this.sectors = result;
        this.updateForm();
      },
        error => this.toastr.error(this.errMsg.getError(error)));
    this.loadingIndicator = false;
  }

  updateForm() {
    this.sectorsForm.setValue({
      cDescription: this.sectors.Description == null ? '' : this.sectors.Description.toString(),
      cDescriptionAlias: this.sectors.DescriptionAlias == null ? '' : this.sectors.DescriptionAlias.toString(),
      cDescriptionEnglish: this.sectors.DescriptionEnglish == null ? '' : this.sectors.DescriptionEnglish.toString(),
      cDescriptionEnglishAlias: this.sectors.DescriptionEnglishAlias == null ? '' : this.sectors.DescriptionEnglishAlias.toString(),
      cEconomicSector: this.sectors.EconomicSector == null ? '' : this.sectors.EconomicSector.toString()
    });
    // },4000);

    this.isNewSector = false;
  }

  initForm() {
    this.sectorsForm = this.fb.group({
      cDescription: ['', Validators.compose([Validators.required, Validators.maxLength(150),
      Validators.pattern('^([ \u1200-\u137F])+$')])],
      cDescriptionAlias: ['', Validators.pattern('^([ \u1200-\u137F])+$')],
      cDescriptionEnglish: ['', Validators.compose([Validators.required, Validators.maxLength(200),
      Validators.pattern('^[a-zA-Z /,]+$')])],
      cDescriptionEnglishAlias: ['', Validators.pattern('^[a-zA-Z /,]+$')],
      cEconomicSector: [0, Validators.required]
    });
  }

  compareIds(id1: any, id2: any): boolean {
    const a1 = determineId(id1);
    const a2 = determineId(id2);
    return a1 === a2;
  }

  public onSubmit() {
    if (!this.sectorsForm.valid) {
      return;
    }

    if (this.isNewSector) {
      /* if (this.checkRecordExistance()) {
         this.toastr.show(
           'Record Exist', 'message', {
             closeButton: true
           })
         return;
       }*/
      this.loadingIndicator = true;
    }
    return this.sectorsService.saveSector(
      this.getEditedSector()).subscribe((sectors: SectorModel) => {
        this.saveCompleted(sectors);
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

  private saveCompleted(sectors?: SectorModel) {
    if (sectors) {
      this.sectors = sectors;
    }
    this.loadingIndicator = false;
    this.toastr.success('Record saved successfully!');
    //this.router.navigate(['sectors/list']);
    this.router.navigate(['category']);
  }

  private handleError(err) {
    this.loadingIndicator = false;
    this.toastr.error(this.errMsg.getError(err));
    this.loadingIndicator = false;
  }

  private getEditedSector(): SectorModel {
    const formModel = this.sectorsForm.value;
    return {
      SectorId: this.isNewSector ? 0 : this.sectors.SectorId,
      Description: formModel.cDescription,
      DescriptionAlias: formModel.cDescriptionAlias,
      DescriptionEnglish: formModel.cDescriptionEnglish,
      DescriptionEnglishAlias: formModel.cDescriptionEnglishAlias,
      EconomicSector: formModel.cEconomicSector,
    };
  }

  ngOnDestroy() {
  //  this.sectorsSub.unsubscribe();
  }

  onBack() {
    //this.router.navigate(['sectors/list']);
    this.router.navigate(['category']);
  }

  get Description() {
    return this.sectorsForm.get('cDescription');
  }

  get DescriptionAlias() {
    return this.sectorsForm.get('cDescriptionAlias');
  }

  get DescriptionEnglish() {
    return this.sectorsForm.get('cDescriptionEnglish');
  }

  get DescriptionEnglishAlias() {
    return this.sectorsForm.get('cDescriptionEnglishAlias');
  }
}

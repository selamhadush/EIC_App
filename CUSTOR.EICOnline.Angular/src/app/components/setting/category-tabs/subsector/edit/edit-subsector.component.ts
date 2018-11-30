import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SubSectorModel} from '../../../../../model/subSector';
import {SectorModel} from '../../../../../model/sector';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {SubsectorService} from '../subsector.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AppConfiguration} from '../../../../../config/appconfig';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs/index';
import {ToastrService} from 'ngx-toastr';
import {ErrorMessage} from '../../../../../../@custor/services/errMessageService';
import {determineId} from '../../../../../../@custor/helpers/compare';

@Component({
  selector: 'app-edit-subsector',
  templateUrl: './edit-subsector.component.html',
  styleUrls: ['./edit-subsector.component.css']
})
export class EditSubsectorComponent implements OnInit, OnDestroy {
  @ViewChild('form')

  subsectorsSub: Subscription;
  private form: NgForm;
  title: string;
  /*serviceId:number;*/
  isNewSubSector = false;
  subsectors: SubSectorModel;
  sectorModels: SectorModel[] = [];

  subSectorsForm: FormGroup;
  loadingIndicator: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private config: AppConfiguration,
              private subsectorsService: SubsectorService, private errMsg: ErrorMessage,
              private toastr: ToastrService,
              private fb: FormBuilder) {
    this.subsectors = <SubSectorModel>{};
    // initialize the form
    this.initForm();
    this.initStaticData('en');
  }

  ngOnInit() {
    this.getSector();
    const id = this.activatedRoute.snapshot.params['id'];
    if (id < 1) {
      this.isNewSubSector = true;
      this.title = 'Create a new Service';
      /*this.getService();*/
      return;
    }
    if (id) {
      this.getSubSectors(id);
    }
  }

  getSector() {
    this.subsectorsService.getSector()
      .subscribe(result => {
          this.sectorModels = result;
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

  getSubSectors(id) {
    this.isNewSubSector = false;
    this.loadingIndicator = true;
    this.subsectorsSub = this.subsectorsService
      .getSubSector(id)
      .subscribe(result => {
          this.subsectors = result;
          this.updateForm();
        },
        error => this.toastr.error(this.errMsg.getError(error)));
    this.loadingIndicator = false;
  }

  updateForm() {
    console.log(this.subsectors);
    this.subSectorsForm.patchValue({
      cDescription: this.subsectors.Description == null ? '' : this.subsectors.Description.toString(),
      cDescriptionAlias: this.subsectors.DescriptionAlias == null ? '' : this.subsectors.DescriptionAlias.toString(),
      cDescriptionEnglish: this.subsectors.DescriptionEnglish == null ? '' : this.subsectors.DescriptionEnglish.toString(),
      cDescriptionEnglishAlias: this.subsectors.DescriptionEnglishAlias == null ? '' : this.subsectors.DescriptionEnglishAlias.toString(),
      cSector: this.subsectors.SectorId,
    });
    // },4000);

    this.isNewSubSector = false;
  }

  initForm() {
    this.subSectorsForm = this.fb.group({
      cDescription: ['', Validators.compose([Validators.required, Validators.maxLength(150),
        Validators.pattern('^([ \u1200-\u137F])+$')])],
      cDescriptionAlias: ['', Validators.pattern('^([ \u1200-\u137F])+$')],
      cDescriptionEnglish: ['', Validators.compose([Validators.required, Validators.maxLength(200),
        Validators.pattern('^[a-zA-Z /,]+$')])],
      cDescriptionEnglishAlias: ['', Validators.pattern('^[a-zA-Z /,]+$')],
      cSector: [0, Validators.required]
    });
  }

  compareIds(id1: any, id2: any): boolean {
    const a1 = determineId(id1);
    const a2 = determineId(id2);
    return a1 === a2;
  }

  public onSubmit() {
    if (!this.subSectorsForm.valid) {
      return;
    }

    if (this.isNewSubSector) {
    /* if (this.checkRecordExistance()) {
       this.toastr.show(
         'Record Exist', 'message', {
           closeButton: true
         })
       return;
     }*/
      this.loadingIndicator = true;
    }
    return this.subsectorsService.saveSubSector(
      this.getEditedSubSector()).subscribe((subsectors: SubSectorModel) => {
        this.saveCompleted(subsectors);
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

  private saveCompleted(subsectors ?: SubSectorModel) {
    if (subsectors) {
      this.subsectors = subsectors;
    }
    this.loadingIndicator = false;
    this.toastr.success('Record saved successfully!');
    // this.router.navigate(['subsectors/list']);
    this.router.navigate(['category']);
  }

  private handleError(err) {
    this.loadingIndicator = false;
    this.toastr.error(this.errMsg.getError(err));
    this.loadingIndicator = false;
  }

  private getEditedSubSector(): SubSectorModel {
    const formModel = this.subSectorsForm.value;
    return {
      SubSectorId: this.isNewSubSector ? 0 : this.subsectors.SubSectorId,
      SectorId: formModel.cSector,
      Description: formModel.cDescription,
      DescriptionAlias: formModel.cDescriptionAlias,
      DescriptionEnglish: formModel.cDescriptionEnglish,
      DescriptionEnglishAlias: formModel.cDescriptionEnglishAlias,
      Sector: null,
    };
  }

  ngOnDestroy() {
   // this.subsectorsSub.unsubscribe();
  }

  onBack() {
   // this.router.navigate(['subsectors/list']);
    this.router.navigate(['category']);
  }

  get Description() {
    return this.subSectorsForm.get('cDescription');
  }

  get DescriptionAlias() {
    return this.subSectorsForm.get('cDescriptionAlias');
  }

  get DescriptionEnglish() {
    return this.subSectorsForm.get('cDescriptionEnglish');
  }

  get DescriptionEnglishAlias() {
    return this.subSectorsForm.get('cDescriptionEnglishAlias');
  }
}

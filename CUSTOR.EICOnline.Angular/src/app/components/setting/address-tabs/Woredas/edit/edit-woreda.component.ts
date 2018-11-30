///<reference path="../../../../../../../node_modules/@angular/core/src/metadata/lifecycle_hooks.d.ts"/>
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfiguration} from '../../../../../config/appconfig';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/index';
import {ActivatedRoute, Router} from '@angular/router';
import {WoredaService} from '../woreda.service';
import {Region, Woreda, Zone} from '../../../../../model/address';
import {ToastrService} from 'ngx-toastr';
import {ErrorMessage} from '../../../../../../@custor/services/errMessageService';
import {determineId} from '../../../../../../@custor/helpers/compare';

@Component({
  selector: 'app-edit-woreda',
  templateUrl: './edit-woreda.component.html',
  styleUrls: ['./edit-woreda.component.css']
})
export class EditWoredaComponent implements OnInit, OnDestroy {
  @ViewChild('form')

  woredaSub: Subscription;
  title: string;
  isNewWoreda = false;
  woredaModels: Woreda[] = [];
  woreda: Woreda;
  regionModels: Region[] = [];
  zoneModels: Zone[] = [];
  fillterZoneModels: Zone[] = [];
  woredaForm: FormGroup;
  loadingIndicator: boolean;
  private form: NgForm;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private config: AppConfiguration,
              private woredaService: WoredaService, private errMsg: ErrorMessage,
              private toastr: ToastrService,
              private fb: FormBuilder) {
    this.woreda = <Woreda>{};
    // initialize the form
    this.initForm();
    this.initStaticData('en');
  }


 get Description() {
    return this.woredaForm.get('cDescription');
  }

  get DescriptionEnglish() {
    return this.woredaForm.get('cDescriptionEnglish');
  }

  get Woreda() {
    return this.woredaForm.get('cCode');
  }

  get Region() {
    return this.woredaForm.get('cRegion');
  }

  get Zone() {
    return this.woredaForm.get('cZone');
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id < 1) {
      this.isNewWoreda = true;
      this.title = 'Create a new Woreda';
      this.getRegions();
      this.getAllZones();
      return;
    }
    if (id) {
      this.getWoreda(id);
    }
  }

  getRegions() {
    this.woredaService.getRegions()
      .subscribe(result => {
          this.regionModels = result;
        },
        error => this.toastr.error(this.errMsg.getError(error)));
  }

  getAllZones() {
    this.woredaService.getZones()
      .subscribe(result => {
          this.zoneModels = result;
          if (this.isNewWoreda) {
            const formModel = this.woredaForm.value;
            this.filterRegion(formModel.cRegion);
          } else {
            this.filterRegion(this.woreda.Zone.RegionId);
          }
        },
        error => this.toastr.error(this.errMsg.getError(error))
      );
  }

  filterRegion(RegionCode: string) {
    if (!RegionCode) {
      return;
    }
    this.fillterZoneModels = null;
    this.fillterZoneModels = this.zoneModels.filter((item) => {
      // console.log(RegionCode + '==' + item.RegionId);
      return item.RegionId === RegionCode;
    });
  }

  initStaticData(currentLang) {
    /*let SecType: RegionType = new RegionType();
    RegionTypes.forEach(pair => {
      SecType = {
        'Id': pair.Id.toString(),
        'DescriptionEnglish': pair.DescriptionEnglish,
        'Description': pair.Description
      };
      this.sectorTypes.push(SecType);
    });*/
  }

  getWoreda(id) {
    this.isNewWoreda = false;
    this.loadingIndicator = true;
    this.woredaSub = this.woredaService
      .getWoreda(id)
      .subscribe(result => {
          this.woreda = result;
          this.getRegions();
          this.getAllZones();
          this.updateForm();
        },
        error => this.toastr.error(this.errMsg.getError(error)));
    this.loadingIndicator = false;
  }

  updateForm() {
    console.log(this.woreda);
    this.woredaForm.patchValue({
      cDescription: this.woreda.Description == null ? '' : this.woreda.Description.toString(),
      cDescriptionEnglish: this.woreda.DescriptionEnglish == null ? '' : this.woreda.DescriptionEnglish.toString(),
      cRegion: this.woreda.Zone.RegionId,
      cZone: this.woreda.ZoneId,
      cCode: this.woreda.WoredaId,
    });
    // },4000);

    this.isNewWoreda = false;
  }

  initForm() {
    this.woredaForm = this.fb.group({
      cDescription: ['', Validators.compose([Validators.required, Validators.maxLength(150),
        Validators.pattern('^([ \u1200-\u137F])+$')])],
      cDescriptionEnglish: ['', Validators.compose([Validators.required, Validators.maxLength(200),
        Validators.pattern('^[a-zA-Z /,]+$')])],
      cRegion: [0, Validators.required],
      cZone: [0, Validators.required],
      cCode: ['', Validators.compose([Validators.required, Validators.maxLength(20)])]
    });
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

  compareIds(id1: any, id2: any): boolean {
    const a1 = determineId(id1);
    const a2 = determineId(id2);
    return a1 === a2;
  }

  public onSubmit() {
    if (!this.woredaForm.valid) {
      return;
    }

    if (this.isNewWoreda) {
      /* if (this.checkRecordExistance()) {
         this.toastr.show(
           'Record Exist', 'message', {
             closeButton: true
           })
         return;
       }*/
      this.loadingIndicator = true;
    }
    return this.woredaService.saveWoreda(
      this.getEditedWoreda()).subscribe((woreda: Woreda) => {
        this.saveCompleted(woreda);
      },
      err => this.handleError(err));
  }

  ngOnDestroy() {
    // this.woredaSub.unsubscribe();
  }

  onBack() {
    //this.router.navigate(['woredas/list']);
    this.router.navigate(['address']);
  }

  private saveCompleted(woreda ?: Woreda) {
    if (woreda) {
      this.woreda = woreda;
    }
    this.loadingIndicator = false;
    this.toastr.success('Record saved successfully!');
    this.router.navigate(['address']);
  }

  private handleError(err) {
    this.loadingIndicator = false;
    this.toastr.error(this.errMsg.getError(err));
    this.loadingIndicator = false;
  }

  private getEditedWoreda(): Woreda {
    const formModel = this.woredaForm.value;
    return {
      WoredaId: this.isNewWoreda ? '0' : this.woreda.WoredaId,
      RegionId: formModel.cRegion,
      ZoneId: formModel.cZone,
      Description: formModel.cDescription,
      DescriptionEnglish: formModel.cDescriptionEnglish,
      Region: null,
      Zone: null,
    };
  }
}

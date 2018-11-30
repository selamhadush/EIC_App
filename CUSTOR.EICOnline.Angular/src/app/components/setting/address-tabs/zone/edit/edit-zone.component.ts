import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfiguration} from '../../../../../config/appconfig';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/index';
import {Region, Zone} from '../../../../../model/address';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ZoneService} from '../zone.service';
import {ErrorMessage} from '../../../../../../@custor/services/errMessageService';
import {determineId} from '../../../../../../@custor/helpers/compare';

@Component({
  selector: 'app-edit-zone',
  templateUrl: './edit-zone.component.html',
  styleUrls: ['./edit-zone.component.css']
})
export class EditZoneComponent implements OnInit, OnDestroy {
  @ViewChild('form')

  zonesSub: Subscription;
  title: string;
  /*serviceId:number;*/
  isNewZone = false;
  zones: Zone;
  regionModels: Region[] = [];
  zoneForm: FormGroup;
  loadingIndicator: boolean;
  private form: NgForm;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private config: AppConfiguration,
              private zonesService: ZoneService, private errMsg: ErrorMessage,
              private toastr: ToastrService,
              private fb: FormBuilder) {
    this.zones = <Zone>{};
    // initialize the form
    this.initForm();
    this.initStaticData('en');
  }

  get Id() {
    return this.zoneForm.get('cId');
  }

  get RegionId() {
    return this.zoneForm.get('cRegion');
  }

  get Description() {
    return this.zoneForm.get('cDescription');
  }

  get DescriptionEnglish() {
    return this.zoneForm.get('cDescriptionEnglish');
  }

  ngOnInit() {
    this.getRegions();
    const id = this.activatedRoute.snapshot.params['id'];
    if (id < 1) {
      this.isNewZone = true;
      this.title = 'Create a new Zone';
      return;
    }
    if (id) {
      this.getZone(id);
    }
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

  getRegions() {
    this.zonesService.getRegions()
      .subscribe(result => {
          this.regionModels = result;
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

  getZone(id) {
    this.isNewZone = false;
    this.loadingIndicator = true;
    this.zonesSub = this.zonesService
      .getZone(id)
      .subscribe(result => {
          this.zones = result;
          console.log(this.zones);
          this.updateForm();
        },
        error => this.toastr.error(this.errMsg.getError(error)));
    this.loadingIndicator = false;
  }

  updateForm() {
    console.log(this.zones);
    this.zoneForm.patchValue({
      cDescription: this.zones.Description == null ? '' : this.zones.Description.toString(),
      cDescriptionEnglish: this.zones.DescriptionEnglish == null ? '' : this.zones.DescriptionEnglish.toString(),
      cRegion: this.zones.RegionId,
      cId: this.zones.ZoneId,
    });
    // },4000);

    this.isNewZone = false;
  }

  initForm() {
    this.zoneForm = this.fb.group({
      cDescription: ['', Validators.compose([Validators.required, Validators.maxLength(20),
        Validators.pattern('^([ \u1200-\u137F])+$')])],
      cDescriptionEnglish: ['', Validators.compose([Validators.required, Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z /,]+$')])],
      cRegion: [0, Validators.required],
      cId: ['', Validators.compose([Validators.required, Validators.maxLength(6), Validators.pattern('^[0-9]+$')])]
    });
  }

  compareIds(id1: any, id2: any): boolean {
    const a1 = determineId(id1);
    const a2 = determineId(id2);
    return a1 === a2;
  }

  public onSubmit() {
    if (!this.zoneForm.valid) {
      return;
    }

    if (this.isNewZone) {
      /* if (this.checkRecordExistance()) {
         this.toastr.show(
           'Record Exist', 'message', {
             closeButton: true
           })
         return;
       }*/
      this.loadingIndicator = true;
    }
    return this.zonesService.saveZone(
      this.getEditedZone()).subscribe((zones: Zone) => {
        this.saveCompleted(zones);
      },
      err => this.handleError(err));
  }

  ngOnDestroy() {
  //  this.zonesSub.unsubscribe;
  }

  onBack() {
    //this.router.navigate(['zones/list']);
    this.router.navigate(['address']);
  }

  private saveCompleted(zones ?: Zone) {
    if (zones) {
      this.zones = zones;
    }
    this.loadingIndicator = false;
    this.toastr.success('Record saved successfully!');
    //this.router.navigate(['zones/list']);
    this.router.navigate(['address']);
  }

  private handleError(err) {
    this.loadingIndicator = false;
    this.toastr.error(this.errMsg.getError(err));
    this.loadingIndicator = false;
  }

  private getEditedZone(): Zone {
    const formModel = this.zoneForm.value;
    return {
      ZoneId: formModel.cId,
      RegionId: formModel.cRegion,
      Description: formModel.cDescription,
      DescriptionEnglish: formModel.cDescriptionEnglish,
      Region: null,
    };
  }
}

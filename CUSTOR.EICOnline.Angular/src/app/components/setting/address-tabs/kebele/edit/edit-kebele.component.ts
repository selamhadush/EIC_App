import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/index';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { KebeleService } from '../kebele.service';
import { Kebele, Region, Woreda, Zone } from '../../../../../model/address';
import { AppConfiguration } from '../../../../../config/appconfig';
import { ErrorMessage } from '../../../../../../@custor/services/errMessageService';
import { determineId } from '../../../../../../@custor/helpers/compare';

@Component({
  selector: 'app-edit-kebele',
  templateUrl: './edit-kebele.component.html',
  styleUrls: ['./edit-kebele.component.css']
})
export class EditKebeleComponent implements OnInit, OnDestroy {
  @ViewChild('form')

  kebeleSub: Subscription;
  title: string;
  /*serviceId:number;*/
  isNewKebele = false;
  kebele: Kebele = new Kebele();
  regionModels: Region[] = [];
  zoneModels: Zone[] = [];
  fillterszoneModels: Zone[] = [];
  woreda: Woreda;
  woredaModels: Woreda[] = [];
  filltersWoredaModels: Woreda[] = [];
  kebeleForm: FormGroup;
  loadingIndicator: boolean;
  private form: NgForm;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private config: AppConfiguration,
    private kebeleService: KebeleService, private errMsg: ErrorMessage,
    private toastr: ToastrService,
    private fb: FormBuilder) {
    this.kebele = <Kebele>{};
    // initialize the form
    this.initForm();
    this.initStaticData('en');
  }

  get Description() {
    return this.kebeleForm.get('cDescription');
  }

  get DescriptionEnglish() {
    return this.kebeleForm.get('cDescriptionEnglish');
  }

  get Kebele() {
    return this.kebeleForm.get('cKebele');
  }

  get Region() {
    return this.kebeleForm.get('cRegion');
  }
  get Zone() {
    return this.kebeleForm.get('cZone');
  }
  get Woreda() {
    return this.kebeleForm.get('cWoreda');
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id < 1) {
      this.isNewKebele = true;
      this.title = 'Create a new Kebele';
      this.getRegions();
      this.getZones();
      this.getWoredas();
      return;
    }
    if (id) {
      this.getKebele(id);
    }
  }

  getKebele(id) {
    this.isNewKebele = false;
    this.loadingIndicator = true;
    this.kebeleSub = this.kebeleService
      .getKebele(id)
      .subscribe(result => {
        this.kebele = result;
        this.getRegions();
        this.getZones();
        this.getWoredas();
        this.updateForm();
      },
        error => this.toastr.error(this.errMsg.getError(error)));
    this.loadingIndicator = false;
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

  updateForm() {
    console.log(this.kebele.Woreda.Zone);
    console.log(this.kebele.Woreda.Zone.RegionId);
    this.kebeleForm.patchValue({
      cDescription: this.kebele.Description == null ? '' : this.kebele.Description.toString(),
      cDescriptionEnglish: this.kebele.DescriptionEnglish == null ? '' : this.kebele.DescriptionEnglish.toString(),
      cRegion: this.kebele.Woreda.Zone.RegionId,
      cZone: this.kebele.Woreda.ZoneId,
      cWoreda: this.kebele.WoredaId,
      cKebele: this.kebele.KebeleId,
    });
    // },4000);

    this.isNewKebele = false;
  }

  initForm() {
    this.kebeleForm = this.fb.group({
      cDescription: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      cDescriptionEnglish: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      cKebele: ['', Validators.required],
      cRegion: [0, Validators.required],
      cZone: [0, Validators.required],
      cWoreda: [0, Validators.required]
    });
  }

  compareIds(id1: any, id2: any): boolean {
    const a1 = determineId(id1);
    const a2 = determineId(id2);
    return a1 === a2;
  }

  public onSubmit() {
    if (!this.kebeleForm.valid) {
      return;
    }

    if (this.isNewKebele) {
      /* if (this.checkRecordExistance()) {
         this.toastr.show(
           'Record Exist', 'message', {
             closeButton: true
           })
         return;
       }*/
      this.loadingIndicator = true;
    }
    return this.kebeleService.saveKebele(
      this.getEditedKebele()).subscribe((kebele: Kebele) => {
        this.saveCompleted(kebele);
      },
        err => this.handleError(err));
  }

  ngOnDestroy() {
  //  this.kebeleSub.unsubscribe;
  }

  getRegions() {
    this.kebeleService.getRegions()
      .subscribe(result => {
        this.regionModels = result;
      },
        error => this.toastr.error(this.errMsg.getError(error)));
  }

  getZones() {
    this.kebeleService.getZones()
      .subscribe(result => {
        this.zoneModels = result;
        if (this.isNewKebele) {
          const formModel = this.kebeleForm.value;
          this.filterRegion(formModel.cRegion);
        } else {
          //console.log(this.kebele.Woreda.Zone.RegionId);
          this.filterRegion(this.kebele.Woreda.Zone.RegionId);
        }
      },
        error => this.toastr.error(this.errMsg.getError(error)));
  }

  filterRegion(regionCode: string) {
    if (!regionCode) {
      return;
    }
    this.fillterszoneModels = null;
    // this.filltersWoredaModels = null;
    this.fillterszoneModels = this.zoneModels.filter((item) => {
      return item.RegionId === regionCode;
    });
  }

  getWoredas() {
    this.kebeleService.getWoredas()
      .subscribe(result => {
        this.woredaModels = result;
        if (this.isNewKebele) {
          const formModel = this.kebeleForm.value;
          this.filterZone(formModel.cZone);
        } else {
          this.filterZone(this.kebele.Woreda.ZoneId);
        }
      },
        error => this.toastr.error(this.errMsg.getError(error)));
  }

  filterZone(ZoneId: string) {
    if (!ZoneId) {
      return;
    }
    console.log(this.woredaModels);
    this.filltersWoredaModels = null;
    this.filltersWoredaModels = this.woredaModels.filter((item) => {
      // console.log(SubSecId + "item" + item.ZoneId)
      return item.ZoneId === ZoneId;
    });
  }

  onBack() {
    //this.router.navigate(['kebeles/list']);
    this.router.navigate(['address']);
  }

  private saveCompleted(kebele?: Kebele) {
    if (kebele) {
      this.kebele = kebele;
    }
    this.loadingIndicator = false;
    this.toastr.success('Record saved successfully!');
    //this.router.navigate(['kebeles/list']);
    this.router.navigate(['address']);
  }

  private handleError(err) {
    this.loadingIndicator = false;
    this.toastr.error(this.errMsg.getError(err));
    this.loadingIndicator = false;
  }

  private getEditedKebele(): Kebele {
    const formModel = this.kebeleForm.value;
    // console.log(this.kebele.InvKebeleId);
    return {
      KebeleId: formModel.cKebele,
      WoredaId: formModel.cWoreda,
      RegionId: formModel.cRegion,
      ZoneId: formModel.cZone,
      Description: formModel.cDescription,
      DescriptionEnglish: formModel.cDescriptionEnglish,
      Region: null,
      Zone: null,
      Woreda: null,
    };
  }
}

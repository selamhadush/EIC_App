import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {AppConfiguration} from '../../../../../config/appconfig';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs/index';
import {RegionService} from '../region.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Region} from '../../../../../model/address';
import {determineId} from '../../../../../../@custor/helpers/compare';
import {ErrorMessage} from '../../../../../../@custor/services/errMessageService';

@Component({
  selector: 'app-edit-region',
  templateUrl: './edit-region.component.html',
  styleUrls: ['./edit-region.component.css']
})
export class EditRegionComponent implements OnInit, OnDestroy {
  @ViewChild('form')

  regionsSub: Subscription;
  title: string;
  /*serviceId:number;*/
  isNewRegion = false;
  regions: Region;
  regionsForm: FormGroup;
  loadingIndicator: boolean;
  private form: NgForm;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private config: AppConfiguration,
              private regionsService: RegionService, private errMsg: ErrorMessage,
              private toastr: ToastrService,
              private fb: FormBuilder) {
    this.regions = <Region>{};
    // initialize the form
    this.initForm();
    this.initStaticData('en');
  }

  get Description() {
    return this.regionsForm.get('cDescription');
  }

  get Code() {
    return this.regionsForm.get('cRegionId');
  }

  get DescriptionEnglish() {
    return this.regionsForm.get('cDescriptionEnglish');
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id < 1) {
      this.isNewRegion = true;
      this.title = 'Create a new Region';
      /*this.getService();*/
      return;
    }
    if (id) {
      this.getRegion(id);
    }
  }

  initStaticData(currentLang) {
    /*let SecType: RegionType = new RegionType();
    RegionTypes.forEach(pair => {
      SecType = {
        'Id': pair.Id.toString(),
        'DescriptionEnglish': pair.DescriptionEnglish,
        'Description': pair.Description
      };
      this.regionTypes.push(SecType);
    });*/
  }

  getRegion(id) {
    this.isNewRegion = false;
    this.loadingIndicator = true;
    this.regionsSub = this.regionsService
      .getRegion(id)
      .subscribe(result => {
          this.regions = result;
          console.log(this.regions);
          this.updateForm();
        },
        error => this.toastr.error(this.errMsg.getError(error)));
    this.loadingIndicator = false;
  }

  updateForm() {
    this.regionsForm.setValue({
      cRegionId: this.regions.RegionId == null ? '' : this.regions.RegionId.toString(),
      cDescription: this.regions.Description == null ? '' : this.regions.Description.toString(),
      cDescriptionEnglish: this.regions.DescriptionEnglish == null ? '' : this.regions.DescriptionEnglish.toString()
    });
    // },4000);

    this.isNewRegion = false;
  }

  initForm() {
    this.regionsForm = this.fb.group({
      cRegionId: ['', Validators.required],
      cDescription: ['', Validators.compose([Validators.required, Validators.maxLength(15),
        Validators.pattern('^([ \u1200-\u137F])+$')])],
      cDescriptionEnglish: ['', Validators.compose([Validators.required, Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z /,]+$')])]
    });
  }

  /* checkRecordExistance(): boolean {
     const formModel = this.servicesForm.value;
     this.regionsSub = this.regionsService
       .getServices(formModel.cServiceNameEnglish, formModel.cServiceType)
       .subscribe(result => {
         this.regions = result
       })
     if (this.regions.ServiceId == null) {
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
    if (!this.regionsForm.valid) {
      return;
    }

    if (this.isNewRegion) {
      /* if (this.checkRecordExistance()) {
         this.toastr.show(
           'Record Exist', 'message', {
             closeButton: true
           })
         return;
       }*/
      this.loadingIndicator = true;
    }
    return this.regionsService.saveRegion(
      this.getEditedRegion()).subscribe((regions: Region) => {
        this.saveCompleted(regions);
      },
      err => this.handleError(err));
  }

  ngOnDestroy() {
    //  this.regionsSub.unsubscribe();
  }

  onBack() {
    //this.router.navigate(['regions/list']);
    this.router.navigate(['address']);
  }

  private saveCompleted(regions?: Region) {
    if (regions) {
      this.regions = regions;
    }
    this.loadingIndicator = false;
    this.toastr.success('Record saved successfully!');
    //this.router.navigate(['regions/list']);
    this.router.navigate(['address']);
  }

  private handleError(err) {
    this.loadingIndicator = false;
    this.toastr.error(this.errMsg.getError(err));
    this.loadingIndicator = false;
  }

  private getEditedRegion(): Region {
    const formModel = this.regionsForm.value;
    return {
      RegionId: this.isNewRegion ? '0' : this.regions.RegionId,
      Description: formModel.cDescription,
      DescriptionEnglish: formModel.cDescriptionEnglish,
    };
  }
}

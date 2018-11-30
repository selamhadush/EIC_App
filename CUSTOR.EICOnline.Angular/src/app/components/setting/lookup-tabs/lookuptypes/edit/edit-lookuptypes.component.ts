import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ErrorMessage} from '@custor/services/errMessageService';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {LookuptypesModel} from '../../../../../model/lookuptypes';
import {ActivatedRoute, Router} from '@angular/router';
import {determineId} from '@custor/helpers/compare';
import {Subscription} from 'rxjs/index';
import {AppConfiguration} from '../../../../../config/appconfig';
import {ToastrService} from 'ngx-toastr';
import {LookuptypesService} from '../lookuptypes.service';
import {validate} from 'codelyzer/walkerFactory/walkerFn';

@Component({
  selector: 'app-edit-lookuptypes',
  templateUrl: './edit-lookuptypes.component.html',
  styleUrls: ['./edit-lookuptypes.component.scss']
})
export class EditLookuptypesComponent implements OnInit , OnDestroy {
  @ViewChild('form')

  lookuptypesSub: Subscription;
  private form: NgForm;
  title: string;
  /*serviceId:number;*/
  isNewLookuptypes = false;
  lookuptypes: LookuptypesModel;

  lookuptypesForm: FormGroup;
  loadingIndicator: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private config: AppConfiguration,
              private lookuptypesService: LookuptypesService, private errMsg: ErrorMessage,
              private toastr: ToastrService,
              private fb: FormBuilder) {
    this.lookuptypes = <LookuptypesModel>{};
    // initialize the form
    this.initForm();
    this.initStaticData('en');
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id < 1) {
      this.isNewLookuptypes = true;
      this.title = 'Create a new Lookup Types';
      /*this.getService();*/
      return;
    }
    if (id) {
      // to-do
      // get the selected customer either through @Input or shared service
      this.getLookuptypes(id);
    }
  }

  initStaticData(currentLang) {
    // let SecType: LookuptypesType = new LookuptypesType();
    // LookuptypesTypes.forEach(pair => {
    //   SecType = {
    //     'Id': pair.Id.toString(),
    //     'DescriptionEnglish': pair.DescriptionEnglish,
    //     'Description': pair.Description
    //   };
    //   this.sectorTypes.push(SecType);
    // });
  }

  getLookuptypes(id) {
    this.isNewLookuptypes = false;
    this.loadingIndicator = true;
    this.lookuptypesSub = this.lookuptypesService
      .getlookuptypes(id)
      .subscribe(result => {
          this.lookuptypes = result;
          this.updateForm();
        },
        error => this.toastr.error(this.errMsg.getError(error)));
    this.loadingIndicator = false;
  }

  updateForm() {
    this.lookuptypesForm.setValue({
      // cLookUpTypeId: this.lookuptypes.LookUpTypeId == null ? '' : this.lookuptypes.LookUpTypeId.toString(),
      cDescription: this.lookuptypes.Description == null ? '' : this.lookuptypes.Description.toString(),
      cDescriptionEnglish: this.lookuptypes.DescriptionEnglish == null ? '' : this.lookuptypes.DescriptionEnglish.toString(),
    });
    // },4000);

    this.isNewLookuptypes = false;
  }

  initForm() {
    this.lookuptypesForm = this.fb.group({

      cDescription: ['', Validators.compose([Validators.required, Validators.maxLength(150),
        Validators.pattern('^([ \u1200-\u137F])+$')])],
      cDescriptionEnglish: ['', Validators.compose([Validators.required, Validators.maxLength(200),
        Validators.pattern('^[a-zA-Z /,]+$')])]
    });
  }

  compareIds(id1: any, id2: any): boolean {
    const a1 = determineId(id1);
    const a2 = determineId(id2);
    return a1 === a2;
  }

  public onSubmit() {
    if (!this.lookuptypesForm.valid) {
      return;
    }

    if (this.isNewLookuptypes) {
      /* if (this.checkRecordExistance()) {
         this.toastr.show(
           'Record Exist', 'message', {
             closeButton: true
           })
         return;
       }*/
      this.loadingIndicator = true;
    }
    return this.lookuptypesService.savelookuptypes(
      this.getEditedLookuptypes()).subscribe((lookuptypes: LookuptypesModel) => {
        this.saveCompleted(lookuptypes);
      },
      err => this.handleError(err));
  }

  /* checkRecordExistance(): boolean {
     const formModel = this.servicesForm.value;
     this.lookuptypesSub = this.lookuptypesService
       .getServices(formModel.cServiceNameEnglish, formModel.cServiceType)
       .subscribe(result => {
         this.lookuptypes = result
       })
     if (this.lookuptypes.ServiceId == null) {
       return false;
     } else {
       return true;
     }
   }*/

  private saveCompleted(lookuptypes?: LookuptypesModel) {
    if (lookuptypes) {
      this.lookuptypes = lookuptypes;
    }
    this.loadingIndicator = false;
    this.toastr.success('Record saved successfully!');
    // this.router.navigate(['lookuptypes/list']);
    window.history.back();
  }

  private handleError(err) {
    this.loadingIndicator = false;
    this.toastr.error(this.errMsg.getError(err));
    this.loadingIndicator = false;
  }

  private getEditedLookuptypes(): LookuptypesModel {
    const formModel = this.lookuptypesForm.value;
    return {
      LookUpTypeId: this.isNewLookuptypes ? 0 : this.lookuptypes.LookUpTypeId,
      Description: formModel.cDescription,
      DescriptionEnglish: formModel.cDescriptionEnglish,
    };
  }

  ngOnDestroy() {
    // this.lookuptypesSub.unsubscribe();
  }

  onBack() {
    window.history.back();
  }

  get Description() {
    return this.lookuptypesForm.get('cDescription');
  }

  get DescriptionEnglish() {
    return this.lookuptypesForm.get('cDescriptionEnglish');
  }

}

import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSnackBar, MatTableDataSource} from '@angular/material';
import {determineId} from '@custor/helpers/compare';
import {AppConfiguration} from '../../config/appconfig';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {LookUpService} from '../../Services/look-up.service';
import {ErrorMessage} from '@custor/services/errMessageService';
import {LetterTemplateModel} from '../../model/letter-template.model';
import {ActivatedRoute, Router} from '@angular/router';
import {LookupsModel} from '../../model/lookups';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs/index';
import {LettertepmlateService} from './lettertepmlate.service';

@Component({
  selector: 'app-lettertemplate',
  templateUrl: './lettertemplate.component.html',
  styleUrls: ['./lettertemplate.component.scss']
})
export class LettertemplateComponent implements OnInit, OnDestroy {
  @ViewChild('form')
  incentiveRequestItemSub: Subscription;
  lookupSub: Subscription;
  title: string;
  isNewIncentiveRequestItem = false;
  LetterTemplateModel: LetterTemplateModel;
  LetterTemplateModels: LetterTemplateModel[] = [];
  letterTemplateForm: FormGroup;
  editMode = false;
  loading = false;
  dataSource: any;
  letterTemplateItemtEditIndex: number;
  LetterContent: string;
  displayedColumns = [
    'LetterType', 'Action'
  ];
  subscription: Subscription;

  loadingIndicator: boolean;
  Lookups: LookupsModel[];
  private form: NgForm;
  private tinymce: any;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              public route: ActivatedRoute,
              private http: HttpClient,
              private snackbar: MatSnackBar,
              private lookUpsService: LookUpService,
              private config: AppConfiguration,
              private LettertepmlateService: LettertepmlateService, private errMsg: ErrorMessage,
              private toastr: ToastrService,
              private fb: FormBuilder) {
    this.LetterTemplateModel = <LetterTemplateModel>{};
    // initialize the form
    this.initForm();
    this.initStaticData('en');
  }

  ngOnInit() {
    this.initForm();
    this.getIncentiveReaquestItmes();
    this.getItemLookup();
  }

  onClear() {
    this.editMode = false;
    this.letterTemplateForm.reset();
  }

  getIncentiveReaquestItmes() {
    this.LettertepmlateService.getLetterTemplateList().subscribe(result => {
      if (result.length > 0) {
        this.LetterTemplateModels = result;
        this.dataSource = new MatTableDataSource<LetterTemplateModel>(this.LetterTemplateModels);
        this.loading = false;
      }
    }, error => this.errMsg.getError(error));
  }

  getItemLookup() {
    this.loadingIndicator = true;
    this.lookupSub = this.lookUpsService
      .getLookupByParentId(707)
      .subscribe(result => {
          this.Lookups = result;
        },
        error => this.toastr.error(this.errMsg.getError(error)));
  }

  initStaticData(currentLang) {
  }

  initForm() {
    this.letterTemplateForm = this.fb.group({
      //IncentiveRequestItemId: ['0', Validators.required],
      LetterType: ['0', Validators.required],
      // Title: ['0', Validators.required],
      // ToOrg: ['', Validators.compose([Validators.required, Validators.maxLength(4), Validators.pattern('^[0-9]+$')])],
      LetterContent: ['0', Validators.required],
      IsActive: ['0', Validators.required]

    });
  }

  compareIds(id1: any, id2: any): boolean {
    const a1 = determineId(id1);
    const a2 = determineId(id2);
    return a1 === a2;
  }

  public onSubmit() {
    // if (!this.letterTemplateForm.valid) {
    //   return;
    // }

    this.loadingIndicator = true;
    return this.LettertepmlateService.saveletterTemplate(
      this.getEditedLetterTemplate()).subscribe((LetterTemplateModel: LetterTemplateModel) => {
        this.saveCompleted(LetterTemplateModel);
      },
      err => this.handleError(err));
  }

  onEditLetterTemplate(index: number) {
    this.editMode = true;
    this.letterTemplateItemtEditIndex = index;
    this.LetterTemplateModel = this.LetterTemplateModels[index];
    // this.LetterContent = this.LetterTemplateModel.LetterContent.replace(/{{FullName}}/g, 'http://mydomain.com');
    // this.LetterTemplateModel.LetterContent = this.LetterContent;
    this.letterTemplateForm.patchValue(
      this.LetterTemplateModel
    );
    console.log(this.LetterTemplateModel);
  }

  deleteLetterTemplate(index: number, id: number) {
    this.LettertepmlateService.deleteletterTemplate(id)
      .subscribe(() => {
        this.notification('Deleted');
        this.LetterTemplateModels.splice(index, 1);
        this.dataSource = new MatTableDataSource<LetterTemplateModel>(this.LetterTemplateModels);
      });
  }

  notification(message: string) {
    this.loading = false;
    this.toastr.success(` Succesfully ${message} Data.!`, 'Success');

    this.snackbar.open(` Succesfully ${message} Data.!`, 'Close', {
      duration: 3000,
    });
  }

  ngOnDestroy() {
    // this.IncentiveRequestItemSub.unsubscribe();
  }

  onBack() {
    // this.router.navigate(['IncentiveRequestItems/list']);
    window.history.back();
  }

  private saveCompleted(LetterTemplateModel?: LetterTemplateModel) {
    if (LetterTemplateModel) {
      this.LetterTemplateModel = LetterTemplateModel;
      //this.dataSource = new MatTableDataSource<LetterTemplateModel>(this.LetterTemplateModels);
      this.getIncentiveReaquestItmes();
    }
    this.onClear();
    this.loadingIndicator = false;
    this.toastr.success('Record saved successfully!');
    // this.router.navigate(['IncentiveRequestItems/list']);
    //window.history.back();
  }

  private handleError(err) {
    this.loadingIndicator = false;
    this.toastr.error(this.errMsg.getError(err));
    this.loadingIndicator = false;
  }

  private getEditedLetterTemplate(): LetterTemplateModel {
    const formModel = this.letterTemplateForm.value;
    return {
      LetterTemplateId: this.isNewIncentiveRequestItem ? 0 : this.LetterTemplateModel.LetterTemplateId,
      LetterType: formModel.LetterType,
      LetterContent: formModel.LetterContent,
      IsActive: true,
    };
  }

}


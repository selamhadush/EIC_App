import {AfterContentChecked, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {ProjectModel} from '../../../model/Project.model';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ProjectProfileService} from '../../../Services/project-profile.service';
import {AddressModel} from '../../../model/address/Address.model';
import {AddressService} from '../../../Services/Address/address.service';
import {RegionModel} from '../../../model/address/Region.model';
import {ZoneModel} from '../../../model/address/Zone.model';
import {WoredaModel} from '../../../model/address/Woreda.model';
import {KebeleModel} from '../../../model/address/Kebele.model';
import {ToastrService} from 'ngx-toastr';
import {TownModel} from '../../../model/address/Town.model';
import {SectorService} from '../../../Services/Sector.service';
import {SectorModel} from '../../../model/Sector.model';
import {SiteService} from '../../../Services/site.service';
import {SubSectorModel} from '../../../model/SubSector.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormOfOwnershipModel} from '../../../model/EnumModel';
import {DataSharingService} from '../../../Services/data-sharing.service';
import {ActivityService} from '../../setting/category-tabs/Activity/activity.service';
import {ActivityModel} from '../../../model/activity';
import {InvactivityService} from '../../setting/category-tabs/InvActivity/invactivity.service';
import {InvActivityModel} from '../../../model/invactivity';
import {ErrorMessage} from '@custor/services/errMessageService';
import {FormService} from '@custor/validation/custom/form';
import {CustomValidators} from '@custor/validation/custom/custom_validators';
import {FormOfOwnership} from '@custor/const/consts';
import {InvestorService} from '../../investor/investor.service';
import {UserActivityDataServices} from '../../../admin/user-detail/user-detail.service';
import {AccountService} from '@custor/services/security/account.service';
import {SiteModel} from '../../../model/Site.model';

@Component({
  selector: 'app-project-profile-form',
  templateUrl: './project-profile-form.component.html',
  styleUrls: ['./project-profile-form.component.css']
})
export class ProjectProfileFormComponent implements OnInit, OnDestroy, AfterContentChecked {
  @ViewChild('costF') costForm: NgForm;
  formOfOwnershipList: FormOfOwnershipModel[] = [];
  subscription: Subscription;
  serviceIdSubscription: Subscription;
  // serviceId: any;
  editMode = false;
  loading = false;
  project: ProjectModel;
  address: AddressModel;
  projectId: any;
  projectIdEditing: number;
  addressId: number;
  sectorList: SectorModel[] = [];
  subSectorList: SubSectorModel[] = [];
  regions: RegionModel[] = [];
  zones: ZoneModel[] = [];
  filteredZones: ZoneModel[] = [];
  towns: TownModel[] = [];
  woredas: WoredaModel[] = [];
  filteredWoredas: WoredaModel[] = [];
  kebeles: KebeleModel[] = [];
  filteredKebeles: KebeleModel[] = [];
  public formErrors = {
    ProjectName: '',
    ProjectDescription: '',
    StartDate: '',
    operationDate: '',
    EndingDate: '',
    Sector: '',
    SubSector: '',
    // FormOfInvestment: '',
    // FormOfOwnership: '',
    Region: '',
    Zone: '',
    Woreda: '',
    Kebele: '',
    SpecificAreaName: '',
    Remark: '',
    EnvironmentalImpact: ''

  };

  minDate: Date;
  initMinDate: Date;
  maxDate: Date;
  projectForm: FormGroup;
  private addressList: AddressModel;
  public activity: ActivityModel[];
  public filterActivityLIst: ActivityModel[];

  public investmentActivity: InvActivityModel[];
  public filterInvestmentActivityList: InvActivityModel[];
  public filterSubSectorList: SubSectorModel[];
  public allSiteList: SiteModel[] = [];


  constructor(private route: ActivatedRoute,
              private router: Router,
              public activityDataServices: UserActivityDataServices,
              public accountServices: AccountService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private projectProfileService: ProjectProfileService,
              private addressService: AddressService,
              private investorService: InvestorService,
              private errMsg: ErrorMessage,
              private sectorService: SectorService,
              private siteService: SiteService,
              public formService: FormService,
              public snackbar: MatSnackBar,
              public activityService: ActivityService,
              public invactivityService: InvactivityService,
              private dataSharing: DataSharingService) {
    this.project = <ProjectModel>{};
    this.address = <AddressModel>{};
  }

  setMinDate(minD: Date) {
    this.minDate = minD;
  }

  setMaxDate(value: Date) {
    this.maxDate = value;
  }

  updateDateRange() {
    const today = new Date();
    let mm1, dd1;
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) {
      dd1 = '0' + dd;
    }
    if (mm < 10) {
      mm1 = '0' + mm;
    }
    const today1 = mm1 + '/' + dd1 + '/' + yyyy;
    this.initMinDate = new Date(today);
    if (this.projectForm.value.OperationDate !== null) {
      this.minDate = this.projectForm.value.OperationDate;
    }
  }

  ngOnInit() {
    this.fillAddressLookups();
    console.log('project form lazly loaded');
    this.formBuild();
    this.serviceIdSubscription = this.dataSharing.serviceId
      .subscribe(result => {
        this.projectForm.patchValue({
          ServiceId: result,
        });
        console.log(result);
      });
    this.updateDateRange();
    this.initStaticData('en');

    this.route.params
      .subscribe((params: Params) => {
        this.projectId = +params['id'];
        // this.projectId = this.route.snapshot.params['id'];
        if (this.projectId > 1) {
          console.log(this.projectId);
          this.getProjectDetail();
        }
      });
  }

  getProjectDetail() {
    this.projectProfileService.getOneById(this.projectId).subscribe(project => {
      console.log(project);
      if (localStorage.getItem('ParentProjectId') === null) {
        this.editMode = true;
        this.projectIdEditing = project.ProjectId;
        this.projectId = project.ProjectId;
        localStorage.setItem('ProjectId', this.projectId);
        localStorage.setItem('workFlowId', project.ServiceApplication[0].ServiceWorkflow[0].ServiceWorkflowId);
        localStorage.setItem('ServiceId', project.ServiceApplication[0].ServiceId);
      }
      this.projectForm.patchValue(project);
      this.getAddressData(project.ProjectId);
    }, error => this.errMsg.getError(error));
  }

  getAddressData(parent: number) {
    this.addressService.getAddress(parent)
      .subscribe((result: AddressModel) => {
        this.addressList = result;
        // console.log(result)
        this.getKebeleByWoredaId(result.WoredaId);
        this.addressId = result.AddressId;
        this.projectForm.get('address').patchValue(result);
      }, error => this.errMsg.getError(error));
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

  fillAddressLookups() {
    // To-do bring all in one go caching
    this.loading = true;
    this.getRegions();
    this.getAllZones();
    this.getAllWoredas();
    // this.getAllKebeles();
    this.getAllSector();
    this.getAllSubSector();
    this.getAllActivityService();
    this.getAllInvestmentActivity();
    this.getAllSite();

  }

  getAllSector() {
    this.sectorService.getSector()
      .subscribe(result => {
          this.sectorList = result;
        },
        error => this.toastr.error(this.errMsg.getError(error)
        ));
  }

  getAllSubSector() {
    this.sectorService.getAllSubSector()
      .subscribe(result => {
          this.subSectorList = result;
          this.filterSubSectorList = result;
        },
        error => this.toastr.error(this.errMsg.getError(error)));
  }

  getAllActivityService() {
    this.activityService.getActivitys()
      .subscribe(result => {
        this.activity = result;

        this.filterActivityLIst = result;
      }, error => this.toastr.error(this.errMsg.getError(error)));
  }

  getAllInvestmentActivity() {
    this.invactivityService.getInActivitys()
      .subscribe(result => {
        this.investmentActivity = result;

        this.filterInvestmentActivityList = result;
      }, error => this.toastr.error(this.errMsg.getError(error)));
  }

  getRegions() {
    this.addressService.getRegions()
      .subscribe(result => {
          this.regions = result;
        },
        error => this.toastr.error(this.errMsg.getError(error)));
  }

  getAllZones() {
    this.addressService.getAllZones()
      .subscribe(result => {
          this.zones = result;
          this.filteredZones = result;
        },
        error => this.toastr.error(this.errMsg.getError(error)));
  }

  getAllWoredas() {
    this.addressService.getAllWoredas()
      .subscribe(result => {
          this.woredas = result;
          this.filteredWoredas = result;
        },
        error => this.toastr.error(this.errMsg.getError(error)));
  }

  getKebeleByWoredaId(wordaId: any) {
    this.addressService.getKebelesByWoreda(wordaId)
      .subscribe(result => {
        this.kebeles = result;
        // console.log(result);
        this.loading = false;
        this.filteredKebeles = result;
      });
  }

  filterRegion(regionCode: string) {
    console.log(regionCode);
    if (!regionCode) {
      return;
    }
    this.filteredZones = null;
    this.filteredKebeles = null;
    this.filteredWoredas = null;
    this.filteredZones = this.zones.filter((item) => {
      return item.RegionId === regionCode;
    });
  }


  filterZone(zoneCode: string) {
    if (!zoneCode) {
      return;
    }
    this.filteredKebeles = null;
    this.filteredWoredas = null;

    this.filteredWoredas = this.woredas.filter((item) => {
      return item.ZoneId === zoneCode;
    });
  }

  filterWoreda(woredaCode: string) {
    if (!woredaCode) {
      return;
    }
    console.log(woredaCode);

  }

  filterSubSector(SubSecId: string) {
    if (!SubSecId) {
      return;
    }

    this.filterActivityLIst = null;
    this.filterSubSectorList = this.subSectorList.filter((item) => {
      return item.SectorId === SubSecId;
    });
  }

  filterActivity(activityId: number) {
    if (!activityId) {
      return;
    }

    this.filterActivityLIst = this.activity.filter((item) => {
      return item.SubSectorId === activityId;
    });
  }

  filterInvestmentActivity(InvActivityId: number) {
    if (!InvActivityId) {
      return;
    }
    console.log(this.investmentActivity);
    this.filterInvestmentActivityList = this.investmentActivity.filter((item) => {
      return item.ActivityId === InvActivityId;
    });
  }

  onSubmit() {
    this.loading = true;
    this.formService.markFormGroupTouched(this.projectForm);
    if (this.projectForm.valid) {
      if (!this.editMode) {
        this.projectProfileService.create(this.projectForm.value)
          .subscribe(result => {
            // console.log(result);
            console.log(result.ServiceApplication[0].ServiceApplicationId);
            this.projectId = result.ProjectId;
            localStorage.setItem('ProjectId', this.projectId);
            this.router.navigate(['pro/', this.projectId]);
            localStorage.setItem('workFlowId', result.ServiceApplication[0].ServiceWorkflow[0].ServiceWorkflowId);
            localStorage.setItem('ServiceApplicationId', result.ServiceApplication[0].ServiceApplicationId);
            this.notification('project  saved');
            this.saveAddress();
          });
      } else {
        this.projectProfileService.update(this.projectForm.value, this.projectIdEditing)
          .subscribe(result => {
            this.projectId = result.ProjectId;
            localStorage.setItem('ProjectId', this.projectId);
            this.notification('project updated');
            this.saveAddress();
          });
      }
    } else {
      this.formErrors = this.formService.validateForm(this.projectForm, this.formErrors, false);
    }
  }


  saveAddress() {
    this.projectForm.get('address').patchValue({
      ParentId: localStorage.getItem('ProjectId')
    });
    if (this.editMode && typeof (this.addressId) !== 'undefined') {
      this.addressService.updateAddress(this.projectForm.get('address').value, this.addressId)
        .subscribe(result => {
          this.notification('address updated');
          // this.onClear();
        });
    } else {
      this.addressService.saveAddress(this.projectForm.get('address').value)
        .subscribe(result => {
          setTimeout(() => this.dataSharing.projectId.next(this.projectId), 0);
          this.notification('address saved');
          // this.onClear();
          setTimeout(() => this.dataSharing.steeperIndex.next(2), 0);
          setTimeout(() => this.dataSharing.currentIndex.next(2), 0);
        });
    }
  }

  formBuild() {
    this.projectForm = this.formBuilder.group({
      ProjectName: [this.project.ProjectName, [Validators.required,
        CustomValidators.validateCharacters, Validators.minLength(2)]],
      InvestorId: '',
      ParentProjectId: '0',
      CreatedUserName: this.accountServices.currentUser.UserName,
      ProjectDescription: [this.project.ProjectDescription, [Validators.required, Validators.minLength(2)]],
      StartDate: [this.project.StartDate, [Validators.required]],
      OperationDate: [this.project.OperationDate, Validators.required],
      ServiceId: [''],
      SectorId: [this.project.SectorId],
      SubSectorId: [this.project.SubSectorId],
      ActivityId: [this.project.ActivityId],
      IsOromiaSpecialZone: [this.project.IsOromiaSpecialZone],
      InvActivityId: [this.project.InvActivityId],
      EndingDate: [this.project.EndingDate, Validators.required],
      EnvironmentalImpact: [this.project.EnvironmentalImpact, [Validators.required, Validators.minLength(2)
      ]],

      'address': new FormGroup({
        ParentId: new FormControl(),
        RegionId: new FormControl(),
        ZoneId: new FormControl(),
        WoredaId: new FormControl(),
        KebeleId: new FormControl(),
        SpecificAreaName: new FormControl(),
        IsIndustrialPark: new FormControl(),
        IndustrialParkId: new FormControl(),
        Remark: new FormControl()
      })
    });

    this.projectForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formService.validateForm(this.projectForm, this.formErrors, true);
    });
  }

  initStaticData(currentLang) {
    let formOfOwnership: FormOfOwnershipModel = new FormOfOwnershipModel();
    FormOfOwnership.forEach(pair => {
      formOfOwnership = {
        'Id': pair.Id.toString(),
        'Desc': (currentLang === 'am' ? pair.Description : pair.DescriptionEng)
      };
      this.formOfOwnershipList.push(formOfOwnership);
    });
  }

  notification(message: string) {
    this.loading = false;
    this.toastr.success(` Succesfully ${message} Data.!`, 'Success');

    this.snackbar.open(` Succesfully ${message} Data.!`, 'Close', {
      duration: 3000,
    });
  }

  ngAfterContentChecked(): void {
    this.projectForm.patchValue({
      ServiceId: localStorage.getItem('ServiceId'),
      InvestorId: localStorage.getItem('InvestorId'),
      ParentProjectId: localStorage.getItem('ParentProjectId')
    });

    if (+localStorage.getItem('ServiceId') === 1023 && !this.editMode) {
      this.projectForm.patchValue({
        ParentProjectId: localStorage.getItem('ParentProjectId')
      });
    }
  }

  next() {
    this.dataSharing.steeperIndex.next(2);

  }

  private getAllSite() {
    this.siteService.getAll()
      .subscribe(result => {
        this.filterOnlineUser(result);
      });

  }

  getIsChecked() {
    console.log(this.projectForm.get('address').get('IsIndustrialPark').value);
    return this.projectForm.get('address').get('IsIndustrialPark').value;

  }


  private filterOnlineUser(result: SiteModel[]) {
    this.allSiteList = result.filter((item) => {
      return item.SiteCode !== 'OnlineSite';
    });
  }
}

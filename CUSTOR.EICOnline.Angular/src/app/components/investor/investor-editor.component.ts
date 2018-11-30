import {AfterContentChecked, AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {fadeInOut} from '@custor/services/animations';
import {InvestorService} from './investor.service';
import {Investor} from '../../model/investor';
import {Subscription} from 'rxjs';
import {Utilities} from '@custor/helpers/utilities';

import {Gender, LegalStatus, Lookup} from '../../model/lookupData';
import {ALPHABET_WITHSPACE_REGEX, GENDERS, LEGAL_STATUS} from '../../const/consts';
import {determineId} from '@custor/helpers/compare';
import {ConfigurationService} from '@custor/services/configuration.service';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '@custor/services/security/auth.service';
import {AccountService} from '@custor/services/security/account.service';
import {Permission} from '../../model/security/permission.model';
import {AddressService} from '../../Services/Address/address.service';
import {AddressModel} from '../../model/address/Address.model';
import {KebeleModel} from '../../model/address/Kebele.model';
import {ZoneModel} from '../../model/address/Zone.model';
import {WoredaModel} from '../../model/address/Woreda.model';
import {RegionModel} from '../../model/address/Region.model';
import {LookUpService} from '../../Services/look-up.service';
import {DataSharingService} from '../../Services/data-sharing.service';
import {LookupsModel} from '../../model/lookups';
import {FormOfOwnershipModel} from '../../model/EnumModel';
import {FormOfOwnership} from '@custor/const/consts';
import {NationalityModel} from '../../model/address/NationalityModel';

@Component({
  selector: 'app-edit-investor',
  templateUrl: './investor-editor.component.html',
  styleUrls: ['./investor-editor.component.scss'],
  providers: [InvestorService],
  animations: [fadeInOut]
})
export class EditInvestorComponent implements OnInit, AfterViewInit, OnDestroy, AfterContentChecked {
  @ViewChild('form')
  formOfOwnershipList: FormOfOwnershipModel[] = [];

  investorSub: Subscription;
  private form: NgForm;
  title: string;
  isNewInvestor = false;
  investor: Investor;
  countries: Lookup[] = [];
  lookups: Lookup[] = [];
  regions: RegionModel[] = [];
  zones: ZoneModel[] = [];
  filteredZones: ZoneModel[] = [];
  woredas: WoredaModel[] = [];
  filteredWoredas: WoredaModel[] = [];
  kebeles: KebeleModel[] = [];
  filteredKebeles: KebeleModel[] = [];
  // isEditMode = false;
  investorForm: FormGroup;
  loadingIndicator: boolean;
  genders: Gender[] = [];
  legalStatuses: LegalStatus[] = [];
  isCompany: boolean;
  currentLang = 'en';
  countryLookupType = 1;
  allPermissions: Permission[] = [];
  private addressList: AddressModel;
  private addressId: number | undefined;
  public investorTitle: Lookup[];
  TitleLookup: LookupsModel[];
  public nationList: NationalityModel[];
  originFlag = true;
  public countryListWithOutEthipia: LookupsModel[];
  public branch = false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              public dataSharing: DataSharingService,
              private lookUpService: LookUpService,
              private addressService: AddressService,
              private http: HttpClient, private accountService: AccountService,
              private authService: AuthService,
              private custService: InvestorService,
              private configService: ConfigurationService,
              private toastr: ToastrService,
              private fb: FormBuilder) {
    this.checkAuthoriation();
    // create an empty object from the Investor model
    this.investor = <Investor>{};
    // initialize the form
    this.initForm();
    console.log(this.accountService.currentUser.Roles);
  }

  checkAuthoriation() {
    // if (!this.canManageInvestors) {
    //   this.toastr.error('You are not allowed to access this page');
    //   this.router.navigate(['denied']);
    // }
  }

  ngAfterContentChecked(): void {
    this.investorForm.patchValue({
      UserId: this.accountService.currentUser.Id
    });
  }

  ngOnInit() {
    this.loadingIndicator = true;
    this.currentLang = this.configService.language;
    this.initStaticData(this.currentLang);
    this.initStaticDataOwnerShip(this.currentLang);
    this.formControlValueChanged();
    const id = this.activatedRoute.snapshot.params['id'];
    // console.debug(id);
    if (id < 1) {
      this.isNewInvestor = true;
      this.isCompany = false;

      this.title = 'Create a new Investor';

      return;
    }
    if (id) {
      // to-do
      // get the selected investor either through @Input or shared service
      this.getInvestor(id);
    }
    this.fillAddressLookups();
  }

  formControlValueChanged() {
    const cLStatus = this.investorForm.get('cLegalStatus');
    const cCompName = this.investorForm.get('cNationalityCompany');
    this.legalStatus.valueChanges.subscribe(
      (intLegal: number) => {
        if (intLegal === 1) { // Sole
          console.log(intLegal);
          this.ClearCompanyValidators();
          this.firstNameEng.setValidators([Validators.compose([Validators.required, Validators.minLength(2),
            Validators.pattern(ALPHABET_WITHSPACE_REGEX)])]);
          this.fatherNameEng.setValidators([Validators.compose([Validators.required, Validators.minLength(2),
            Validators.pattern(ALPHABET_WITHSPACE_REGEX)])]);
          this.grandNameEng.setValidators([Validators.compose([Validators.required, Validators.minLength(2),
            Validators.pattern(ALPHABET_WITHSPACE_REGEX)])]);
          // this.firstName.setValidators([Validators.compose([Validators.required, Validators.minLength(2),
          //   Validators.pattern(ET_ALPHABET_WITHSPACE_REGEX)])]);
          // this.fatherName.setValidators([Validators.compose([Validators.required, Validators.minLength(2),
          //   Validators.pattern(ET_ALPHABET_WITHSPACE_REGEX)])]);
          // this.grandName.setValidators([Validators.compose([Validators.required, Validators.minLength(2),
          //   Validators.pattern(ET_ALPHABET_WITHSPACE_REGEX)])]);
          this.nationality.setValidators([Validators.required]);
          this.gender.setValidators([Validators.required]);

          this.isCompany = false;
        } else {
          this.ClearSoleValidators();
          this.nationalityCompany.setValidators([Validators.required]);
          this.companyNameEng.setValidators([Validators.required]);
          // this.companyName.setValidators([Validators.required]);

          this.isCompany = true;
        }
        // cCompName.updateValueAndValidity();
        // cLStatus.updateValueAndValidity();
      });


    // this.investorForm.get('FormOfOwnership').valueChanges.subscribe(
    //   (intLegal: number) => {
    //     console.log(intLegal);
    //     if (intLegal === 5) {
    //       this.branch = true;
    //       // alert (this.branch);
    //       console.log(this.branch);

    //     } else {
    //       this.branch = false;
    //       console.log(this.branch);

    //     }
    //   });
  }

  private getAllNation() {
    this.addressService.getNationality()
      .subscribe(result => {
        this.nationList = result;
      });
  }

  initStaticDataOwnerShip(currentLang) {
    this.formOfOwnershipList = [];

    let formOfOwnership: FormOfOwnershipModel = new FormOfOwnershipModel();
    FormOfOwnership.forEach(pair => {
      formOfOwnership = {
        'Id': pair.Id.toString(),
        'Desc': (currentLang === 'et' ? pair.Description : pair.DescriptionEng)
      };
      console.log(formOfOwnership);

      this.formOfOwnershipList.push(formOfOwnership);
    });
    // console.log(this.formOfOwnershipList);
  }

  ClearSoleValidators() {
    // this.firstNameEng.clearValidators();
    // this.fatherNameEng.clearValidators();
    // this.grandNameEng.clearValidators();
    this.firstName.clearValidators();
    this.fatherName.clearValidators();
    this.grandName.clearValidators();
    this.nationality.clearValidators();
    this.gender.clearValidators();
  }

  ClearCompanyValidators() {
    this.nationalityCompany.clearValidators();
    // this.companyName.clearValidators();
    this.companyNameEng.clearValidators();
  }

  initStaticData(currentLang) {
    let gender: Gender = new Gender();
    GENDERS.forEach(pair => {
      gender = {'Id': pair.Id.toString(), 'Desc': (currentLang === 'et' ? pair.Description : pair.DescriptionEnglish)};
      this.genders.push(gender);
      console.log(pair);
    });
    let legalS: LegalStatus = new LegalStatus();
    LEGAL_STATUS.forEach(pair => {
      legalS = {'Id': pair.Id.toString(), 'Desc': (currentLang === 'et' ? pair.Description : pair.DescriptionEnglish)};
      this.legalStatuses.push(legalS);
    });

    // Fill data from Lookup table
    this.getLookups();
  }

  private getPermissions() {
    this.loadingIndicator = true;

    this.accountService.getPermissions()
      .subscribe(result => {
          this.allPermissions = result;
        },
        error => {
          this.loadingIndicator = false;
          this.toastr.error(`Unable to retrieve permissions from the server.\r\nErrors:
              "${Utilities.getHttpResponseMessage(error)}"`, 'Get Permissions Error');
        });
  }

  get canManageInvestors() {
    return this.accountService.userHasPermission(Permission.manageInvestorsPermission);
  }

  get canViewInvestors() {
    return this.accountService.userHasPermission(Permission.viewInvestorsPermission);
  }

  ngOnDestroy() {
    // this.investorSub.unsubscribe();
  }

  getInvestor(id) {
    this.isNewInvestor = false;
    // this.loadingIndicator = true;
    this.investorSub = this.custService
      .getInvestor(id)
      .subscribe(result => {
          this.investor = result;
          this.fillAddressLookups();
          this.updateForm();
          // this.getAddressData(this.investor.InvestorId);
        },
        error => this.toastr.error(error));
    this.loadingIndicator = false;
  }

  getAddressData(parent: number) {
    this.addressService.getAddress(parent)
      .subscribe((result: AddressModel) => {
        this.addressList = result;
        console.log(result);
        this.getKebeleByWoredaId(result.WoredaId);
        this.addressId = result.AddressId;
        this.investorForm.get('address').patchValue(result);
      }, error => this.toastr.error(error));
  }

  // getInvestorTitle() {
  //   this.lookUpService.getAll().subscribe(result => {
  //     console.log(result);
  //     this.investorTitle = result;
  //   });

  // }

  fillAddressLookups() {
    // to-do
    // bring all in one go
    // caching
    this.getRegions();
    this.getAllZones();
    this.getAllWoredas();
    this.getInvestorTitle(89);
    this.getCountryTitle(31);
    this.getAllNation();
    this.getAllKebeles();
    // this.getInvestorTitle();

  }

  getLookups() {
    this.custService.getLookupsByLang(this.currentLang)
      .subscribe(result => {
          this.countries = result;
          console.log(result);
          // console.log (this.lookups.length + ' countries');
          // if (this.lookups) {
          //   this.countries = this.lookups.filter((item) => item.LookupTypeId === this.countryLookupType);
          //   console.log(this.countries);
          //   // filter more lookups
          // }
        },
        error => this.toastr.error(error));
  }
  getRegions() {
    this.custService.getRegionsByLang(this.currentLang)
      .subscribe(result => {
          this.regions = result;
        },
        error => this.toastr.error(error));
  }

  getAllZones() {
    this.custService.getAllZonesByLang(this.currentLang)
      .subscribe(z => {
          this.zones = z;
          if (this.zones) {
            console.log('Region ' + this.investor.RegionId);
            this.filterRegion(this.investor.RegionId);
          }
        },
        error => this.toastr.error(error));
  }

  getAllWoredas() {
    this.custService.getAllWoredasByLang(this.currentLang)
      .subscribe(result => {
          this.woredas = result;
          // alert (result.length);
          if (this.woredas) {
            this.filterZone(this.investor.ZoneId);
          }
        },
        error => this.toastr.error(error));
  }

  // very expensive!
  getAllKebeles() {
    this.custService.getAllKebelesByLang(this.currentLang)
      .subscribe(result => {
          this.kebeles = result;
          if (this.kebeles) {
            this.filterWoreda(this.investor.WoredaId);
          }
        },
        error => this.toastr.error(error));
  }

  // getRegions() {
  //   this.custService.getRegionsByLang(this.currentLang)
  //     .subscribe(result => {
  //         this.regions = result;
  //       },
  //       error => this.toastr.error(error));
  // }
  // getRegions() {
  //   this.addressService.getRegions()
  //     .subscribe(result => {
  //         this.regions = result;
  //       },
  //       error => this.toastr.error(error));
  // }

  initForm() {
    this.investorForm = this.fb.group({
      cLegalStatus: ['1', Validators.required], // sole
      cFirstNameEng: ['', [Validators.compose([Validators.required, Validators.minLength(2),
        Validators.pattern(ALPHABET_WITHSPACE_REGEX)])]],
      cFatherNameEng: ['', [Validators.compose([Validators.required, Validators.minLength(2),
        Validators.pattern(ALPHABET_WITHSPACE_REGEX)])]],
      cGrandNameEng: ['', [Validators.compose([Validators.required, Validators.minLength(2),
        Validators.pattern(ALPHABET_WITHSPACE_REGEX)])]],
      cFirstName: [''],
      cFatherName: [''],
      cGrandName: [''],
      cNationality: ['1'], // Ethiopian
      cNationalityCompany: [''],
      cCompanyName: [''],
      cCompanyNameEng: [''],
      cGender: [''],
      Title: [''],
      FormOfOwnership: [''],
      cIsEthiopianOrigin: [false],
      cTin: ['', Validators.maxLength(10)],

      cRegNumber: [''],
      cRegDate: [''],
      cTradeNameEng: [''],
      cTradeName: [''],
      'address': new FormGroup({
        ParentId: new FormControl(),
        RegionId: new FormControl(),
        ZoneId: new FormControl(),
        WoredaId: new FormControl(),
        KebeleId: new FormControl(),
        OtherAddress: new FormControl(),
        CellPhoneNo: new FormControl(),
        // SpecificAreaName: new FormControl(),
        HouseNo: new FormControl(),
        TeleNo: new FormControl(),
        Fax: new FormControl(),
        Pobox: new FormControl(),
        Email: new FormControl(),
        Remark: new FormControl()
      })

    });
  }

  updateForm() {
    // const _shortDate = 'dd/MM/yyyy';
    //Todo improved
    // setTimeout(() => //expensive operation - due to a bug in mat-select. To be improved!
    // {

    this.investorForm.patchValue({
      cLegalStatus: this.investor.LegalStatus,
      cFirstName: this.investor.FirstName || '',
      cFatherName: this.investor.FatherName || '',
      cGrandName: this.investor.GrandName || '',
      cFirstNameEng: this.investor.FirstNameEng || '',
      cFatherNameEng: this.investor.FatherNameEng || '',
      cGrandNameEng: this.investor.GrandNameEng || '',
      cNationality: this.investor.Nationality == null ? '' : this.investor.Nationality.toString(),
      cNationalityCompany: this.investor.Nationality == null ? '' : this.investor.Nationality.toString(),
      // RegionId: this.investor.RegionId == null ? '' : this.investor.RegionId.toString(),
      // ZoneId: this.investor.ZoneId == null ? '' : this.investor.ZoneId.toString(),
      // WoredaId: this.investor.WoredaId == null ? '' : this.investor.WoredaId.toString(),
      // KebeleId: this.investor.KebeleId == null ? '' : this.investor.KebeleId.toString(),
      cGender: this.investor.Gender == null ? '' : this.investor.Gender.toString(),
      cCompanyName: this.investor.FirstName || '',
      cCompanyNameEng: this.investor.FirstNameEng || '',
      cTin: this.investor.Tin || '',
      // cOtherAddress: this.investor.OtherAddress || '',
      cRegNumber: this.investor.RegistrationNumber || '',
      cRegDate: this.investor.RegistrationDate || '',
      cTradeNameEng: this.investor.TradeNameEnglish || '',
      cTradeName: this.investor.TradeName || '',
      Title: this.investor.Title || '',
      // FormOfOwnership: this.investor.FormOfOwnership || '',
      FormOfOwnership: this.investor.FormOfOwnership == null ? '' : this.investor.FormOfOwnership.toString(),
      cIsEthiopianOrigin: this.investor.IsEthiopianOrigin,

    });
    // },2000);
    if (this.investor.LegalStatus > 1) {
      this.isCompany = true;
    } else {
      this.isCompany = false;
    }
    this.isNewInvestor = false;
    // setTimeout(() => {
    this.investorForm.get('address').patchValue({
      RegionId: this.investor.RegionId == null ? '' : this.investor.RegionId.toString(),
      ZoneId: this.investor.ZoneId == null ? '' : this.investor.ZoneId.toString(),
      WoredaId: this.investor.WoredaId == null ? '' : this.investor.WoredaId.toString(),
      KebeleId: this.investor.KebeleId == null ? '' : this.investor.KebeleId.toString(),
      HouseNo: this.investor.HouseNo || '',
      TeleNo: this.investor.TeleNo || '',
      Pobox: this.investor.Pobox || '',
      Fax: this.investor.Fax || '',
      CellPhoneNo: this.investor.CellPhoneNo || '',
      Email: this.investor.Email || '',
      OtherAddress: this.investor.OtherAddress || ''
    });
  // }, 2000);
    this.branch = (this.investor.FormOfOwnership.toString() === '5');
  }

  compareIds(id1: any, id2: any): boolean {
    const a1 = determineId(id1);
    const a2 = determineId(id2);
    return a1 === a2;
  }

  public onSubmit() {
    if (!this.investorForm.valid) {
      console.log('error!!');
      return;
    }
    // alert (this.legalStatus.value);
    const lStatus: number = this.legalStatus.value;
    const fOwnership: number = this.FormOfOwnershipV.value;
    // alert (fOwnership);
    if (lStatus.toString() === '1' && fOwnership.toString() === '4' ) {
      this.toastr.error('The legal status and form of ownership combination is invalid');
      return;
    }
    const t: string = this.tin.value;
    if (t.replace(' ', '').trim().length > 0 && t.replace(' ', '').trim().length < 10) {
      this.toastr.error('TIN must be 10 digits long');
      return;
    }
    this.loadingIndicator = true;
    console.log(this.getEditedInvestor());
    return this.custService.saveInvestor(this.getEditedInvestor())
      .subscribe((investor: Investor) => {
          this.saveCompleted(investor);
          localStorage.setItem('InvestorId', investor.InvestorId.toString());
          localStorage.setItem('legalStatus', investor.LegalStatus.toString());
          this.saveAddress();
        },
        err => this.handleError(err)
      );
  }

  private saveCompleted(investor?: Investor) {
    if (investor) {
      this.investor = investor;
    }
    this.loadingIndicator = false;
    this.toastr.success('Record saved successfully!');
    // if (this.accountService.getUserType()) {
    //   this.router.navigate(['investor']);
    // } else {
    //   this.router.navigate(['search-browser']);
    //
    // }
  }

  private handleError(err) {
    // alert (this.errMsg.response.toString());

    this.loadingIndicator = false;
    this.toastr.error(err);
    this.loadingIndicator = false;
    // console.log(err.message);
  }

  private getEditedInvestor(): Investor {
    const formModel = this.investorForm.value;

    const add = this.investorForm.get('address').value;
    console.log (add);
    return {
      InvestorId: this.isNewInvestor ? 0 : this.investor.InvestorId,
      FirstName: this.isCompany ? formModel.cCompanyName : formModel.cFirstName,
      FatherName: this.isCompany ? '' : formModel.cFatherName,
      GrandName: this.isCompany ? '' : formModel.cGrandName,
      FirstNameEng: this.isCompany ? formModel.cCompanyNameEng : formModel.cFirstNameEng,
      FatherNameEng: this.isCompany ? '' : formModel.cFatherNameEng,
      GrandNameEng: this.isCompany ? '' : formModel.cGrandNameEng,
      Nationality: this.isCompany ? formModel.cNationalityCompany : formModel.cNationality,
      Gender: this.isCompany ? null : formModel.cGender,
      Tin: formModel.cTin,
      RegistrationDate: formModel.cRegDate,
      RegistrationNumber: formModel.cRegNumber,
      TradeName: formModel.cTradeName,
      TradeNameEnglish: formModel.cTradeNameEng,
      LegalStatus: formModel.cLegalStatus,
      IsEthiopianOrigin: formModel.cIsEthiopianOrigin,
      UserId: this.accountService.currentUser.Id,
      SiteId: '',
      IsActive: true,
      IsDeleted: false,
      Title: this.isCompany ? null : formModel.Title,
      FormOfOwnership: formModel.FormOfOwnership,
      RegionId: add.RegionId,
      ZoneId: add.ZoneId,
      WoredaId: add.WoredaId,
      KebeleId: add.KebeleId,
      HouseNo: add.HouseNo,
      TeleNo: add.TeleNo,
      Pobox: add.Pobox,
      Fax: add.Fax,
      CellPhoneNo: add.CellPhoneNo,
      Email: add.Email,
      OtherAddress: add.OtherAddress
    };
  }


  saveAddress() {
    this.investorForm.get('address').patchValue({
      ParentId: localStorage.getItem('InvestorId')
    });
    console.log('address');
    console.log(this.investorForm.get('address').value);
    this.addressService.saveAddress(this.investorForm.get('address').value)
      .subscribe(result => {
        // this.notification('address saved');
        this.dataSharing.investorTabSelectedIndex.next(1);
        // this.router.navigate(['associate/form/0']);
      });

  }

  // getAllZones() {
  //   this.addressService.getAllZones()
  //     .subscribe(result => {
  //         this.zones = result;
  //         this.filteredZones = result;
  //       },
  //       error => this.toastr.error(error));
  // }

  // getAllWoredas() {
  //   this.addressService.getAllWoredas()
  //     .subscribe(result => {
  //         this.woredas = result;
  //         this.filteredWoredas = result;

  //       },
  //       error => this.toastr.error(error));
  // }

  getKebeleByWoredaId(wordaId: any) {
    this.addressService.getKebelesByWoreda(wordaId)
      .subscribe(result => {
        this.kebeles = result;
        // console.log(result);

        this.filteredKebeles = result;
      });
  }

  // filterRegion(regionCode: string) {
  //   console.log(regionCode);
  //   if (!regionCode) {
  //     return;
  //   }
  //   this.filteredZones = null;
  //   this.filteredKebeles = null;
  //   this.filteredWoredas = null;
  //   this.filteredZones = this.zones.filter((item) => {
  //     return item.RegionId === regionCode;
  //   });
  // }

  // filterZone(zoneCode: string) {
  //   if (!zoneCode) {
  //     return;
  //   }
  //   this.filteredKebeles = null;
  //   this.filteredWoredas = null;

  //   this.filteredWoredas = this.woredas.filter((item) => {
  //     return item.ZoneId === zoneCode;
  //   });
  // }

  // filterWoreda(woredaCode: string) {
  //   if (!woredaCode) {
  //     return;
  //   }
  //   this.getKebeleByWoredaId(woredaCode);

  //   console.log(woredaCode);

  // }
  filterRegion(regionCode: string) {
    if (!regionCode) {
      return;
    }
    // this.filteredZones = null;
    // this.filteredKebeles = null;
    // this.filteredWoredas = null;
    //  this.investorForm.get('address').patchValue({
    //   ZoneId: '--',
    //   WoredaId: '--',
    //   KebeleId: '--'
    // });
    if (!this.zones) {
      return;
    }

    this.filteredZones = this.zones.filter((item) => {
      return item.RegionId === regionCode;
    });
    // this.investorForm.controls['cZone'].patchValue("0");
  }

  filterZone(zoneCode: string) {
    if (!zoneCode) {
      return;
    }
    // this.filteredKebeles = null;
    // this.filteredWoredas = null;

    this.filteredWoredas = this.woredas.filter((item) => {
      return item.ZoneId === zoneCode;
    });
  }

  filterWoreda(woredaCode: string) {
    if (!woredaCode) {
      return;
    }
    // this.filteredKebeles = null;
    this.filteredKebeles = this.kebeles.filter((item) => {
      return item.WoredaId === woredaCode;
    });
    // this.getKebeleByWoredaId(woredaCode);
  }
  getInvestorTitle(id: any) {
    this.lookUpService.getLookupByParentId(id).subscribe(result => {
      console.log(result);
      this.TitleLookup = result;
    });

  }

  getCountryTitle(id: any) {
    this.lookUpService.getLookupByParentId(id)
      .subscribe(result => {
        console.log(result);
        this.countryListWithOutEthipia = result.filter((item) =>
          item.English !== 'ETHIOPIA'
        );

      });

  }

  statusChanged(legalS: number) {
    if (legalS > 1) {
      this.isCompany = true;
      this.initStaticDataOwnerShip(this.currentLang);
    } else {
      this.isCompany = false;
      this.formOfOwnershipList.splice(4, 1);
      console.log(this.formOfOwnershipList);
    }
  }

  onBack() {
    window.history.back();
  }

  get firstName() {
    return this.investorForm.get('cFirstName');
  }

  get fatherName() {
    return this.investorForm.get('cFatherName');
  }

  get Title() {
    return this.investorForm.get('Title');
  }

  get grandName() {
    return this.investorForm.get('cGrandName');
  }

  get firstNameEng() {
    return this.investorForm.get('cFirstNameEng');
  }

  get fatherNameEng() {
    return this.investorForm.get('cFatherNameEng');
  }

  get grandNameEng() {
    return this.investorForm.get('cGrandNameEng');
  }

  get nationality() {
    return this.investorForm.get('cNationality');
  }

  get gender() {
    return this.investorForm.get('cGender');
  }

  // get isDiaspora() {
  //   return this.investorForm.get('cIsDiaspora');
  // }

  get isEthiopianOrigin() {
    return this.investorForm.get('cIsEthiopianOrigin');
  }

  get region() {
    return this.investorForm.get('RegionId');
  }

  get zone() {
    return this.investorForm.get('ZoneId');
  }

  get woreda() {
    return this.investorForm.get('WoredaId');
  }

  get kebele() {
    return this.investorForm.get('KebeleId');
  }

  get houseNumber() {
    return this.investorForm.get('HouseNo');
  }

  get phoneDirect() {
    return this.investorForm.get('PhoneDirect');
  }

  get CellPhoneNo() {
    return this.investorForm.get('CellPhoneNo');
  }

  get fax() {
    return this.investorForm.get('Fax');
  }

  get pobox() {
    return this.investorForm.get('POBox');
  }

  get legalStatus() {
    return this.investorForm.get('cLegalStatus');
  }

  get FormOfOwnershipV() {
    return this.investorForm.get('FormOfOwnership');
  }

  get tradeName() {
    return this.investorForm.get('cTradeName');
  }

  get tradeNameEng() {
    return this.investorForm.get('cTradeNameEng');
  }

  get regDate() {
    return this.investorForm.get('cRegDate');
  }

  get regNumber() {
    return this.investorForm.get('cRegNumber');
  }

  get tin() {
    return this.investorForm.get('cTin');
  }

  get otherAddress() {
    return this.investorForm.get('OtherAddress');
  }

  get companyName() {
    return this.investorForm.get('cCompanyName');
  }

  get companyNameEng() {
    return this.investorForm.get('cCompanyNameEng');
  }

  get nationalityCompany() {
    return this.investorForm.get('cNationalityCompany');
  }

  get email() {
    return this.investorForm.get('Email');
  }

  get houseNo() {
    return this.investorForm.get('HouseNo');
  }

  // another getter for easy access to form fields
  get ct() {
    return this.investorForm.controls;
  }

  // use it as 'ct.controlName.errors.required'

  get floatLabels(): string {
    return 'auto';
  }

  ngAfterViewInit(): void {
    this.fillAddressLookups();
  }

  checkCountry(id: any) {
    if (id === 19) {
      this.originFlag = false;
    }
  }

  onFormOfOwnershipChanged(id: any) {
    this.branch = (id === '5');

  }

}

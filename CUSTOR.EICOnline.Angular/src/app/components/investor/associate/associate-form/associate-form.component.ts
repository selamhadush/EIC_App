import {AfterContentChecked, AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {AddressModel} from '../../../../model/address/Address.model';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ALPHABET_WITHSPACE_REGEX, ET_ALPHABET_WITHSPACE_REGEX, GENDERS, LEGAL_STATUS} from '../../../../const/consts';
import {KebeleModel} from '../../../../model/address/Kebele.model';
import {Permission} from '../../../../model/security/permission.model';
import {RegionModel} from '../../../../model/address/Region.model';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ConfigurationService} from '@custor/services/configuration.service';
import {Subscription} from 'rxjs';
import {ZoneModel} from '../../../../model/address/Zone.model';
import {Gender, LegalStatus, Lookup} from '../../../../model/lookupData';
import {LookUpService} from '../../../../Services/look-up.service';
import {AddressService} from '../../../../Services/Address/address.service';
import {WoredaModel} from '../../../../model/address/Woreda.model';
import {AuthService} from '@custor/services/security/auth.service';
import {Utilities} from '@custor/helpers/utilities';
import {AccountService} from '@custor/services/security/account.service';
import {DataSharingService} from '../../../../Services/data-sharing.service';
import {AssociateModel} from '../../../../model/associate.model';
import {AssociateDTO} from '../../../../model/associate.model';
import {AssociateService} from '../../../../Services/associate.service';
import {InvestorService} from '../../investor.service';
import {LookupsModel} from '../../../../model/lookups';
import {determineId} from '@custor/helpers/compare';
import {NationalityModel} from '../../../../model/address/NationalityModel';
import { AppConfiguration } from 'app/config/appconfig';

@Component({
  selector: 'app-associate-form',
  templateUrl: './associate-form.component.html',
  styleUrls: ['./associate-form.component.scss']
})
export class AssociateFormComponent implements OnInit, AfterViewInit, OnDestroy, AfterContentChecked {

  @ViewChild('form')

  investorSub: Subscription;
  private form: NgForm;
  title: string;
  isNewInvestor = false;
  associate: AssociateModel;

  lookups: Lookup[] = [];
  regions: RegionModel[] = [];
  zones: ZoneModel[] = [];
  filteredZones: ZoneModel[] = [];
  woredas: WoredaModel[] = [];
  filteredWoredas: WoredaModel[] = [];
  kebeles: KebeleModel[] = [];
  filteredKebeles: KebeleModel[] = [];
  // isEditMode = false;
  associateForm: FormGroup;
  loadingIndicator: boolean;
  genders: Gender[] = [];
  legalStatuses: LegalStatus[] = [];
  // isCompany: boolean;
  currentLang = 'en';
  countryLookupType = 1;
  allPermissions: Permission[] = [];
  private addressList: AddressModel;
  private addressId: number | undefined;
  public TitleLookup: LookupsModel[];
  public imageSrc: any;
  public nationList: NationalityModel[];
  public imgPhoto = '';
  public imgBase64 = '';
  public imgInput: string;
  associateId: number;
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              public dataSharing: DataSharingService,
              private lookUpService: LookUpService,
              private addressService: AddressService,
              private http: HttpClient, private accountService: AccountService,
              private authService: AuthService,
              private associateService: AssociateService,
              private custService: InvestorService,
              private configService: ConfigurationService,
              private toastr: ToastrService,  private appConfig: AppConfiguration,
              private fb: FormBuilder) {
    this.checkAuthoriation();
    // create an empty object from the associate model
    this.associate = <AssociateDTO>{};
    // initialize the form
    this.initForm();
    console.log(this.accountService.currentUser.Roles);
  }

  // To-do 1) Validate photo (required) 2) Delete file when a record is deleted 3) Allow clear


  checkAuthoriation() {
    // if (!this.canManageInvestors) {
    //   this.toastr.error('You are not allowed to access this page');
    //   this.router.navigate(['denied']);
    // }
  }

  ngAfterContentChecked(): void {
    this.associateForm.patchValue({
      UserId: this.accountService.currentUser.Id
    });
  }

  ngOnInit() {
    this.currentLang = this.configService.language;
    const id = this.activatedRoute.snapshot.params['id'];
    this.initStaticData(this.currentLang);
    this.imgBase64 = '';
    if (id < 1) {
      this.isNewInvestor = true;
      // this.isCompany = false;
      this.associateId = 0;
      this.title = 'Create a new associate';
      this.imgPhoto = '';

      return;
    }
    if (id) {
      // to-do
      // get the selected investor either through @Input or shared service
      this.getInvestor(id);
      this.associateId = id;
      this.imgPhoto = this.appConfig.urls.baseUrl + 'photo/Mgr' + this.associateId + '.jpg'; // to-do put the path in config
      console.log(this.imgPhoto);
    }
    this.fillAddressLookups();
    console.log('i am here ');

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
    this.loadingIndicator = true;
    this.investorSub = this.associateService
      .getOneById(id)
      .subscribe(result => {
          this.associate = result;
          this.fillAddressLookups();

          this.updateForm();
          // this.getAddressData(this.associate.AssociateId);
        },
        error => this.toastr.error(error));
    this.loadingIndicator = false;
  }

  getAddressData(parent: number) {
    this.addressService.getAddress(parent)
      .subscribe((result: AddressModel) => {
        this.addressList = result;
        // console.log(result)
        this.getKebeleByWoredaId(result.WoredaId);
        this.addressId = result.AddressId;
        this.associateForm.get('address').patchValue(result);
      }, error => this.toastr.error(error));
  }

  getInvestorTitle(id: any) {
    this.lookUpService.getLookupByParentId(id).subscribe(result => {
      console.log(result);
      this.TitleLookup = result;
    });

  }

  fillAddressLookups() {
    // to-do
    // bring all in one go
    // caching
    this.getRegions();
    this.getAllZones();
    this.getAllWoredas();
    this.getInvestorTitle(89);
    this.getAllKebeles();
    // this.getInvestorTitle();
    this.getAllNation();
  }

  private getAllNation() {
    this.addressService.getNationality()
      .subscribe(result => {
        this.nationList = result;
      });
  }

  // getLookups() {
  //   this.custService.getLookupsByLang(this.currentLang)
  //     .subscribe(result => {
  //         this.countries = result;
  //         console.log(result);
  //         // console.log (this.lookups.length + ' countries');
  //         // if (this.lookups) {
  //         //   this.countries = this.lookups.filter((item) => item.LookupTypeId === this.countryLookupType);
  //         //   console.log(this.countries);
  //         //   // filter more lookups
  //         // }
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
            console.log('Region ' + this.associate.RegionId);
            this.filterRegion(this.associate.RegionId);
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
            this.filterZone(this.associate.ZoneId);
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
            this.filterWoreda(this.associate.WoredaId);
          }
        },
        error => this.toastr.error(error));
  }

  initForm() {
    this.associateForm = this.fb.group({

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
      cGender: ['1'],
      Title: [''],
      Origin: [false],
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

    this.associateForm.patchValue({
      cFirstName: this.associate.FirstName || '',
      cFatherName: this.associate.FatherName || '',
      cGrandName: this.associate.GrandName || '',
      cFirstNameEng: this.associate.FirstNameEng || '',
      cFatherNameEng: this.associate.FatherNameEng || '',
      cGrandNameEng: this.associate.GrandNameEng || '',
      cNationality: this.associate.Nationality == null ? '' : this.associate.Nationality.toString(),
      cGender: this.associate.Gender == null ? '' : this.associate.Gender.toString(),
      cTin: this.associate.Tin || '',
      cIsEthiopianOrigin: this.associate.Origin,
      Title: this.associate.Title || '',
    });
    this.isNewInvestor = false;
    this.imgBase64 =  ''; // image file should not be recreated if not file is picked

    this.associateForm.get('address').patchValue({
      RegionId: this.associate.RegionId == null ? '' : this.associate.RegionId.toString(),
      ZoneId: this.associate.ZoneId == null ? '' : this.associate.ZoneId.toString(),
      WoredaId: this.associate.WoredaId == null ? '' : this.associate.WoredaId.toString(),
      KebeleId: this.associate.KebeleId == null ? '' : this.associate.KebeleId.toString(),
      HouseNo: this.associate.HouseNo || '',
      TeleNo: this.associate.TeleNo || '',
      Pobox: this.associate.Pobox || '',
      Fax: this.associate.Fax || '',
      CellPhoneNo: this.associate.CellPhoneNo || '',
      Email: this.associate.Email || '',
      OtherAddress: this.associate.OtherAddress || ''
    });
  }


  public onSubmit() {
    if (!this.associateForm.valid) {
      console.log('error!!');
      // return;
    }
    console.log(this.imgBase64);
    // if (this.imgBase64 === '') {
    //   this.toastr.error('Please add photograph of the Manager');
    //   return;
    // }
    this.loadingIndicator = true;
    console.log(this.getEditedInvestor());
    return this.associateService.create(this.getEditedInvestor())
      .subscribe((associate: AssociateDTO) => {
          this.saveCompleted(associate);
          localStorage.setItem('AssociateId', associate.AssociateId.toString());
          this.saveAddress();
        },
        err => this.handleError(err)
      );
  }

  private saveCompleted(associate?: AssociateDTO) {
    if (associate) {
      this.associate = associate;
    }
    this.loadingIndicator = false;
    this.toastr.success('Record saved successfully!');
    this.dataSharing.investorTabSelectedIndex.next(2);

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

  private getEditedInvestor(): AssociateDTO {
    const formModel = this.associateForm.value;
    const add = this.associateForm.get('address').value;
    return {
      AssociateId: this.isNewInvestor ? 0 : this.associate.AssociateId,
      InvestorId: +localStorage.getItem('InvestorId'),
      FirstName: formModel.cFirstName,
      FatherName: formModel.cFatherName,
      GrandName: formModel.cGrandName,
      FirstNameEng: formModel.cFirstNameEng,
      FatherNameEng: formModel.cFatherNameEng,
      GrandNameEng: formModel.cGrandNameEng,
      Nationality: formModel.cNationality,
      Gender: formModel.cGender,
      // Tin: formModel.cTin,
      // RegistrationDate: formModel.cRegDate,
      // RegistrationNumber: formModel.cRegNumber,
      // TradeName: formModel.cTradeName,
      // TradeNameEnglish: formModel.cTradeNameEng,
      // LegalStatus: formModel.cLegalStatus,
      Origin: formModel.cIsEthiopianOrigin,
      // UserId: this.accountService.currentUser.Id,
      IsActive: true,
      IsDeleted: false,
      Title: formModel.Title,
      PhotoData: this.imgBase64,
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
    // this.getLookups();
  }

  saveAddress() {
    this.associateForm.get('address').patchValue({
      ParentId: localStorage.getItem('AssociateId')
    });
    console.log(this.associateForm.get('address').value);
    this.addressService.saveAddress(this.associateForm.get('address').value)
      .subscribe(result => {
        // this.notification('address saved');
        // this.router.navigate(['/associate/list']);
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
  compareIds(id1: any, id2: any): boolean {
    const a1 = determineId(id1);
    const a2 = determineId(id2);
    return a1 === a2;
  }

  onBack() {
    this.router.navigate(['associate/list']);
  }

  get firstName() {
    return this.associateForm.get('cFirstName');
  }

  get fatherName() {
    return this.associateForm.get('cFatherName');
  }

  get Title() {
    return this.associateForm.get('Title');
  }

  get grandName() {
    return this.associateForm.get('cGrandName');
  }

  get firstNameEng() {
    return this.associateForm.get('cFirstNameEng');
  }

  get fatherNameEng() {
    return this.associateForm.get('cFatherNameEng');
  }

  get grandNameEng() {
    return this.associateForm.get('cGrandNameEng');
  }

  get nationality() {
    return this.associateForm.get('cNationality');
  }

  get gender() {
    return this.associateForm.get('cGender');
  }

  // get isDiaspora() {
  //   return this.associateForm.get('cIsDiaspora');
  // }

  get Origin() {
    return this.associateForm.get('cIsEthiopianOrigin');
  }

  get region() {
    return this.associateForm.get('RegionId');
  }

  get zone() {
    return this.associateForm.get('ZoneId');
  }

  get woreda() {
    return this.associateForm.get('WoredaId');
  }

  get kebele() {
    return this.associateForm.get('KebeleId');
  }

  get houseNumber() {
    return this.associateForm.get('HouseNo');
  }

  get phoneDirect() {
    return this.associateForm.get('PhoneDirect');
  }

  get CellPhoneNo() {
    return this.associateForm.get('CellPhoneNo');
  }

  get fax() {
    return this.associateForm.get('Fax');
  }

  get pobox() {
    return this.associateForm.get('POBox');
  }

  get legalStatus() {
    return this.associateForm.get('cLegalStatus');
  }

  get tradeName() {
    return this.associateForm.get('cTradeName');
  }

  get tradeNameEng() {
    return this.associateForm.get('cTradeNameEng');
  }

  get regDate() {
    return this.associateForm.get('cRegDate');
  }

  get regNumber() {
    return this.associateForm.get('cRegNumber');
  }

  get tin() {
    return this.associateForm.get('cTin');
  }

  get otherAddress() {
    return this.associateForm.get('OtherAddress');
  }

  get companyName() {
    return this.associateForm.get('cCompanyName');
  }

  get companyNameEng() {
    return this.associateForm.get('cCompanyNameEng');
  }

  get nationalityCompany() {
    return this.associateForm.get('cNationalityCompany');
  }

  get email() {
    return this.associateForm.get('Email');
  }

  get houseNo() {
    return this.associateForm.get('HouseNo');
  }

  // another getter for easy access to form fields
  get ct() {
    return this.associateForm.controls;
  }

  // use it as 'ct.controlName.errors.required'

  get floatLabels(): string {
    return 'auto';
  }

// Photo Management
  ngAfterViewInit(): void {
    this.fillAddressLookups();
  }
  fileChange(input) {
      const pattern = /image-*/;
      if (!input.files[0].type.match(pattern)) {
          this.toastr.error('The selected file is not valid image file');
      return;
    }
    const reader = new FileReader();
    this.readFile(input.files[0], reader, (result) => {
      // Create an img element and add the image file data to it
      const img = document.createElement('img');
      img.src = result;
      this.resizeImage(img, 150, 150, (resizedImage) => {
          this.imgPhoto = resizedImage;
      });
  });
}

readFile(file, reader, callback) {
    reader.onload = () => {
        callback(reader.result);
    };
    reader.readAsDataURL(file);
}

resizeImage(img, maxWidth: number, maxHeight: number, callback) {
  return img.onload = () => {
      let width = img.width;
      let height = img.height;
      // Maintain aspect ratio
      if (width > height) {
          if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
          }
      } else {
          if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
          }
      }
      // create a canvas object
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      // console.log(dataUrl);
      this.imgBase64 = dataUrl.split(',')[1];
      callback(dataUrl, img.src.length, dataUrl.length);
  };
}
// =====================

}


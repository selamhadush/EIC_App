import {AfterContentChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {KebeleModel} from '../../../model/address/Kebele.model';
import {AddressService} from '../../../Services/Address/address.service';
import {ErrorMessage} from '@custor/services/errMessageService';
import {ZoneModel} from '../../../model/address/Zone.model';
import {AddressModel} from '../../../model/address/Address.model';
import {RegionModel} from '../../../model/address/Region.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {WoredaModel} from '../../../model/address/Woreda.model';
import {AccountService} from '@custor/services/security/account.service';
import {FormService} from '@custor/validation/custom/form';
import {TownModel} from '../../../model/address/Town.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserActivityDataServices} from '../../../admin/user-detail/user-detail.service';
import {ToastrService} from 'ngx-toastr';
import {DataSharingService} from '../../../Services/data-sharing.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit, OnDestroy, AfterContentChecked {

  regions: RegionModel[] = [];
  zones: ZoneModel[] = [];
  filteredZones: ZoneModel[] = [];
  towns: TownModel[] = [];
  filteredTowns: TownModel[] = [];
  woredas: WoredaModel[] = [];
  filteredWoredas: WoredaModel[] = [];
  kebeles: KebeleModel[] = [];
  filteredKebeles: KebeleModel[] = [];

  public formErrors = {
    Region: '',
    Zone: '',
    Woreda: '',
    Kebele: '',
    SpecificAreaName: '',
    Remark: '',
    EnvironmentalImpact: ''

  };


  public addressForm: FormGroup;
  public loading: boolean;
  public editMode = false;
  private addressList: AddressModel;
  private projectId: number;
  private addressId: number | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public activityDataServices: UserActivityDataServices,
              public accountServices: AccountService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private addressService: AddressService,
              private errMsg: ErrorMessage,
              public formService: FormService,
              public snackbar: MatSnackBar,
              private dataSharing: DataSharingService) {

  }


  ngOnInit() {
    this.fillAddressLookups();
    this.formBuild();
    this.route.params
      .subscribe((params: Params) => {
        this.projectId = +params['id'];
        // this.projectId = this.route.snapshot.params['id'];
        if (this.projectId > 1) {
          console.log(this.projectId);
          this.getAddressData(this.projectId);
          this.editMode = true;
        }
      });
  }


  getAddressData(parent: number) {
    this.addressService.getAddress(parent)
      .subscribe((result: AddressModel) => {
        this.addressList = result;
        // console.log(result)
        this.getKebeleByWoredaId(result.WoredaId);
        this.addressId = result.AddressId;
        this.addressForm.patchValue(result);
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

    // this.getAllSite();
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

  filterTown(regionCode: string) {
    if (!regionCode) {
      return;
    }
    this.filteredTowns = null;
    this.filteredTowns = this.towns.filter((item) => {
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


  // onClear() {
  //   this.addressForm.reset();
  // }

  onSubmit() {
    this.addressForm.patchValue({
      ParentId: localStorage.getItem('ProjectId')
    });
    if (this.editMode && typeof (this.addressId) !== 'undefined') {
      this.addressService.updateAddress(this.addressForm.value, this.addressId)
        .subscribe(result => {
          this.notification('address updated');
          // this.onClear();
        });
    } else {
      this.addressService.saveAddress(this.addressForm.value)
        .subscribe(result => {
          setTimeout(() => this.dataSharing.projectId.next(this.projectId), 0);
          this.notification('address saved');
          // this.onClear();

        });
    }
  }

  formBuild() {
    this.addressForm = this.formBuilder.group({
      ParentId: '',
      RegionId: '',
      ZoneId: '',
      WoredaId: '',
      KebeleId: '',
      SpecificAreaName: '',
      Remark: ''
    });

    this.addressForm.valueChanges.subscribe((data) => {
      this.formErrors = this.formService.validateForm(this.addressForm, this.formErrors, true);
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


  }
}

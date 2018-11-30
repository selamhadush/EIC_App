import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {BlRegistrationService} from '../../../Services/bl-reg/bl-registration.service';
import {MajorDivisionModel} from '../../../model/BL/MajorDivisionModel';
import {DivisionModel} from '../../../model/BL/DivisionModel';

@Component({
  selector: 'app-bl-registration',
  templateUrl: './bl-registration.component.html',
  styleUrls: ['./bl-registration.component.scss']
})
export class BlRegistrationComponent implements OnInit {
  cFrm: FormGroup;
  MajorDivisions: MajorDivisionModel[] = [];
  filterMajorDivisions: MajorDivisionModel[] = [];
  Divisions: DivisionModel[] = [];
  filterDivisions: DivisionModel[] = [];
  // lookupSub: Subscription;
  // Lookup: LookupModel[];
  loadingState: boolean;
  constructor(private _BlService: BlRegistrationService, public fb: FormBuilder) { }
  // private lookupservice: LookUpService) { }

  ngOnInit() {
    this.cFrm = this.fb.group({
      //  id: [''],
      organization_name: ['', [Validators.required, Validators.maxLength(50)]],
      Mowner_name: ['', [Validators.required]],
      owner_namebl: ['', [Validators.required]],
      Dateofissue: ['', [Validators.required]],
      licensenumber: ['', [Validators.required]],
      status: ['', [Validators.required]],
      capital: ['', [Validators.required]],
      MajorDivision: ['', [Validators.required]],
      Division: ['', [Validators.required]],
      MajorGroup: ['', [Validators.required]],
      Group: [''],
      SubGroup: ['']
    });

    this._BlService.getMajorDivision().subscribe(result => {
      this.MajorDivisions = result;
      }
    );
    // this.contactFrm.valueChanges.subscribe(data => this.onValueChanged(data));
    // this.onValueChanged();
    // const form = this.contactFrm;
    // this.getItemLookupByParent();
  }
  filterMajorDivision(id: number)
  {
    if (!id) {
      return;
    }
    this.filterMajorDivision = this.MajorDivisions.filter((item) => {return item.Parent === id;
      }
    );
  }
  filterDivision(id: number)
  {
    if (!id) {
      return;
    }
    this.filterDivisions = this.Divisions.filter((item) => {return item.Parent === id;
      }
    );
  }
  // AddSec() {
  //   // const ctData = this.cFrm.value;
  //   this._sectorService.addSector(this.cFrm.value).subscribe(data => {
  //       // Success
  //       if (data.message) {
  //         console.log('success');
  //       } else {
  //         console.log('error');
  //       }
  //     },
  //     error => {
  //       console.log('error');
  //     }
  //   );
  // }
  // onSelect(licno)  {
  //   if (eventObject.target.checked) {
  //     // your logic here.
  //     return (control: licensenumber): {[key: string]: any} => {
  //       this._sectorService.checklicensenumber(control)
  //         .subscribe(
  //           ({data}) => {
  //             const res: string = data;
  //             if (res === control.value) {
  //               return {'alreadyExist': true};
  //             } else {
  //               return null;
  //             }
  //           },
  //           (error) => {
  //             console.log(error);
  //           }
  //         );
  //     }
  //     console.log('checked', licno.target.checked);
  //    }
  // }
  // getItemLookup(id: number)
  // getItemLookup() {
  //   this.loadingState = true;
  //   this.lookupSub = this.lookupservice.getLookupById(1)
  //     .subscribe(result => {
  //         this.Lookup = result;
  //       },
  //       error => {
  //         console.log('error');
  //       });
  // }


  // getItemLookupByParent() {
  //   this.loadingState = true;
  //   this.lookupSub = this.lookupservice.getLookupByParentId(1)
  //     .subscribe(result => {
  //         this.Lookup = result;
  //       },
  //       error => {
  //         console.log('error');
  //       });
  // }
  // error => this.toastr.error(this.errMsg.getError(error)));
}




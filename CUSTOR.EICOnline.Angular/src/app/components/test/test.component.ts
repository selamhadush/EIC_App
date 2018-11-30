import { Component, OnInit } from '@angular/core';
import { TestService } from './test.service';
import { TestModel } from './Test.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})

export class TestComponent implements OnInit {
  testList: TestModel[];
  testGroup: FormGroup;

  constructor(
    public testService: TestService,
    public fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.getAllTest();
    this.initForm();
  }

  serch() {
    this.getAllTestById(this.testGroup.get('Id').value);
  }

  public getAllTest() {
    this.testService.getTest()
      .subscribe(result => {
        this.testList = result;
        console.log(result);
      });
  }

  public getAllTestById(id: number) {
    this.testService.getTestById(id)
      .subscribe(result => {
        // this.testList = result;
        console.log(result);
      });
  }

  initForm() {
    this.testGroup = this.fb.group({
      Id: '',
      Name: '',
      Age: '',
    });
  }

  submit() {
    this.testService.create(this.testGroup.value)
      .subscribe(result => {
        console.log(result);
        this.getAllTest();
      });
  }
}
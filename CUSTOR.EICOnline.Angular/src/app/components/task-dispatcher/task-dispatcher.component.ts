import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {AccountService} from '@custor/services/security/account.service';
import {User} from '../../model/security/user.model';
import {MatDialogRef, MatTableDataSource} from '@angular/material';
import {TodoTaskService} from '../../Services/todo-task.service';
import {TodoTaskModel} from '../../model/TodoTask.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DataSharingService} from '../../Services/data-sharing.service';

@Component({
  selector: 'app-task-dispatcher',
  templateUrl: './task-dispatcher.component.html',
  styleUrls: ['./task-dispatcher.component.scss']
})
export class TaskDispatcherComponent implements OnInit, AfterContentChecked {
  userList: User[];
  show = false;
  public dataSource: MatTableDataSource<TodoTaskModel>;
  public loading = true;

  public todoList: TodoTaskModel[];
  todoTaskForm: FormGroup;
  assignedUserId: any;
  public completedTask: number | 0;
  public pendingTask: number | 0;

  constructor(public accountService: AccountService,
              private    dialogRef: MatDialogRef<TaskDispatcherComponent>,
              public fb: FormBuilder,
              public dataSharingService: DataSharingService,
              public todoTask: TodoTaskService) {
  }

  ngOnInit() {
    this.getAllOfficer();
    this.initForm();
  }

  initForm() {
    this.todoTaskForm = this.fb.group({
      ServiceApplicationId: '',
      AssignedUserId: '',
      CreatedUserId: '',
      CreatedUserName: '',
    });
  }

  getAllOfficer() {
    this.accountService.getUsers().subscribe(result => {
      console.log(result);
      this.userList = result;
    });
  }

  getUserDetail(userId: any, userName?: any) {
    console.log(userId);
    this.assignedUserId = userId;
    this.getCompleted(userId);
    this.getPending(userId);
    this.todoTask.getAllById(userId).subscribe(result => {

      this.todoList = result;
      this.loading = false;

    });

  }

  getCompleted(userId: any) {

    this.todoTask.countCompletedTask(userId).subscribe(result => {
      this.completedTask = result;

    });

  }

  getPending(userId: any) {

    this.todoTask.countPendingTask(userId).subscribe(result => {
      this.pendingTask = result;

    });

  }

  assignTask() {
    console.log(this.todoTaskForm.value);
    this.todoTask.create(this.todoTaskForm.value)
      .subscribe(result => {
        console.log(result);
        this.dataSharingService.assignTask.next(true);
        setTimeout(() => {
          this.dataSharingService.assignTask.next(false);
        }, 200);
        this.dialogRef.close();

      });
  }

  ngAfterContentChecked(): void {
    this.todoTaskForm.patchValue({
      ServiceApplicationId: localStorage.getItem('ServiceApplicationId'),
      AssignedUserId: this.assignedUserId,
      CreatedUserId: this.accountService.currentUser.Id,
      CreatedUserName: this.accountService.currentUser.UserName,
    });
  }


}

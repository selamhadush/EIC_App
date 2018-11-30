import {Injectable, OnInit} from '@angular/core';

@Injectable()
export class CustomerService {
    ServiceId = 0;
    Name: string = null;
    NameEnglish: string = null;
    IsActive = true;
}
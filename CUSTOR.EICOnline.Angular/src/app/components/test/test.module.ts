import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@custor/modules/shared.module';
import {TestComponent} from './test.component';
import {TestRoutingModule} from './test-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TestRoutingModule
  ],
  declarations: [TestComponent],
  exports: [TestComponent]
})
export class TestModule {
}
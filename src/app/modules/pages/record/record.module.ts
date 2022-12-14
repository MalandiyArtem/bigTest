import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared-module/shared-module.module';
import { RecordComponent } from './components/record/record.component';

@NgModule({
  declarations: [
    RecordComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
  ],
  bootstrap: [RecordComponent],
})
export class RecordModule { }

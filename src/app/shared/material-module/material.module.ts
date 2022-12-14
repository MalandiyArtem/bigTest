import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';

const material = [
  MatButtonModule,
  MatGridListModule,
  MatIconModule,
  MatSliderModule,
];

@NgModule({
  imports: [material],
  exports: [material],
})
export class MaterialModule {}

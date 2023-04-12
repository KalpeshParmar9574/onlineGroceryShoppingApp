import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { ApploaderComponent } from './apploader/apploader.component';



@NgModule({
  declarations: [
    BannerComponent,
    ApploaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BannerComponent,
    ApploaderComponent
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPicPageRoutingModule } from './edit-pic-routing.module';

import { EditPicPage } from './edit-pic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPicPageRoutingModule
  ],
  declarations: [EditPicPage]
})
export class EditPicPageModule {}

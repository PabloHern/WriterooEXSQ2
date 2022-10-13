import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPicPage } from './edit-pic.page';

const routes: Routes = [
  {
    path: '',
    component: EditPicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPicPageRoutingModule {}

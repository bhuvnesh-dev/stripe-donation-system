import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonationPage } from './donation.page';

const routes: Routes = [
  {
    path: '',
    component: DonationPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonationPageRoutingModule {}

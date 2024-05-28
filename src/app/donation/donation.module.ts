import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DonationPage } from './donation.page';

import { DonationPageRoutingModule } from './donation-routing.module';
import { Stripe } from '@ionic-native/stripe/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonationPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DonationPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [Stripe]
})
export class DonationPageModule {}

import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonInput, ToastController } from '@ionic/angular';
import { Stripe } from '@ionic-native/stripe/ngx';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-donation',
  templateUrl: 'donation.page.html',
  styleUrls: ['donation.page.scss'],
})
export class DonationPage {
  donationCardForm = new FormGroup({
    name: new FormControl('',[ Validators.required, Validators.minLength(2)]),
    email: new FormControl('',[ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'), Validators.email]),
    amount: new FormControl('',[Validators.required, Validators.pattern('^[0-9]+$')]),
    number: new FormControl('',[Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10)]),
    card_expiry: new FormControl('',[Validators.required]),
    cvc: new FormControl('',[Validators.required, Validators.minLength(3),Validators.pattern('^[0-9]+$')])});
  publish_key: string = '';
  paymentModal: boolean = false;
  toastIsOpen: boolean = true;
  spinner: boolean = false;
  message: any = '';
  color: any = '';
  amount: number = 0;
  showPopup: any = false;
  showLoginPopup: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private stripe: Stripe,
    private toast: ToastController,
    private storage: Storage,
    private router: Router,
  ) {
    storage.create()
  }
  gotoHistory() {
    this.router.navigate(['./donation-history'])
  }
  amounts: any = [5,10]
  ngOnInit() {}

  openLink(){
    window.open('https://shorturl.at/fgsPQ')
  }
  async submitDonation() {
    this.spinner = true;
    this.toastIsOpen = false;
    if (this.donationCardForm.invalid) {
      this.message = "Please fill the correct card details"
      this.color = "danger"
      setTimeout(() => {
        this.toastIsOpen = true;
        this.spinner = false
      }, 1000)
    } else {
      const formData = {
        user_id: 123,
        name: this.donationCardForm.value.name,
        amount: this.donationCardForm.value.amount,
        number: this.donationCardForm.value.number,
        exp_month: this.donationCardForm.value.card_expiry?.slice(5, 7),
        exp_year: this.donationCardForm.value.card_expiry?.slice(0, 4),
        cvc: this.donationCardForm.value.cvc,
        email: this.donationCardForm.value.email,
        description: "Donation Payment.",
        created_at: new Date()
      }
      const donationData = await this.storage.get("donation");
      if(!donationData){
        await this.storage.set("donation",[formData])
      }
      else {
        await this.storage.set("donation",[...donationData,formData])
      }
      
      setTimeout(() => {
        this.spinner = false;
        this.showPopup = true;
        this.paymentModal = false;
        this.donationCardForm.reset()
      }, 2000)
    }
  }
  closeModal() {
    this.paymentModal = false;
  }
  closePopup() {
    this.showPopup = false
  }
  handleDonation(value: any) {
    this.donationCardForm.value.amount = value;
    this.donationCardForm.get('amount')?.setValue(value)
    this.paymentModal = true
  }
  handleRefresh(event:any) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete()
    }, 2000)
  }
  closeLoginPopup() {
    this.showLoginPopup = false
  }

}

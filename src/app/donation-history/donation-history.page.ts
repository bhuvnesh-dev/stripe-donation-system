import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-donation-history',
  templateUrl: './donation-history.page.html',
  styleUrls: ['./donation-history.page.scss'],
})
export class DonationHistoryPage implements OnInit {

  history:any=[]
  constructor(private storage: Storage,private navCtrl: NavController) {}

  ngOnInit() {
    this.storage.get('donation').then(res=>{
      if(res){
        this.history = res;
      }
    })
  }
  goBack(){
    this.navCtrl.back()
  }
}

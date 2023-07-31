import { Component, NgModule, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.scss'],
})
export class NotificationModalComponent  implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {   
  }
  dismissModal() {
    this.modalController.dismiss();
  }
}

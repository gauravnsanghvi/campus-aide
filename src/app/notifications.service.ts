import { Injectable } from '@angular/core';
import { initializeApp, setLogLevel } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { environment } from "src/environments/environment";
import { ModalController } from '@ionic/angular';
import { NotificationModalComponent } from './notification-modal/notification-modal.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
 public isNotificationPermissionGranted: boolean = false;

  constructor(private modalController: ModalController) {}

  init() {
    const app = initializeApp(environment.firebase);
    setLogLevel('debug');

    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        this.isNotificationPermissionGranted= true;
        console.log('Notification permission granted.');
        const messaging = getMessaging(app);
        getToken(messaging, { vapidKey: 'BHKah1MqJZxqi38c1ikUfIPue_nWiX6_DAMkamEI9i-hrEl7oHT6gRvpW6ojsZx7Jp9enqVsz7L0VoBVkTv2-H4' }).then((currentToken) => {
          if (currentToken) {
            console.log(currentToken) 
            onMessage(messaging, (payload) => {
            });
            } else {
            console.log('No registration token available. Request permission to generate one.');
          }
        }).catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
        });
      } else {
        console.log('Unable to get permission to notify.');
        this.isNotificationPermissionGranted=false;
        this.showNotificationSettingsModal();
      }
    });
  }
  async showNotificationSettingsModal() {
    const modal = await this.modalController.create({
      component: NotificationModalComponent
    });
    return await modal.present();
  }

}



import { Component } from '@angular/core';
import { NotificationsService } from "src/app/notifications.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private noti: NotificationsService
  ) {
    
    noti.init()
  }
}


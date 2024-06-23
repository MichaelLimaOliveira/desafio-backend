import { Injectable } from '@nestjs/common';

import { Users } from 'src/Users/entities/Users.entity';
import NotificationDTO from '../dtos/Notification.dto';

@Injectable()
class NotificationService {
  public async sendNotification(user: Users, message: string) {
    //mock para um sistema de notificação push email etc ...
    const notificationRequest = new NotificationDTO();
    notificationRequest.email = user.email;
    notificationRequest.message = message;

    console.log(
      `Notificação enviada para ${notificationRequest.email} com a mensagem: ${notificationRequest.message}`,
    );
  }
}

export default NotificationService;

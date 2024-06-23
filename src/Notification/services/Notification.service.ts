import { Injectable } from '@nestjs/common';

import { Users } from 'src/Users/entities/Users.entity';
import NotificationDTO from '../dtos/Notification.dto';

@Injectable()
class NotificationService {
  public async sendNotification(user: Users, message: string) {
    const notificationRequest = new NotificationDTO();
    notificationRequest.email = user.email;
    notificationRequest.message = message;

    // const url = 'https://util.devi.tools/api/v1/notify';
    // try {
    //   const response = await fetch(url, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(notificationRequest),
    //   });

    //   if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }

    //   const data = await response.json();
    //   return data;
    // } catch (error) {
    //   console.error('Error sending notification:', error);
    //   throw error;
    // }

    console.log(
      `Notificação enviada para ${notificationRequest.email} com a mensagem: ${notificationRequest.message}`,
    );
  }
}

export default NotificationService;

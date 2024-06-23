import { Module } from '@nestjs/common';
import NotificationService from './services/Notification.service';

@Module({
  imports: [],
  controllers: [],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}

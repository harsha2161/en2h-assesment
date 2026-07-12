import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServiceModule } from './api/service/service.module';
import { DatabaseModule } from './db/database.module';
import { UserModule } from './api/user/user.module';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './api/booking/booking.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ServiceModule,
    UserModule,
    AuthModule,
    BookingModule,
  ],
})
export class AppModule {}

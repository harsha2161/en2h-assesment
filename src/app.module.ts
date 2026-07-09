import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGloble : true,
    })
  ],
 
})
export class AppModule {}

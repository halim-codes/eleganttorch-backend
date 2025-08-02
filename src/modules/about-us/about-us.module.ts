import { Module } from '@nestjs/common';
import { AboutUsService } from './about-us.service';
import { AboutUsController } from './about-us.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AboutUs, AboutUsSchema } from './entities/about-us.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AboutUs.name, schema: AboutUsSchema }]),
  ],
  controllers: [AboutUsController],
  providers: [AboutUsService],
  exports: [AboutUsService, MongooseModule],
})
export class AboutUsModule {}

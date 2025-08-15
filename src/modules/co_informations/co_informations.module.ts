import { Module } from '@nestjs/common';
import { CoInformationsService } from './co_informations.service';
import { CoInformationsController } from './co_informations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CoInformation, CoInformationSchema } from './entities/co_information.entity';


@Module({
   imports: [
        MongooseModule.forFeature([
          { name: CoInformation.name, schema: CoInformationSchema },
        ]),
      ],

  controllers: [CoInformationsController],
  providers: [CoInformationsService],
  exports: [CoInformationsService, MongooseModule],
})
export class CoInformationsModule {}

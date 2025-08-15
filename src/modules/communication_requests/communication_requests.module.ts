import { Module } from '@nestjs/common';
import { CommunicationRequestsService } from './communication_requests.service';
import { CommunicationRequestsController } from './communication_requests.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommunicationRequest, CommunicationRequestSchema } from './entities/communication_request.entity';


@Module({
  imports: [
        MongooseModule.forFeature([
          { name: CommunicationRequest.name, schema: CommunicationRequestSchema },
        ]),
      ],

  controllers: [CommunicationRequestsController],
  providers: [CommunicationRequestsService],
  exports: [CommunicationRequestsService, MongooseModule],
})
export class CommunicationRequestsModule {}

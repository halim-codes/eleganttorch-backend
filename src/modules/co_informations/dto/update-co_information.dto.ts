import { PartialType } from '@nestjs/mapped-types';
import { CreateCoInformationDto } from './create-co_information.dto';

export class UpdateCoInformationDto extends PartialType(CreateCoInformationDto) {}

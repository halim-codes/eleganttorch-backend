import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAboutUsDto {
  @IsString()
  @IsNotEmpty()
  vision: string;

  @IsString()
  @IsNotEmpty()
  mission: string;
}

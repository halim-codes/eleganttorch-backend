import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAboutUsDto {
  @IsString()
  @IsNotEmpty()
  about_us: string;

  @IsString()
  @IsNotEmpty()
  vision: string;

  @IsString()
  @IsNotEmpty()
  mission: string;
}

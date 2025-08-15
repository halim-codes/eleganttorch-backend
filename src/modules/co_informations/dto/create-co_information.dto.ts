import { IsString, IsOptional } from 'class-validator';

export class CreateCoInformationDto {
    @IsString()
    @IsOptional()
    phone: string;

    @IsString()
    @IsOptional()
    address: string;

    @IsString()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    tikTok: string;

    @IsString()
    @IsOptional()
    instagram: string;

    @IsString()
    @IsOptional()
    facebook: string;

    @IsString()
    @IsOptional()
    youtube: string;

    @IsString()
    @IsOptional()
    twitter: string;
}

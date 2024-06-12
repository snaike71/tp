import { IsNumber, IsString, Max, Min, IsLatitude, IsLongitude } from 'class-validator';

export class CreateReportDto {
  @IsNumber()
  price: number;

  @IsString()
  model: string;

  @IsNumber()
  @Min(2000)
  @Max(2023)
  year: number;

  @IsNumber()
  @Min(0)
  @Max(500000)
  mileage: number;

  @IsNumber()
  @IsLongitude()
  lng: number;

  @IsNumber()
  @IsLatitude()
  lat: number;
}

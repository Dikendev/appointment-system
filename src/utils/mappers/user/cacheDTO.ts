import { IsNotEmpty, IsString } from 'class-validator';

export class CacheDTO {
  @IsString()
  @IsNotEmpty()
  public key: string;

  @IsString()
  public value: string;
}

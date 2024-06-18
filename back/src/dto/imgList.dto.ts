import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class ImgDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
      example: "string"
    })
    imgUrl: string
    
  }
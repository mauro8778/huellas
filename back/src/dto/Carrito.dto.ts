import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";



export class CarritoPendienteDto {

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    @ApiProperty({
        description: 'Se requiere que el shelterId no esté vacío y cumpla con el formato UUID.',
        example: "UIID"
      })
    shelter_id: string

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
      description: "Se requiere que el price no esté vacío",
      example: 'number'
    })
    price: number

} 
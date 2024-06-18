import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"



export class PomotionDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: "Titulo de Promocion"
      })
      title: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
      example: 'Descripcion de la promocion'
    })
    description: string

} 
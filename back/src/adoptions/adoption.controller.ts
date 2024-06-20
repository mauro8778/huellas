import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Req, UseGuards } from '@nestjs/common';
import { AdoptionService } from './adoption.service';
import { CreateAdopcionDto } from 'src/dto/createAdopcion.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { Role } from 'src/users/user.enum';
import { Roles } from 'src/decorators/role.decorator';
import { RoleGuard } from 'src/guards/role.guard';

@ApiTags("Adoption")
@Controller('adoption')
export class AdoptionController {
    constructor(private readonly adopcionservice : AdoptionService){}
    
    @Roles(Role.Shelter, Role.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    @Get()
    async AllAdoptions(){
        return await this.adopcionservice.AllAdoptions()
    }

    @Get(':id')
    async adoptionsById(@Req() request){
        const userId = request.user['https://huellasdesperanza.com/userID'];
        return await this.adopcionservice.adoptionsById(userId)
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post('new/:id')
    async newAdoption(@Param('id') petid: string, @Req() request) {
    const userId = request.user['https://huellasdesperanza.com/userID'];
    return await this.adopcionservice.newAdoption(userId, petid);
}
    @Get('shelter/:id')
    async shelterpost(@Param('id', ParseUUIDPipe) id: string){

        return await this.adopcionservice.adoptionShelter(id)
    }

    @Post('activate/:id')
    async activateAdoption(@Param('id',ParseUUIDPipe) adoptionId: string){
    return await this.adopcionservice.activateAdoption(adoptionId)
}


    @Delete('delete/:id')
    async Deleteadoption(@Param('id', ParseUUIDPipe) id: string){
        return await this.adopcionservice.Delete(id)
    }


    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('user')
    async adoptionUser(@Req() request ){
        const userId = request.user['https://huellasdesperanza.com/userID'];

        return await this.adopcionservice.adoptionUser(userId)
    }


    
}

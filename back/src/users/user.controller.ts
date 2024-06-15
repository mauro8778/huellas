import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from 'src/dto/updateUser.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { Auth0Guard } from 'src/guards/auth0.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from './user.enum';
import { get } from 'http';

@ApiTags("Users")
@Controller('users')
export class UserController {
    constructor(private readonly usersService : UserService){}

    @Roles(Role.Shelter, Role.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    @Get()
    getUsers(){
        return this.usersService.getUsers()
    }

    @Get('favorite')
    getFavorites(){
        return this.usersService.getFavorites()
    }
    
    @Get(':id')
    getUserById(@Param('id', ParseUUIDPipe) id : string){
        return this.usersService.getUserById(id)
    }

    // @ApiBearerAuth()
    // @UseGuards(AuthGuard)
    @Get('orders/:id')
    getOrders(@Param('id', ParseUUIDPipe) id : string) {
       return this.usersService.getOrders(id)
    }

    @Put('profile/:id')
    updatedProfile(
        @Param('id',ParseUUIDPipe) id : string,
        @Body() user : UpdateUserDto){
        return this.usersService.updatedProfile(id, user)
    }

    @Post('delete/:id')
    deleteUser(@Param('id', ParseUUIDPipe) id : string) {
        return this.usersService.deleteUser(id)
    }

    @Post('active/:id')
    activeUsers(@Param('id', ParseUUIDPipe) id : string) {
        return this.usersService.activeUsers(id)
    }


    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post('shelter/favorite/:id')
    addShelterFavorite(@Param('id', ParseUUIDPipe) shelterId: string,@Req() request){

        const userId = request.user['https://huellasdesperanza.com/userID'];

        return this.usersService.addShelterFavorite(shelterId, userId)
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post('pet/favorite/:id')
    addPetFavorite(@Param('id', ParseUUIDPipe) id: string, @Req() request) {

         const userId = request.user['https://huellasdesperanza.com/userID'];

        return this.usersService.addPetFavorite(id, userId)
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Put('pet/favorite/:id')
    PutPetFavorite(@Param('id', ParseUUIDPipe) id: string,  @Req() request){

        const userId = request.user['https://huellasdesperanza.com/userID']

        return this.usersService.PutPetFavorite(id, userId)
    }


    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Put('shelter/favorite/:id')
    PutShelterFavorite(@Param('id', ParseUUIDPipe) id: string, @Req() request){

        const userId = request.user['https://huellasdesperanza.com/userID']

        return this.usersService.PutShelterFavorite(id, userId)
    }

    @UseGuards(Auth0Guard)
    @Put('admin/:id')
    adminUsers(@Req() req, @Param('id',ParseUUIDPipe) id:string){
        const accessToken = req.auth0Token
        return this.usersService.adminUsers(id,accessToken)
    }

    @Get('location/:id')
    getLocation(@Param('id',ParseUUIDPipe)userId:string){
        return this.usersService.getLocation(userId)
    }
}

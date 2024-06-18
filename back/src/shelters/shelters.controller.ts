import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { SheltersService } from './shelters.service';
import { ApiTags } from '@nestjs/swagger';
import { Auth0Guard } from 'src/guards/auth0.guard';
import { UpdateShelterDto } from 'src/dto/updateShelter.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('Shelters')
@Controller('shelters')
export class SheltersController {
  constructor(private readonly sheltersService: SheltersService) {}

  @Get()
  getShelters() {
    return this.sheltersService.getShelters();
  }

  @Get(':id')
  getShelterById(@Param('id', ParseUUIDPipe) id: string) {
    return this.sheltersService.getShelterById(id);
  }
  @Put('profile/:id')
  updatedProfile(
      @Param('id',ParseUUIDPipe) id:string,
      @Body() user : UpdateShelterDto){
      return this.sheltersService.updatedProfile(id, user)
  }

  @UseGuards(AuthGuard)
  @Post('active/:id')
 ActiveShelter(@Req() req, @Param('id', ParseUUIDPipe) id: string) {
    const accessToken = req.auth0Token;
    return this.sheltersService.ActiveShelter(id, accessToken);
  }

  @UseGuards(AuthGuard)
  @Post(':id')
  deleteShelter(@Req() req, @Param('id', ParseUUIDPipe) id: string) {
    const accessToken = req.auth0Token;
    return this.sheltersService.deleteShelter(id, accessToken);
  }
  
  @UseGuards(AuthGuard)
  @Put('admin/:id')
  adminShelter(@Req() req, @Param('id',ParseUUIDPipe) id:string){
      const accessToken = req.auth0Token;
      return this.sheltersService.adminShelter(id,accessToken)
  }
}

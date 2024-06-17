import { Controller, Get, Query } from '@nestjs/common';
import { SerchService } from './serch.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags("Search")
@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SerchService){}

    @Get('filter')
    @ApiQuery({ name: 'exotic_animals', required: false }) 
    @ApiQuery({ name: 'address', required: false }) 
    @ApiQuery({ name: 'shelter_name', required: false })
    @ApiQuery({ name: 'breed', required: false }) 
    @ApiQuery({ name: 'pet_size', required: false })  
    @ApiQuery({ name: 'age', required: false })  
    searchGeneral1(@Query("exotic_animals") exotic_animals?, @Query("address") address?, @Query("shelter_name") shelter_name?
    , @Query("breed") breed?, @Query("pet_size") pet_size?, @Query("age") age?,){

        return this.searchService.searchGeneral1(exotic_animals,address, shelter_name, breed, pet_size, Number(age));
    }


    @Get()
    @ApiQuery({ name: 'q', required: false })  
    searchGeneral(@Query('q') query: string){
       
        return this.searchService.searchGeneral(query);
    }



    @Get('pets')
    @ApiQuery({ name: 'breed', required: false }) 
    @ApiQuery({ name: 'pet_size', required: false }) 
    @ApiQuery({ name: 'age', required: false }) 
    @ApiQuery({ name: 'sexo', required: false }) 
    filterPets(@Query("breed") breed, @Query("pet_size") pet_size, @Query("age") age, @Query("sexo") sexo,){

        return this.searchService.filterPets(breed, pet_size,Number(age),sexo);
    };

    @Get('shelters')
    @ApiQuery({ name: 'exotic_animals', required: false }) 
    @ApiQuery({ name: 'address', required: false }) 
    filterShelters(@Query("exotic_animals") exotic_animals, @Query("address") address,){

        return this.searchService.filterShelters(exotic_animals, address);
    };
}

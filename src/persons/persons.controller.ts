import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe, Put, Patch } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { Person } from './interfaces/person.interface';
import { PersonValidationPipe } from './pipes/person.validation.pipe';

@Controller('persons')
export class PersonsController {
    constructor(private readonly personService: PersonsService) { }

    @Get()
    getAllPersons() {
        return this.personService.getPersons();
    }

    @Get('/:id')
    getPerson(@Param('id', ParseIntPipe) id: number) {
        return this.personService.getPersonDetails(id);
    }

    @Post()
    createPerson(@Body(new PersonValidationPipe()) person: Person) {
        return this.personService.createPerson(person);
    }

    @Put('/:id')
    updatePerson(@Body(new PersonValidationPipe()) person: Person, @Param('id', ParseIntPipe) id: number) {
        return this.personService.updatePerson(id, person);
    }

    @Delete('/:id')
    deletePerson(@Param('id', ParseIntPipe) id: number) {
        return this.personService.deletePerson(id);
    }

    @Post('/bulk')
    bulkAction(@Body() data: any) {
        if (data.action === 'delete') {
            return this.personService.deletePersons(data.data);
        }
    }

    @Patch('/:id')
    undoDeletedPerson(@Param('id', ParseIntPipe) id: number) {
        return this.personService.undoDeletedPerson(id);
    }
}

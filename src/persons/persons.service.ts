import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Person } from './interfaces/person.interface';

@Injectable()
export class PersonsService {
    constructor(private readonly prismaService: PrismaService) { }

    //Get All Persons
    async getPersons(): Promise<Person[]> {
        try {
            return await this.prismaService.persons.findMany({
                where: { deleted: false },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    age: true,
                    gender: true,
                    addresses: {
                        select: {
                            type: true,
                            address1: true,
                            address2: true,
                            street: true,
                            city: true,
                            state: true,
                            country: true,
                            postalCode: true
                        }
                    },
                    emails: {
                        select: {
                            type: true,
                            value: true
                        }
                    },
                    phones: {
                        select: {
                            type: true,
                            code: true,
                            number: true
                        }
                    }
                }
            });
           
        } catch (err) {
            throw new BadRequestException(['Error'])
        }
    }

    //Get Person Details
    async getPersonDetails(id: number): Promise<Person> {
        try {
            const person = await this.prismaService.persons.findFirst({
                where: {
                    AND: [
                        {
                            id: {
                                equals: id
                            }
                        },
                        {
                            deleted: {
                                equals: false
                            }
                        },
                    ],
                },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    age: true,
                    gender: true,
                    addresses: {
                        select: {
                            type: true,
                            address1: true,
                            address2: true,
                            street: true,
                            city: true,
                            state: true,
                            country: true,
                            postalCode: true
                        }
                    },
                    emails: {
                        select: {
                            type: true,
                            value: true
                        }
                    },
                    phones: {
                        select: {
                            type: true,
                            code: true,
                            number: true
                        }
                    }
                }
            });
            if (!person) {
                throw new NotFoundException(['Person not found']);
            }

            return person;
        } catch (err) {
            throw new BadRequestException(['Error'])
        }
    }

    // Create Person
    async createPerson(person: Person): Promise<Person> {
        try {
            
            const data: any = {
                ...person,
                emails: {
                    create: person.emails
                },
                phones: {
                    create: person.phones
                },
                addresses: {
                    create: person.addresses
                }
            };


            return await this.prismaService.persons.create({
                data: data,
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    age: true,
                    gender: true,
                    addresses: {
                        select: {
                            type: true,
                            address1: true,
                            address2: true,
                            street: true,
                            city: true,
                            state: true,
                            country: true,
                            postalCode: true
                        }
                    },
                    emails: {
                        select: {
                            type: true,
                            value: true
                        }
                    },
                    phones: {
                        select: {
                            type: true,
                            code: true,
                            number: true
                        }
                    }
                }
            });
        } catch (error) {
            throw new BadRequestException(['Error'])
        }
    }

    // Update Person
    async updatePerson(id: number, person: Person) {
        try {
            const personData = await this.prismaService.persons.findFirst({
                where: {
                    AND: [
                        {
                            id: {
                                equals: id
                            }
                        },
                        {
                            deleted: {
                                equals: false
                            }
                        },
                    ],
                },
            });

            if (!personData) {
                throw new NotFoundException(['Person not found']);
            }

            await this.prismaService.persons.update({
                where: { id: id },
                data: {
                    emails: {
                        deleteMany: {}
                    },
                    phones: {
                        deleteMany: {}
                    },
                    addresses: {
                        deleteMany: {}
                    }
                }
            });

            return await this.prismaService.persons.update({
                where: { id: id },
                data: {
                    ...person,
                    emails: {
                        create: person.emails
                    },
                    phones: {
                        create: person.phones
                    },
                    addresses: {
                        create: person.addresses
                    }
                },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    age: true,
                    gender: true,
                    addresses: {
                        select: {
                            type: true,
                            address1: true,
                            address2: true,
                            street: true,
                            city: true,
                            state: true,
                            country: true,
                            postalCode: true
                        }
                    },
                    emails: {
                        select: {
                            type: true,
                            value: true
                        }
                    },
                    phones: {
                        select: {
                            type: true,
                            code: true,
                            number: true
                        }
                    }
                }

            });

        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    //Delete Person
    async deletePerson(id: number) {
        try {
            const person = await this.prismaService.persons.findFirst({
                where: {
                    AND: [
                        {
                            id: {
                                equals: id
                            }
                        },
                        {
                            deleted: {
                                equals: false
                            }
                        },
                    ],
                },
            });

            if (!person) {
                throw new NotFoundException(['Person not found']);
            }


            await this.prismaService.persons.update({
                where: { id: id },
                data: {
                    deleted: true
                }
            });

            return { id: id, deleted: true };
        } catch (error) {
            throw error
        }
    }

    //Bulk Delete people
    async deletePersons(data: any) {
        try {
            const result = await this.prismaService.persons.updateMany({
                where: {
                    id: {
                        in: data.map((x) => Number(x.id))
                    },
                },
                data: {
                    deleted: true
                }
            });

            return data;

        } catch (error) {
            throw error
        }
    }

    //Undo Deleted Person
    async undoDeletedPerson(id: number) {
        try {
            const person = await this.prismaService.persons.findFirst({
                where: {
                    AND: [
                        {
                            id: {
                                equals: id
                            }
                        },
                        {
                            deleted: {
                                equals: true
                            }
                        },
                    ],
                },
            });

            if (!person) {
                throw new NotFoundException(['Person not found']);
            }

            await this.prismaService.persons.update({
                where: { id: id },
                data: {
                    deleted: false
                }
            });

            return { id: id, deleted: false };
        } catch (error) {
            throw error
        }
    }
}

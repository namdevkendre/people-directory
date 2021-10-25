import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


async function main() {
  const persons = await prisma.persons.findMany()
  console.log("............Persons...............")
  console.log(persons)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
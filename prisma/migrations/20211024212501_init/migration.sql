-- CreateTable
CREATE TABLE "Persons" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Persons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Addresses" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT,
    "street" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "Addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Emails" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "Emails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phones" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "Phones_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Addresses" ADD CONSTRAINT "Addresses_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Emails" ADD CONSTRAINT "Emails_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phones" ADD CONSTRAINT "Phones_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

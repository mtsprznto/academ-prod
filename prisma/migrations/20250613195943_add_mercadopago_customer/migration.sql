-- CreateTable
CREATE TABLE "MercadoPagoCustomer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mercadoPagoCustomerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MercadoPagoCustomer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MercadoPagoCustomer_userId_key" ON "MercadoPagoCustomer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "MercadoPagoCustomer_mercadoPagoCustomerId_key" ON "MercadoPagoCustomer"("mercadoPagoCustomerId");

-- AddForeignKey
ALTER TABLE "MercadoPagoCustomer" ADD CONSTRAINT "MercadoPagoCustomer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

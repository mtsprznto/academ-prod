import prisma from "@/lib/prisma";

async function seedRoles() {
  await prisma.role.createMany({
    data: [
      { id: 0, nombre_rol: "ADMIN" },
      { id: 1, nombre_rol: "PROFESOR" },
      { id: 2, nombre_rol: "MIEMBRO" },
    ],
    skipDuplicates: true // ✅ Evita errores si ya existen
  });

  console.log("Roles creados correctamente");
}

seedRoles().catch((error) => {
  console.error("Error al crear roles:", error);
}).finally(() => {
  prisma.$disconnect();
});
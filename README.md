
# 📚 Academ Online

Nuestra plataforma es un entorno amigable para compartir conocimiento y aprender de manera organizada. Los usuarios pueden registrarse y acceder a diversas funcionalidades dependiendo de su rol dentro del sistema.

🌟 Características Principales

- Home: Vista general con información destacada sobre los cursos disponibles.
- Courses: Listado de cursos en la plataforma, accesibles para todos los miembros.
- My Courses: Espacio donde los miembros pueden ver los cursos que han adquirido.
- Orders: Sección para gestionar pedidos y visualizar el historial de compras.
- Certificates: Panel donde los estudiantes pueden descargar sus certificados tras completar cursos.

🎓 Roles en la plataforma

- Miembro: Cualquier usuario registrado comienza con este rol, con acceso a la navegación y compra de cursos.
- Profesor: Asignado por un administrador, permite acceso adicional a:
- Panel "Courses": Creación y gestión de cursos y capítulos.
- Analíticas: Información sobre el desempeño de sus cursos y cantidad de alumnos inscritos.

💳 Pago y gestión de compras

Utilizamos Stripe para procesar pagos de manera segura:
- Los alumnos acceden al checkout.
- Se redirigen a la pasarela de pago.
- Al finalizar la compra, Stripe se comunica con nuestro sistema mediante webhooks.
- Se actualiza el estado del pedido en la base de datos.



🛠️ Tecnologías Utilizadas

Nuestra academia online está desarrollada con herramientas modernas para garantizar seguridad, escalabilidad y una excelente experiencia de usuario.

- Clerk – Gestión de autenticación y usuarios.
- ShadCN UI – Framework de UI basado en Radix y Tailwind para construir interfaces limpias y funcionales.
- Shipfa Fast – Generación rápida de logos y branding.
- Neon – Base de datos PostgreSQL en la nube con escalabilidad automática.
- Prisma – ORM avanzado para la gestión de la base de datos y consultas eficientes.


🚀 Inicio del Proyecto
Antes de ejecutar la plataforma, asegúrate de instalar las dependencias necesarias:

~~~
npm install
# or
yarn install
# or
pnpm install
~~~

Luego, puedes iniciar el entorno de desarrollo con:

~~~
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
~~~




--------------------------

https://stripe.com/es

EX: acordesamarrillos555

DOCS STRIPE: https://docs.stripe.com/get-started/development-environment?lang=node


Activar stripe: `stripe listen --forward-to localhost:3000/api/webhook`

Para ejecutar el seeder: `node prisma/seed.js`
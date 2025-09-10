# iRepair - Sitio Web de Reparación de Electrónicos y Ventas

Una aplicación web completa para un negocio de reparación de electrónicos que incluye sistema de citas, venta de productos y gestión de clientes para Puerto Rico.

## Características

### 🏠 Página de Inicio
- Sección hero con llamada a la acción convincente
- Resumen de servicios con precios
- Indicadores de confianza e información de la empresa
- Diseño responsivo con UI moderno

### 📅 Sistema de Citas
- Flujo de reserva de múltiples pasos
- Selección de servicios (Teléfonos, Laptop, Tableta, Consola de juegos, etc.)
- Selección de fecha y hora
- Recolección de información del cliente
- Sistema de confirmación por correo

### 🛒 Tienda E-commerce
- Catálogo de productos con filtrado y búsqueda
- Exposición de electrónicos reacondicionados
- Indicadores de condición del producto
- Funcionalidad de carrito de compras
- Integración de pagos Stripe

### 🔐 Autenticación
- Registro e inicio de sesión de usuarios
- Hash seguro de contraseñas
- Gestión de sesiones con NextAuth.js
- Control de acceso basado en roles

### 💳 Procesamiento de Pagos
- Integración Stripe para pagos seguros
- Soporte para Auth Móvil (pagos móviles de Puerto Rico)
- Gestión de intenciones de pago
- Seguimiento de transacciones

## Stack Tecnológico

- **Framework**: Next.js 15 con App Router
- **Estilos**: Tailwind CSS
- **Base de Datos**: SQLite con Prisma ORM
- **Autenticación**: NextAuth.js
- **Pagos**: API de Stripe
- **Componentes UI**: Iconos Lucide React
- **TypeScript**: Seguridad de tipos completa

## Comenzando

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación

1. Instalar dependencias
```bash
npm install
```

2. Configurar variables de entorno
Crea un archivo `.env.local` con las siguientes variables:
```env
# Base de Datos
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_SECRET="tu-clave-secreta-aqui"
NEXTAUTH_URL="http://localhost:3000"

# Claves de Stripe
STRIPE_SECRET_KEY="sk_test_tu_clave_secreta_stripe_aqui"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_tu_clave_publica_stripe_aqui"

# Auth Móvil (Puerto Rico)
AUTH_MOVIL_API_KEY="tu_clave_api_auth_movil"
AUTH_MOVIL_SECRET="tu_secreto_auth_movil"
```

3. Configurar la base de datos
```bash
npx prisma generate
npx prisma db push
```

4. Iniciar el servidor de desarrollo
```bash
npm run dev
```

Visita `http://localhost:3000` para ver la aplicación.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/           # NextAuth.js configuration
│   │   ├── bookings/       # Booking API endpoints
│   │   ├── products/       # Product API endpoints
│   │   └── stripe/         # Stripe payment endpoints
│   ├── auth/
│   │   └── signin/         # Authentication pages
│   ├── booking/            # Booking system pages
│   ├── services/           # Services information page
│   ├── shop/              # E-commerce shop page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── providers.tsx      # App providers
├── lib/
│   └── stripe.ts          # Stripe configuration
├── types/
│   └── next-auth.d.ts     # NextAuth type definitions
└── prisma/
    └── schema.prisma      # Database schema
```

## Esquema de Base de Datos

La aplicación usa Prisma con SQLite para gestión de datos:

- **Users**: Cuentas de clientes y administradores
- **Services**: Servicios de reparación disponibles
- **Bookings**: Citas de clientes
- **Products**: Artículos en venta
- **Orders**: Transacciones de compra
- **OrderItems**: Artículos individuales en órdenes

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/[...nextauth]` - NextAuth.js endpoints

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get user bookings

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product

### Payments
- `POST /api/stripe/payment-intent` - Create payment intent
- `GET /api/stripe/payment-intent` - Get payment status

## Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Setup
1. Set up production database (PostgreSQL recommended)
2. Configure production environment variables
3. Set up Stripe webhooks for payment processing
4. Configure Auth Móvil integration

## Payment Integration

### Stripe
The application is configured to work with Stripe for international payments. Update the Stripe keys in your environment variables.

### Auth Móvil (Puerto Rico)
Para clientes de Puerto Rico, la integración de Auth Móvil está preparada. Necesitarás:
1. Registrarte con Auth Móvil
2. Obtener credenciales de API
3. Implementar el flujo de pagos de Auth Móvil

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is private and proprietary to iRepair.

## Support

For technical support or questions about the application, please contact the development team.

# iRepair - Electronic Repair & Sales Website

A comprehensive web application for an electronic repair business that includes booking system, product sales, and customer management.

## Features

### 🏠 Homepage
- Hero section with compelling call-to-action
- Service overview with pricing
- Trust indicators and company information
- Responsive design with modern UI

### 📅 Booking System
- Multi-step booking flow
- Service selection (Smartphone, Laptop, Tablet, Gaming Console, etc.)
- Date and time selection
- Customer information collection
- Email confirmation system

### 🛒 E-commerce Shop
- Product catalog with filtering and search
- Refurbished electronics showcase
- Product condition indicators
- Shopping cart functionality
- Stripe payment integration

### 🔐 Authentication
- User registration and login
- Secure password hashing
- Session management with NextAuth.js
- Role-based access control

### 💳 Payment Processing
- Stripe integration for secure payments
- Support for Auth Móvil (Dominican Republic mobile payments)
- Payment intent management
- Transaction tracking

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js
- **Payments**: Stripe API
- **UI Components**: Lucide React icons
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies
```bash
npm install
```

2. Set up environment variables
Create a `.env.local` file with the following variables:
```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Stripe Keys
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key_here"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key_here"

# Auth Móvil (Dominican Republic)
AUTH_MOVIL_API_KEY="your_auth_movil_api_key"
AUTH_MOVIL_SECRET="your_auth_movil_secret"
```

3. Set up the database
```bash
npx prisma generate
npx prisma db push
```

4. Start the development server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

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

## Database Schema

The application uses Prisma with SQLite for data management:

- **Users**: Customer and admin accounts
- **Services**: Available repair services
- **Bookings**: Customer appointments
- **Products**: Items for sale
- **Orders**: Purchase transactions
- **OrderItems**: Individual items in orders

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

### Auth Móvil (Dominican Republic)
For Dominican Republic customers, Auth Móvil integration is prepared. You'll need to:
1. Register with Auth Móvil
2. Get API credentials
3. Implement the Auth Móvil payment flow

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

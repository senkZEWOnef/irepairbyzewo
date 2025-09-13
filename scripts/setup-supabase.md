# 🚀 Supabase Setup Guide for iRepair

Follow these steps to set up your Supabase database:

## Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in details:
   - **Name:** `irepair-database`
   - **Database Password:** Generate and save a strong password
   - **Region:** `US East (N. Virginia)` (closest to Puerto Rico)
4. Click "Create new project" and wait 2-3 minutes

## Step 2: Get Your Configuration
1. In your Supabase dashboard, go to **Settings → API**
2. Copy these values:

   ```bash
   Project URL: https://[YOUR-PROJECT-REF].supabase.co
   Anon (public) key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   Service role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. Go to **Settings → Database** and copy:
   ```bash
   Connection string: postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
   ```

## Step 3: Update Your .env.local File
Replace the content of your `.env.local` file with:

```env
# Supabase Configuration
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"
SUPABASE_SERVICE_ROLE_KEY="[YOUR-SERVICE-ROLE-KEY]"

# NextAuth Configuration
NEXTAUTH_SECRET="your-secret-key-here-change-this-to-something-secure"
NEXTAUTH_URL="http://localhost:3000"

# Stripe Configuration (keep your existing keys)
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key_here"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key_here"

# Auth Movil (keep your existing keys)
AUTH_MOVIL_API_KEY="your_auth_movil_api_key"
AUTH_MOVIL_SECRET="your_auth_movil_secret"
```

## Step 4: Install Dependencies and Run Migration
Open your terminal in the project folder and run:

```bash
# Install new Supabase dependency
npm install

# Generate Prisma client with new PostgreSQL setup
npx prisma generate

# Push your schema to Supabase (creates all tables)
npx prisma db push

# Optional: Seed your database with sample data
npx prisma db seed
```

## Step 5: Set Up Storage for Product Images
1. In Supabase dashboard, go to **Storage**
2. Click "Create bucket"
3. Name it: `product-images`
4. Make it **Public**
5. Click "Create bucket"

## Step 6: Test the Connection
Run your development server:
```bash
npm run dev
```

Visit `http://localhost:3000/admin` and test:
- ✅ Login should work
- ✅ Products should load from Supabase
- ✅ Image uploads should work with Supabase Storage

## 🎉 You're Done!
Your iRepair app is now running on Supabase with:
- ✅ **Cloud PostgreSQL database**
- ✅ **File storage for images**
- ✅ **Real-time capabilities**
- ✅ **Automatic backups**
- ✅ **Scalable infrastructure**

## 🆘 Need Help?
If you encounter any issues:
1. Check your `.env.local` file has the correct values
2. Make sure your Supabase project is active
3. Verify the database connection string is correct
4. Check that the `product-images` bucket is public

## 🔧 Next Steps
- Test adding/editing products in the admin panel
- Upload some product images
- Create your first customer booking
- Set up your Stripe keys for payments
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bimmvopocmkvxvlyprhv.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpbW12b3BvY21rdnh2bHlwcmh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3NjEwNzcsImV4cCI6MjA3MzMzNzA3N30.KlQo6-Bu2zP_ArkSNAkoUg8FTBDvhVRgCGIj6S3mJ90'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// For admin operations that require elevated permissions
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpbW12b3BvY21rdnh2bHlwcmh2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Nzc2MTA3NywiZXhwIjoyMDczMzM3MDc3fQ.bNefOhJxcsokeBYzJAMbHpCgREcPauUY4SRw6MPAXwM',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// Storage bucket name for product images
export const STORAGE_BUCKET = 'product-images'

// Helper function to upload images
export async function uploadProductImage(file: File, fileName: string) {
  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(fileName, file)
    
  if (error) throw error
  
  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(fileName)
    
  return publicUrl
}

// Helper function to delete images
export async function deleteProductImage(fileName: string) {
  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .remove([fileName])
    
  if (error) throw error
}

// Database types (will be auto-generated later)
export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          category: string
          condition: string
          images: string | null
          stock: number
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          price: number
          category: string
          condition: string
          images?: string | null
          stock?: number
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price?: number
          category?: string
          condition?: string
          images?: string | null
          stock?: number
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      // Add other table types as needed
    }
  }
}
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Sample product data to seed the database
const sampleProducts = [
  {
    name: "iPhone 13 Pro - Refurbished",
    description: "Fully refurbished iPhone 13 Pro in excellent condition. Includes charger and 90-day warranty.",
    price: 699,
    category: "Smartphones",
    condition: "Excellent",
    stock: 5,
    images: JSON.stringify(["/api/placeholder/300/300"])
  },
  {
    name: "MacBook Air M1 - Refurbished",
    description: "MacBook Air with M1 chip, 8GB RAM, 256GB SSD. Light usage, excellent performance.",
    price: 849,
    category: "Laptops",
    condition: "Very Good",
    stock: 3,
    images: JSON.stringify(["/api/placeholder/300/300"])
  },
  {
    name: "Samsung Galaxy Tab S8",
    description: "Samsung Galaxy Tab S8 in like-new condition. Perfect for productivity and entertainment.",
    price: 449,
    category: "Tablets",
    condition: "Like New",
    stock: 8,
    images: JSON.stringify(["/api/placeholder/300/300"])
  },
  {
    name: "PlayStation 5 Console",
    description: "PS5 console in good working condition. Minor cosmetic wear, fully tested.",
    price: 399,
    category: "Gaming",
    condition: "Good",
    stock: 0,
    images: JSON.stringify(["/api/placeholder/300/300"])
  },
  {
    name: "AirPods Pro (2nd Gen)",
    description: "AirPods Pro with active noise cancellation. Includes charging case and tips.",
    price: 179,
    category: "Accessories",
    condition: "Excellent",
    stock: 12,
    images: JSON.stringify(["/api/placeholder/300/300"])
  },
  {
    name: "Dell XPS 13 Laptop",
    description: "Dell XPS 13 with Intel i7, 16GB RAM, 512GB SSD. Perfect for work and study.",
    price: 649,
    category: "Laptops",
    condition: "Very Good",
    stock: 4,
    images: JSON.stringify(["/api/placeholder/300/300"])
  }
];

export async function GET() {
  try {
    let products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });

    // If no products exist, seed the database
    if (products.length === 0) {
      await Promise.all(
        sampleProducts.map(product =>
          prisma.product.create({ data: product })
        )
      );

      products = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' }
      });
    }

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Products fetch error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      description,
      price,
      category,
      condition,
      stock,
      images
    } = await req.json();

    if (!name || !description || !price || !category || !condition) {
      return NextResponse.json(
        { message: "All required fields must be provided" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        category,
        condition,
        stock: parseInt(stock) || 0,
        images: JSON.stringify(images || []),
        status: "AVAILABLE"
      }
    });

    return NextResponse.json(
      { message: "Product created successfully", product },
      { status: 201 }
    );
  } catch (error) {
    console.error("Product creation error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
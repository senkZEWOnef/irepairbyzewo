"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Search, Filter, Star } from "lucide-react";

// Sample product data
const products = [
  {
    id: "1",
    name: "iPhone 13 Pro - Reacondicionado",
    price: 699,
    originalPrice: 999,
    category: "Teléfonos",
    condition: "Excelente",
    image: "/api/placeholder/300/300",
    rating: 4.8,
    reviews: 24,
    description: "iPhone 13 Pro completamente reacondicionado en excelente condición. Incluye cargador y garantía de 90 días.",
    inStock: true
  },
  {
    id: "2",
    name: "MacBook Air M1 - Reacondicionado",
    price: 849,
    originalPrice: 1199,
    category: "Laptops",
    condition: "Muy Bueno",
    image: "/api/placeholder/300/300",
    rating: 4.9,
    reviews: 18,
    description: "MacBook Air con chip M1, 8GB RAM, 256GB SSD. Uso ligero, excelente rendimiento.",
    inStock: true
  },
  {
    id: "3",
    name: "Samsung Galaxy Tab S8",
    price: 449,
    originalPrice: 699,
    category: "Tabletas",
    condition: "Como Nuevo",
    image: "/api/placeholder/300/300",
    rating: 4.7,
    reviews: 12,
    description: "Samsung Galaxy Tab S8 en condición como nueva. Perfecta para productividad y entretenimiento.",
    inStock: true
  },
  {
    id: "4",
    name: "Consola PlayStation 5",
    price: 399,
    originalPrice: 499,
    category: "Videojuegos",
    condition: "Bueno",
    image: "/api/placeholder/300/300",
    rating: 4.6,
    reviews: 31,
    description: "Consola PS5 en buenas condiciones de funcionamiento. Desgaste cosmético menor, completamente probada.",
    inStock: false
  },
  {
    id: "5",
    name: "AirPods Pro (2da Gen)",
    price: 179,
    originalPrice: 249,
    category: "Accesorios",
    condition: "Excelente",
    image: "/api/placeholder/300/300",
    rating: 4.8,
    reviews: 45,
    description: "AirPods Pro con cancelación activa de ruido. Incluye estuche de carga y puntas.",
    inStock: true
  },
  {
    id: "6",
    name: "Laptop Dell XPS 13",
    price: 649,
    originalPrice: 999,
    category: "Laptops",
    condition: "Muy Bueno",
    image: "/api/placeholder/300/300",
    rating: 4.5,
    reviews: 22,
    description: "Dell XPS 13 con Intel i7, 16GB RAM, 512GB SSD. Perfecta para trabajo y estudio.",
    inStock: true
  }
];

const categories = ["All", "Smartphones", "Laptops", "Tablets", "Gaming", "Accessories"];
const conditions = ["All", "Like New", "Excellent", "Very Good", "Good"];

export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCondition, setSelectedCondition] = useState("All");
  const [cart, setCart] = useState<string[]>([]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesCondition = selectedCondition === "All" || product.condition === selectedCondition;
    
    return matchesSearch && matchesCategory && matchesCondition;
  });

  const addToCart = (productId: string) => {
    setCart([...cart, productId]);
    // TODO: Implement proper cart functionality
    alert("Product added to cart!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                iRepair
              </Link>
            </div>
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
              <Link href="/services" className="text-gray-700 hover:text-blue-600">
                Services
              </Link>
              <Link href="/shop" className="text-gray-700 hover:text-blue-600">
                Shop
              </Link>
              <Link href="/booking" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Book Now
              </Link>
              <div className="relative">
                <ShoppingCart className="h-6 w-6 text-gray-700" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Quality Refurbished Electronics</h1>
          <p className="text-lg text-gray-600">Tested, certified, and backed by our 90-day warranty</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Condition Filter */}
            <div>
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {conditions.map(condition => (
                  <option key={condition} value={condition}>
                    {condition === "All" ? "All Conditions" : condition}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Product Image</span>
                </div>
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    product.condition === "Like New" ? "bg-green-100 text-green-800" :
                    product.condition === "Excellent" ? "bg-blue-100 text-blue-800" :
                    product.condition === "Very Good" ? "bg-yellow-100 text-yellow-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {product.condition}
                  </span>
                </div>
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-semibold">Out of Stock</span>
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg text-gray-900 flex-1">{product.name}</h3>
                </div>

                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                  </div>
                  <span className="ml-2 text-sm text-gray-500">({product.reviews} reviews)</span>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                    <span className="ml-2 text-sm text-gray-500 line-through">${product.originalPrice}</span>
                  </div>
                  <span className="text-sm text-green-600 font-medium">
                    Save ${product.originalPrice - product.price}
                  </span>
                </div>

                <button
                  onClick={() => addToCart(product.id)}
                  disabled={!product.inStock}
                  className={`w-full py-2 px-4 rounded-md font-semibold transition-colors ${
                    product.inStock
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="bg-white rounded-lg shadow-md p-8 mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">Why Buy From iRepair?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="font-semibold mb-2">Thoroughly Tested</h3>
              <p className="text-gray-600">Every device undergoes comprehensive testing to ensure quality</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="font-semibold mb-2">90-Day Warranty</h3>
              <p className="text-gray-600">All products come with our comprehensive 90-day warranty</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="font-semibold mb-2">Great Value</h3>
              <p className="text-gray-600">Save up to 50% compared to buying new</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
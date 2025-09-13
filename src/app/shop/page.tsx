"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Search, Filter, Star, Plus, Minus, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  category: string;
  condition: string;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  inStock: boolean;
}

// Sample product data
const products = [
  {
    id: "1",
    name: "iPhones Reacondicionados - Varios Modelos",
    price: 599,
    originalPrice: 899,
    category: "Teléfonos",
    condition: "Excelente",
    image: "/images/products/4sale.png",
    rating: 4.8,
    reviews: 24,
    description: "iPhones completamente reacondicionados en excelente condición. Varios modelos disponibles. Incluye cargador y garantía de 90 días.",
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
    name: "PlayStation Reacondicionada",
    price: 299,
    originalPrice: 399,
    category: "Videojuegos",
    condition: "Muy Bueno",
    image: "/images/products/psrepair.png",
    rating: 4.6,
    reviews: 31,
    description: "PlayStation completamente reacondicionada y probada. Funcionamiento perfecto, ligero desgaste cosmético.",
    inStock: true
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

const categories = ["Todo", "Teléfonos", "Laptops", "Tabletas", "Videojuegos", "Accesorios"];
const conditions = ["Todo", "Como Nuevo", "Excelente", "Muy Bueno", "Bueno"];

export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todo");
  const [selectedCondition, setSelectedCondition] = useState("Todo");
  const [showCart, setShowCart] = useState(false);
  const { items: cartItems, addToCart, removeFromCart, updateQuantity, getTotalItems, getTotalPrice } = useCart();

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todo" || product.category === selectedCategory;
    const matchesCondition = selectedCondition === "Todo" || product.condition === selectedCondition;
    
    return matchesSearch && matchesCategory && matchesCondition;
  });

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      condition: product.condition
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-xl overflow-hidden">
                  <img 
                    src="/images/gallery/logo.png" 
                    alt="iRepair Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  iRepair
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-8">
              <Link href="/services" className="text-slate-700 hover:text-blue-600 font-medium transition-colors duration-200">
                Servicios
              </Link>
              <Link href="/shop" className="text-blue-600 font-semibold">
                Tienda
              </Link>
              <Link href="/booking" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Reservar Cita
              </Link>
              <div className="relative">
                <button
                  onClick={() => setShowCart(!showCart)}
                  className="bg-slate-100 hover:bg-slate-200 p-3 rounded-full transition-colors duration-200"
                >
                  <ShoppingCart className="h-6 w-6 text-slate-700" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-semibold animate-pulse">
                      {getTotalItems()}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Shopping Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop with Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/gallery/newx.png')",
              backgroundBlendMode: "overlay",
              backgroundColor: "rgba(0, 0, 0, 0.4)"
            }}
            onClick={() => setShowCart(false)}
          />
          
          {/* Cart Panel - Right Side */}
          <div className="absolute right-0 top-0 bottom-0 w-96 bg-white shadow-xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-900">Carrito de Compras</h2>
                <button 
                  onClick={() => setShowCart(false)} 
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-6 w-6 text-gray-600" />
                </button>
              </div>
              
              {/* Content */}
              {cartItems.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Tu carrito está vacío</p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Items List */}
                  <div className="flex-1 overflow-y-auto p-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 py-4 border-b">
                        <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                          <img 
                            src={item.image || "/api/placeholder/64/64"} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-sm text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.condition}</p>
                          <p className="text-blue-600 font-semibold">${item.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 hover:bg-red-100 rounded text-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  {/* Footer */}
                  <div className="border-t p-6 space-y-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total: </span>
                      <span className="text-blue-600">${getTotalPrice()}</span>
                    </div>
                    <Link 
                      href="/checkout"
                      className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                      onClick={() => setShowCart(false)}
                    >
                      Proceder al Pago
                    </Link>
                    <button 
                      onClick={() => setShowCart(false)}
                      className="w-full border border-gray-300 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Continuar Comprando
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-6">
            NUESTRA TIENDA
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Electrónicos 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Reacondicionados
            </span>
            <br />de Calidad
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Probados, certificados y respaldados por nuestra garantía de 90 días. 
            <span className="font-semibold text-slate-900">Ahorra hasta 50%</span> comparado con productos nuevos.
          </p>
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
                placeholder="Buscar productos..."
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
                    {condition === "Todo" ? "Todas las Condiciones" : condition}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <Link href={`/shop/${product.id}`}>
                <div className="relative cursor-pointer">
                  <div className="w-full h-48 bg-gray-100 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
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
              </Link>

              <div className="p-4">
                <Link href={`/shop/${product.id}`} className="block mb-4 hover:text-blue-600 transition-colors">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{product.name}</h3>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                    </div>
                    <span className="ml-2 text-sm text-gray-500">({product.reviews} reviews)</span>
                  </div>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                      <span className="ml-2 text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    </div>
                    <span className="text-sm text-green-600 font-medium">
                      Ahorras ${product.originalPrice - product.price}
                    </span>
                  </div>
                </Link>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddToCart(product);
                  }}
                  disabled={!product.inStock}
                  className={`w-full py-2 px-4 rounded-md font-semibold transition-colors ${
                    product.inStock
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {product.inStock ? "Añadir al Carrito" : "Agotado"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No se encontraron productos que coincidan con tus criterios.</p>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="bg-white rounded-lg shadow-md p-8 mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">¿Por Qué Comprar en iRepair?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="font-semibold mb-2">Probados Exhaustivamente</h3>
              <p className="text-gray-600">Cada dispositivo pasa por pruebas exhaustivas para asegurar la calidad</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="font-semibold mb-2">Garantía de 90 Días</h3>
              <p className="text-gray-600">Todos los productos vienen con nuestra garantía integral de 90 días</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="font-semibold mb-2">Excelente Valor</h3>
              <p className="text-gray-600">Ahorra hasta 50% comparado con comprar nuevo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
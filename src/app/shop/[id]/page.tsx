"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Star, ShoppingCart, ArrowLeft, Plus, Minus, Check, Truck, Shield, RotateCcw } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

// Sample product data (in a real app, this would come from an API/database)
const products = [
  {
    id: "1",
    name: "iPhones Reacondicionados - Varios Modelos",
    price: 599,
    originalPrice: 899,
    category: "Teléfonos",
    condition: "Excelente",
    images: [
      "/images/products/4sale.png",
      "/images/gallery/logo.png",
      "/images/store/local.png"
    ],
    rating: 4.8,
    reviews: 24,
    description: "iPhones completamente reacondicionados en excelente condición. Varios modelos disponibles incluyendo iPhone 12, iPhone 13, y iPhone 14. Cada teléfono pasa por un riguroso proceso de inspección y reparación.",
    features: [
      "Batería al 85% o superior de capacidad",
      "Pantalla sin rayones ni grietas",
      "Todas las funciones probadas y funcionando",
      "Desbloqueado para todas las compañías",
      "Incluye cable de carga",
      "90 días de garantía"
    ],
    specifications: {
      "Estado": "Reacondicionado - Excelente",
      "Garantía": "90 días",
      "Batería": "85%+ capacidad",
      "Accesorios": "Cable de carga incluido",
      "Compatibilidad": "Desbloqueado"
    },
    inStock: true,
    stockQuantity: 15
  },
  {
    id: "2",
    name: "MacBook Air M1 - Reacondicionado",
    price: 849,
    originalPrice: 1199,
    category: "Laptops",
    condition: "Muy Bueno",
    images: [
      "/api/placeholder/600/400",
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ],
    rating: 4.9,
    reviews: 18,
    description: "MacBook Air con chip M1, 8GB RAM, 256GB SSD. Uso ligero, excelente rendimiento para trabajo y estudios.",
    features: [
      "Chip M1 de Apple",
      "8GB de RAM unificada",
      "256GB de almacenamiento SSD",
      "Pantalla Retina de 13.3 pulgadas",
      "Hasta 18 horas de duración de batería",
      "Incluye cargador MagSafe"
    ],
    specifications: {
      "Procesador": "Apple M1",
      "RAM": "8GB",
      "Almacenamiento": "256GB SSD",
      "Pantalla": "13.3\" Retina",
      "Estado": "Muy Bueno",
      "Garantía": "90 días"
    },
    inStock: true,
    stockQuantity: 8
  },
  {
    id: "3",
    name: "Samsung Galaxy Tab S8",
    price: 449,
    originalPrice: 699,
    category: "Tabletas",
    condition: "Como Nuevo",
    images: [
      "/api/placeholder/600/400",
      "/api/placeholder/600/400",
      "/api/placeholder/600/400"
    ],
    rating: 4.7,
    reviews: 12,
    description: "Samsung Galaxy Tab S8 en condición como nueva. Perfecta para productividad y entretenimiento.",
    features: [
      "Pantalla AMOLED de 11 pulgadas",
      "Procesador Snapdragon 8 Gen 1",
      "8GB RAM, 128GB almacenamiento",
      "S Pen incluido",
      "Cámaras duales traseras",
      "Batería de larga duración"
    ],
    specifications: {
      "Pantalla": "11\" AMOLED",
      "Procesador": "Snapdragon 8 Gen 1",
      "RAM": "8GB",
      "Almacenamiento": "128GB",
      "Estado": "Como Nuevo",
      "Accesorios": "S Pen incluido"
    },
    inStock: true,
    stockQuantity: 5
  }
];

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const product = products.find(p => p.id === params.id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Producto no encontrado</h1>
          <Link href="/shop" className="text-blue-600 hover:underline">
            ← Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        condition: product.condition
      });
    }
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation Back */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button 
            onClick={() => router.back()}
            className="flex items-center text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Volver
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-slate-100 rounded-2xl overflow-hidden">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Image Thumbnails */}
              <div className="flex space-x-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-blue-500 ring-2 ring-blue-200' 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              
              {/* Category and Condition */}
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {product.category}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {product.condition}
                </span>
              </div>

              {/* Product Name */}
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={`${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-slate-600">
                  {product.rating} ({product.reviews} reseñas)
                </span>
              </div>

              {/* Pricing */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="text-4xl font-bold text-slate-900">
                    ${product.price}
                  </span>
                  <span className="text-2xl text-slate-500 line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded-md text-sm font-bold">
                    -{discountPercentage}%
                  </span>
                </div>
                <p className="text-slate-600">
                  Ahorras ${product.originalPrice - product.price}
                </p>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-slate-900">Descripción</h3>
                <p className="text-slate-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-semibold text-slate-900">Cantidad:</span>
                  <div className="flex items-center border border-slate-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-slate-100 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 py-2 font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                      className="p-2 hover:bg-slate-100 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <span className="text-sm text-slate-500">
                    {product.stockQuantity} disponibles
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 ${
                    isAddedToCart
                      ? 'bg-green-500 text-white'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl'
                  }`}
                  disabled={isAddedToCart}
                >
                  {isAddedToCart ? (
                    <>
                      <Check size={24} />
                      <span>¡Agregado al carrito!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={24} />
                      <span>Agregar al carrito - ${(product.price * quantity).toLocaleString()}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
                <div className="flex items-center space-x-3">
                  <Truck className="text-blue-600" size={24} />
                  <div>
                    <div className="font-semibold text-slate-900">Envío Gratis</div>
                    <div className="text-sm text-slate-600">En CDMX</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="text-green-600" size={24} />
                  <div>
                    <div className="font-semibold text-slate-900">90 días</div>
                    <div className="text-sm text-slate-600">Garantía</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <RotateCcw className="text-purple-600" size={24} />
                  <div>
                    <div className="font-semibold text-slate-900">15 días</div>
                    <div className="text-sm text-slate-600">Devolución</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information Tabs */}
          <div className="border-t bg-slate-50 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Features List */}
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Características</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="text-green-500 mt-1 flex-shrink-0" size={16} />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specifications */}
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Especificaciones</h3>
                <div className="space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-slate-200">
                      <span className="font-semibold text-slate-700">{key}:</span>
                      <span className="text-slate-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
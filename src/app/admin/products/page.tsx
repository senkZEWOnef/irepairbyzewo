"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase, uploadProductImage, deleteProductImage } from "@/lib/supabase";
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Eye,
  Package,
  ShoppingCart,
  Star,
  AlertCircle,
  Upload,
  X,
  Image as ImageIcon
} from "lucide-react";

// Categories and conditions
const categories = ["Todo", "phones", "tablets", "laptops", "accessories", "gaming"];
const categoryLabels: { [key: string]: string } = {
  "Todo": "Todo",
  "phones": "Teléfonos", 
  "tablets": "Tabletas",
  "laptops": "Laptops",
  "accessories": "Accesorios",
  "gaming": "Videojuegos"
};
const conditions = ["New", "Excellent", "Very Good", "Good"];
const conditionLabels: { [key: string]: string } = {
  "New": "Como Nuevo",
  "Excellent": "Excelente", 
  "Very Good": "Muy Bueno",
  "Good": "Bueno"
};

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  images: string | null;
  stock: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminProductsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todo");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    originalPrice: "",
    category: "phones",
    condition: "Excellent",
    stock: "",
    description: "",
    image: null
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const router = useRouter();

  // Load products from Supabase
  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('createdAt', { ascending: false });
      
      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error loading products:', error);
      alert('Error al cargar los productos');
    }
  };

  useEffect(() => {
    // Check admin authentication
    const adminAuth = localStorage.getItem("admin_authenticated");
    const loginTime = localStorage.getItem("admin_login_time");
    
    if (adminAuth === "true" && loginTime) {
      const twentyFourHours = 24 * 60 * 60 * 1000;
      if (Date.now() - parseInt(loginTime) < twentyFourHours) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("admin_authenticated");
        localStorage.removeItem("admin_login_time");
        router.push("/admin/login");
      }
    } else {
      router.push("/admin/login");
    }
    
    setIsLoading(false);
    
    // Load products if authenticated
    if (adminAuth === "true" && loginTime) {
      const twentyFourHours = 24 * 60 * 60 * 1000;
      if (Date.now() - parseInt(loginTime) < twentyFourHours) {
        loadProducts();
      }
    }
  }, [router]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todo" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteProduct = async (productId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      try {
        // Delete from Supabase
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', productId);
          
        if (error) throw error;
        
        // Update local state
        setProducts(products.filter(p => p.id !== productId));
        alert('Producto eliminado correctamente');
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error al eliminar el producto');
      }
    }
  };

  const processImageFile = (file: File) => {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Por favor selecciona una imagen válida (JPG, PNG, WEBP)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen debe ser menor a 5MB');
      return;
    }

    setImageFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      processImageFile(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setDragActive(false);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      price: product.price.toString(),
      originalPrice: "",
      category: product.category,
      condition: product.condition,
      stock: product.stock.toString(),
      description: product.description,
      image: product.images
    });
    setImagePreview(product.images);
    setImageFile(null);
    setShowAddModal(true);
  };

  const handleSaveProduct = async () => {
    try {
      let imageUrl = null;
      
      // Upload image if there's a new file
      if (imageFile) {
        const fileName = `${Date.now()}-${imageFile.name}`;
        imageUrl = await uploadProductImage(imageFile, fileName);
      } else if (editingProduct && editingProduct.images) {
        // Keep existing image
        imageUrl = editingProduct.images;
      }

      const productData = {
        name: productForm.name,
        price: parseFloat(productForm.price),
        category: productForm.category,
        condition: productForm.condition,
        stock: parseInt(productForm.stock),
        description: productForm.description,
        images: imageUrl,
        status: parseInt(productForm.stock) > 0 ? 'AVAILABLE' : 'SOLD'
      };

      if (editingProduct) {
        // Update existing product
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);
          
        if (error) throw error;
        alert('Producto actualizado correctamente');
      } else {
        // Create new product
        const { error } = await supabase
          .from('products')
          .insert([productData]);
          
        if (error) throw error;
        alert('Producto creado correctamente');
      }

      // Reload products and close modal
      await loadProducts();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error al guardar el producto: ' + (error as Error).message);
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditingProduct(null);
    setImageFile(null);
    setImagePreview(null);
    setProductForm({
      name: "",
      price: "",
      originalPrice: "",
      category: "phones",
      condition: "Excellent",
      stock: "",
      description: "",
      image: null
    });
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: "Agotado", color: "text-red-600", bgColor: "bg-red-100" };
    if (stock <= 2) return { text: "Bajo Stock", color: "text-yellow-600", bgColor: "bg-yellow-100" };
    return { text: "En Stock", color: "text-green-600", bgColor: "bg-green-100" };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin/dashboard"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Panel Admin</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <Package className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-semibold text-gray-900">Gestión de Productos</h1>
              </div>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              <Plus className="h-5 w-5" />
              <span>Nuevo Producto</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Productos</p>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">En Stock</p>
                <p className="text-2xl font-bold text-gray-900">{products.filter(p => p.stock > 0).length}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <ShoppingCart className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Bajo Stock</p>
                <p className="text-2xl font-bold text-gray-900">{products.filter(p => p.stock <= 2 && p.stock > 0).length}</p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-100">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Agotados</p>
                <p className="text-2xl font-bold text-gray-900">{products.filter(p => p.stock === 0).length}</p>
              </div>
              <div className="p-3 rounded-lg bg-red-100">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
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

            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{categoryLabels[category]}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Producto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => {
                  const stockStatus = getStockStatus(product.stock);
                  return (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                            <Package className="h-6 w-6 text-gray-500" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">{conditionLabels[product.condition] || product.condition}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          {categoryLabels[product.category] || product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">${product.price}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${stockStatus.bgColor} ${stockStatus.color}`}>
                          {product.stock} - {stockStatus.text}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            product.status === 'AVAILABLE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {product.status === 'AVAILABLE' ? 'Disponible' : 'No Disponible'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-900" title="Ver detalles">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleEditProduct(product)}
                            className="text-green-600 hover:text-green-900" 
                            title="Editar"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-900" 
                            title="Eliminar"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No se encontraron productos</p>
              <p className="text-gray-500">Intenta ajustar tus filtros de búsqueda</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-6">
                {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
              </h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre del Producto
                    </label>
                    <input
                      type="text"
                      value={productForm.name}
                      onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ej: iPhone 13 Pro"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoría
                    </label>
                    <select
                      value={productForm.category}
                      onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.filter(c => c !== "Todo").map(category => (
                        <option key={category} value={category}>{categoryLabels[category]}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Precio de Venta ($)
                    </label>
                    <input
                      type="number"
                      value={productForm.price}
                      onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="699"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Precio Original ($)
                    </label>
                    <input
                      type="number"
                      value={productForm.originalPrice}
                      onChange={(e) => setProductForm({...productForm, originalPrice: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="999"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Condición
                    </label>
                    <select
                      value={productForm.condition}
                      onChange={(e) => setProductForm({...productForm, condition: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {conditions.map(condition => (
                        <option key={condition} value={condition}>{conditionLabels[condition]}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock Disponible
                    </label>
                    <input
                      type="number"
                      value={productForm.stock}
                      onChange={(e) => setProductForm({...productForm, stock: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="5"
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción
                  </label>
                  <textarea
                    value={productForm.description}
                    onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Descripción detallada del producto..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Imagen del Producto
                  </label>
                  
                  {/* Image Preview with Drag & Drop */}
                  <div className="mb-4">
                    <div 
                      className={`w-full h-48 border-2 border-dashed rounded-lg flex items-center justify-center overflow-hidden transition-colors ${
                        dragActive 
                          ? 'border-blue-400 bg-blue-50' 
                          : 'border-gray-300 bg-gray-50'
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      {imagePreview || (editingProduct && productForm.image !== "/api/placeholder/300/300") ? (
                        <div className="relative w-full h-full">
                          <img
                            src={imagePreview || productForm.image}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="text-center p-6">
                          <ImageIcon className={`h-12 w-12 mx-auto mb-3 transition-colors ${
                            dragActive ? 'text-blue-500' : 'text-gray-400'
                          }`} />
                          <p className={`text-sm mb-2 transition-colors ${
                            dragActive ? 'text-blue-700' : 'text-gray-500'
                          }`}>
                            {dragActive ? 'Suelta la imagen aquí' : 'Arrastra y suelta una imagen aquí'}
                          </p>
                          <p className="text-xs text-gray-400">
                            o haz clic abajo para seleccionar
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Upload Button */}
                  <div className="flex items-center gap-3">
                    <label className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <div className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                        <Upload className="h-4 w-4 mr-2 text-gray-600" />
                        <span className="text-sm text-gray-700">
                          {imageFile ? imageFile.name : 'Seleccionar imagen'}
                        </span>
                      </div>
                    </label>
                    
                    {(imagePreview || imageFile) && (
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="px-3 py-2 text-sm text-red-600 hover:text-red-700 transition-colors"
                      >
                        Quitar
                      </button>
                    )}
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-2">
                    Formatos soportados: JPG, PNG, WEBP. Tamaño máximo: 5MB
                  </p>
                </div>

                <div className="flex space-x-4 pt-6 border-t">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveProduct}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                  >
                    {editingProduct ? 'Guardar Cambios' : 'Crear Producto'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
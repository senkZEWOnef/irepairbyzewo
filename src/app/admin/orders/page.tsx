"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  ShoppingCart, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Download,
  DollarSign,
  User
} from "lucide-react";

// Sample orders data
const sampleOrders = [
  {
    id: "ORD001",
    customerName: "María González",
    customerEmail: "maria@email.com",
    customerPhone: "(787) 234-5678",
    items: [
      { name: "iPhone 13 Pro - Reacondicionado", price: 699, quantity: 1 },
      { name: "Cargador iPhone", price: 25, quantity: 1 }
    ],
    total: 724,
    status: "processing",
    shippingAddress: "123 Calle Principal, San Juan, PR 00901",
    orderDate: "2024-01-18T10:30:00",
    estimatedDelivery: "2024-01-22",
    trackingNumber: "TRK123456789",
    paymentMethod: "Credit Card",
    notes: "Entrega en horario de oficina preferiblemente"
  },
  {
    id: "ORD002",
    customerName: "Juan Pérez",
    customerEmail: "juan@email.com",
    customerPhone: "(787) 123-4567",
    items: [
      { name: "MacBook Air M1 - Reacondicionado", price: 849, quantity: 1 }
    ],
    total: 849,
    status: "shipped",
    shippingAddress: "456 Avenida Central, Bayamón, PR 00961",
    orderDate: "2024-01-15T14:20:00",
    estimatedDelivery: "2024-01-20",
    trackingNumber: "TRK987654321",
    paymentMethod: "PayPal",
    notes: ""
  },
  {
    id: "ORD003",
    customerName: "Carlos Rivera",
    customerEmail: "carlos@email.com",
    customerPhone: "(787) 345-6789",
    items: [
      { name: "Samsung Galaxy Tab S8", price: 449, quantity: 1 },
      { name: "Funda Protectora", price: 35, quantity: 1 }
    ],
    total: 484,
    status: "delivered",
    shippingAddress: "789 Plaza Norte, Carolina, PR 00987",
    orderDate: "2024-01-10T09:15:00",
    estimatedDelivery: "2024-01-15",
    trackingNumber: "TRK456789123",
    paymentMethod: "Credit Card",
    notes: "Completado - Cliente satisfecho"
  },
  {
    id: "ORD004",
    customerName: "Ana Rodríguez",
    customerEmail: "ana@email.com",
    customerPhone: "(787) 456-7890",
    items: [
      { name: "PlayStation 5 - Reacondicionada", price: 399, quantity: 1 }
    ],
    total: 399,
    status: "cancelled",
    shippingAddress: "321 Calle Luna, Ponce, PR 00716",
    orderDate: "2024-01-12T16:45:00",
    estimatedDelivery: "",
    trackingNumber: "",
    paymentMethod: "Credit Card",
    notes: "Cancelado por el cliente - reembolso procesado"
  }
];

export default function AdminOrdersPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState(sampleOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const router = useRouter();

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
  }, [router]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return { text: "Pendiente", color: "text-yellow-600", bgColor: "bg-yellow-100", icon: Clock };
      case "processing":
        return { text: "Procesando", color: "text-blue-600", bgColor: "bg-blue-100", icon: Package };
      case "shipped":
        return { text: "Enviado", color: "text-purple-600", bgColor: "bg-purple-100", icon: Truck };
      case "delivered":
        return { text: "Entregado", color: "text-green-600", bgColor: "bg-green-100", icon: CheckCircle };
      case "cancelled":
        return { text: "Cancelado", color: "text-red-600", bgColor: "bg-red-100", icon: Trash2 };
      default:
        return { text: status, color: "text-gray-600", bgColor: "bg-gray-100", icon: Package };
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesSearch = 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
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
                <ShoppingCart className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-semibold text-gray-900">Gestión de Pedidos</h1>
              </div>
            </div>

            <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
              <Download className="h-5 w-5" />
              <span>Exportar</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Pedidos</p>
                <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm text-green-600 font-medium">
                ${orders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}
              </span>
              <span className="text-sm text-gray-500 ml-2">valor total</span>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Procesando</p>
                <p className="text-2xl font-bold text-gray-900">{orders.filter(o => o.status === "processing").length}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Enviados</p>
                <p className="text-2xl font-bold text-gray-900">{orders.filter(o => o.status === "shipped").length}</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100">
                <Truck className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Entregados</p>
                <p className="text-2xl font-bold text-gray-900">{orders.filter(o => o.status === "delivered").length}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
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
                placeholder="Buscar por cliente, email o ID de pedido..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todos los Estados</option>
                <option value="pending">Pendiente</option>
                <option value="processing">Procesando</option>
                <option value="shipped">Enviado</option>
                <option value="delivered">Entregado</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pedido
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => {
                  const status = getStatusColor(order.status);
                  const StatusIcon = status.icon;
                  return (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{order.id}</div>
                          <div className="text-sm text-gray-500">{order.items.length} producto(s)</div>
                          {order.trackingNumber && (
                            <div className="text-xs text-blue-600">#{order.trackingNumber}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                            <User className="h-5 w-5 text-gray-500" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                            <div className="text-sm text-gray-500">{order.customerEmail}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(order.orderDate).toLocaleDateString('es')}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(order.orderDate).toLocaleTimeString('es', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.bgColor} ${status.color}`}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {status.text}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">${order.total}</div>
                        <div className="text-sm text-gray-500">{order.paymentMethod}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => viewOrderDetails(order)}
                            className="text-blue-600 hover:text-blue-900" 
                            title="Ver detalles"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          {order.status === "processing" && (
                            <button 
                              onClick={() => updateOrderStatus(order.id, "shipped")}
                              className="text-purple-600 hover:text-purple-900" 
                              title="Marcar como enviado"
                            >
                              <Truck className="h-4 w-4" />
                            </button>
                          )}
                          {order.status === "shipped" && (
                            <button 
                              onClick={() => updateOrderStatus(order.id, "delivered")}
                              className="text-green-600 hover:text-green-900" 
                              title="Marcar como entregado"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                          )}
                          <button className="text-gray-600 hover:text-gray-900" title="Editar">
                            <Edit className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No se encontraron pedidos</p>
              <p className="text-gray-500">Intenta ajustar tus filtros de búsqueda</p>
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Pedido {selectedOrder.id}</h3>
                  <p className="text-gray-600">
                    {new Date(selectedOrder.orderDate).toLocaleDateString('es', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <button
                  onClick={() => setShowOrderDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Customer Info */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Información del Cliente</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Nombre</p>
                      <p className="text-sm text-gray-900">{selectedOrder.customerName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Email</p>
                      <p className="text-sm text-gray-900">{selectedOrder.customerEmail}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Teléfono</p>
                      <p className="text-sm text-gray-900">{selectedOrder.customerPhone}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Método de Pago</p>
                      <p className="text-sm text-gray-900">{selectedOrder.paymentMethod}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700">Dirección de Envío</p>
                    <p className="text-sm text-gray-900">{selectedOrder.shippingAddress}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Productos</h4>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Cantidad</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 text-sm text-gray-900">{item.name}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{item.quantity}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">${item.price}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">${item.price * item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-end mt-2">
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">Total: ${selectedOrder.total}</p>
                  </div>
                </div>
              </div>

              {/* Status and Tracking */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Estado y Seguimiento</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Estado Actual</p>
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status).bgColor} ${getStatusColor(selectedOrder.status).color}`}>
                        {getStatusColor(selectedOrder.status).text}
                      </div>
                    </div>
                    {selectedOrder.trackingNumber && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Número de Seguimiento</p>
                        <p className="text-sm text-gray-900 font-mono">{selectedOrder.trackingNumber}</p>
                      </div>
                    )}
                    {selectedOrder.estimatedDelivery && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">Entrega Estimada</p>
                        <p className="text-sm text-gray-900">
                          {new Date(selectedOrder.estimatedDelivery).toLocaleDateString('es')}
                        </p>
                      </div>
                    )}
                  </div>
                  {selectedOrder.notes && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700">Notas</p>
                      <p className="text-sm text-gray-900">{selectedOrder.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowOrderDetails(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cerrar
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                  Editar Pedido
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
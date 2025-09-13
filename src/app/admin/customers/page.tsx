"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Users, 
  Search, 
  Filter, 
  Eye,
  Edit,
  Mail,
  Phone,
  MapPin,
  ShoppingCart,
  Calendar,
  Star,
  Download,
  UserPlus,
  TrendingUp
} from "lucide-react";

// Sample customers data
const sampleCustomers = [
  {
    id: "CUST001",
    name: "María González",
    email: "maria@email.com",
    phone: "(787) 234-5678",
    address: "123 Calle Principal, San Juan, PR 00901",
    joinDate: "2023-08-15",
    totalOrders: 5,
    totalSpent: 1247,
    lastOrder: "2024-01-18",
    status: "active",
    rating: 4.8,
    notes: "Cliente frecuente, prefiere productos reacondicionados de alta gama",
    orders: [
      { id: "ORD001", date: "2024-01-18", total: 724, status: "delivered" },
      { id: "ORD005", date: "2023-12-10", total: 199, status: "delivered" },
      { id: "ORD009", date: "2023-11-22", total: 324, status: "delivered" }
    ],
    services: [
      { id: "SRV001", date: "2023-10-15", service: "Reparación iPhone", total: 99 },
      { id: "SRV003", date: "2023-09-20", service: "Consulta General", total: 0 }
    ]
  },
  {
    id: "CUST002",
    name: "Juan Pérez",
    email: "juan@email.com",
    phone: "(787) 123-4567",
    address: "456 Avenida Central, Bayamón, PR 00961",
    joinDate: "2023-11-02",
    totalOrders: 3,
    totalSpent: 1198,
    lastOrder: "2024-01-15",
    status: "active",
    rating: 4.9,
    notes: "Interesado en productos Apple, excelente comunicación",
    orders: [
      { id: "ORD002", date: "2024-01-15", total: 849, status: "shipped" },
      { id: "ORD008", date: "2023-12-28", total: 349, status: "delivered" }
    ],
    services: [
      { id: "SRV005", date: "2023-11-10", service: "Reparación Laptop", total: 149 }
    ]
  },
  {
    id: "CUST003",
    name: "Carlos Rivera",
    email: "carlos@email.com",
    phone: "(787) 345-6789",
    address: "789 Plaza Norte, Carolina, PR 00987",
    joinDate: "2023-09-20",
    totalOrders: 2,
    totalSpent: 484,
    lastOrder: "2024-01-10",
    status: "active",
    rating: 4.7,
    notes: "Prefiere tablets y accesorios, siempre pregunta por garantías",
    orders: [
      { id: "ORD003", date: "2024-01-10", total: 484, status: "delivered" }
    ],
    services: [
      { id: "SRV002", date: "2024-01-21", service: "Consulta General", total: 0 }
    ]
  },
  {
    id: "CUST004",
    name: "Ana Rodríguez",
    email: "ana@email.com",
    phone: "(787) 456-7890",
    address: "321 Calle Luna, Ponce, PR 00716",
    joinDate: "2023-12-05",
    totalOrders: 1,
    totalSpent: 0,
    lastOrder: null,
    status: "inactive",
    rating: null,
    notes: "Canceló su último pedido, seguimiento pendiente",
    orders: [
      { id: "ORD004", date: "2024-01-12", total: 399, status: "cancelled" }
    ],
    services: [
      { id: "SRV004", date: "2024-01-22", service: "Reparación Consola", total: 129 }
    ]
  }
];

export default function AdminCustomersPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [customers, setCustomers] = useState(sampleCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
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
      case "active":
        return { text: "Activo", color: "text-green-600", bgColor: "bg-green-100" };
      case "inactive":
        return { text: "Inactivo", color: "text-red-600", bgColor: "bg-red-100" };
      default:
        return { text: status, color: "text-gray-600", bgColor: "bg-gray-100" };
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const viewCustomerDetails = (customer: { id: string; name: string; email: string; phone: string; totalOrders: number; totalSpent: number; joinDate: string; rating: number; orders: any[]; services: any[]; notes: string; address: string }) => {
    setSelectedCustomer(customer);
    setShowCustomerDetails(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-PR', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
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
                <Users className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-semibold text-gray-900">Gestión de Clientes</h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                <Download className="h-5 w-5" />
                <span>Exportar</span>
              </button>
              
              <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                <UserPlus className="h-5 w-5" />
                <span>Nuevo Cliente</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Clientes</p>
                <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Clientes Activos</p>
                <p className="text-2xl font-bold text-gray-900">{customers.filter(c => c.status === "active").length}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Valor Promedio</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100">
                <ShoppingCart className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Satisfacción</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(customers.filter(c => c.rating).reduce((sum, c) => sum + c.rating, 0) / customers.filter(c => c.rating).length).toFixed(1)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-100">
                <Star className="h-6 w-6 text-yellow-600" />
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
                placeholder="Buscar por nombre, email o ID..."
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
                <option value="active">Activos</option>
                <option value="inactive">Inactivos</option>
              </select>
            </div>
          </div>
        </div>

        {/* Customers Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contacto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pedidos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Gastado
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
                {filteredCustomers.map((customer) => {
                  const status = getStatusColor(customer.status);
                  return (
                    <tr key={customer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                            <span className="text-blue-600 font-semibold text-sm">
                              {customer.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                            <div className="text-sm text-gray-500">ID: {customer.id}</div>
                            <div className="text-sm text-gray-500">
                              Cliente desde {new Date(customer.joinDate).toLocaleDateString('es')}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div className="flex items-center mb-1">
                            <Mail className="h-3 w-3 text-gray-400 mr-2" />
                            {customer.email}
                          </div>
                          <div className="flex items-center mb-1">
                            <Phone className="h-3 w-3 text-gray-400 mr-2" />
                            {customer.phone}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 text-gray-400 mr-2" />
                            <span className="text-xs text-gray-500 truncate max-w-32">
                              {customer.address.split(',')[1]}, {customer.address.split(',')[2]}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{customer.totalOrders}</div>
                        <div className="text-sm text-gray-500">
                          {customer.lastOrder ? 
                            `Último: ${new Date(customer.lastOrder).toLocaleDateString('es')}` :
                            'Sin pedidos'
                          }
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{formatCurrency(customer.totalSpent)}</div>
                        {customer.rating && (
                          <div className="flex items-center text-sm text-gray-500">
                            <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                            {customer.rating}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${status.bgColor} ${status.color}`}>
                          {status.text}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => viewCustomerDetails(customer)}
                            className="text-blue-600 hover:text-blue-900" 
                            title="Ver detalles"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900" title="Editar">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-purple-600 hover:text-purple-900" title="Enviar email">
                            <Mail className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredCustomers.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No se encontraron clientes</p>
              <p className="text-gray-500">Intenta ajustar tus filtros de búsqueda</p>
            </div>
          )}
        </div>
      </div>

      {/* Customer Details Modal */}
      {showCustomerDetails && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedCustomer.name}</h3>
                  <p className="text-gray-600">Cliente ID: {selectedCustomer.id}</p>
                </div>
                <button
                  onClick={() => setShowCustomerDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Información Personal</h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-3" />
                      <span className="text-sm text-gray-900">{selectedCustomer.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-3" />
                      <span className="text-sm text-gray-900">{selectedCustomer.phone}</span>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 text-gray-400 mr-3 mt-0.5" />
                      <span className="text-sm text-gray-900">{selectedCustomer.address}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-3" />
                      <span className="text-sm text-gray-900">
                        Cliente desde {new Date(selectedCustomer.joinDate).toLocaleDateString('es')}
                      </span>
                    </div>
                  </div>

                  {selectedCustomer.notes && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Notas</h4>
                      <div className="bg-yellow-50 rounded-lg p-3">
                        <p className="text-sm text-gray-700">{selectedCustomer.notes}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Estadísticas</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">{selectedCustomer.totalOrders}</div>
                      <div className="text-xs text-gray-600">Pedidos Totales</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">{formatCurrency(selectedCustomer.totalSpent)}</div>
                      <div className="text-xs text-gray-600">Total Gastado</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">{selectedCustomer.orders.length + selectedCustomer.services.length}</div>
                      <div className="text-xs text-gray-600">Interacciones</div>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-yellow-600">
                        {selectedCustomer.rating ? selectedCustomer.rating.toFixed(1) : 'N/A'}
                      </div>
                      <div className="text-xs text-gray-600">Satisfacción</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order History */}
              <div className="mt-8">
                <h4 className="text-sm font-medium text-gray-900 mb-4">Historial de Pedidos</h4>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedCustomer.orders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-4 py-2 font-medium text-gray-900">{order.id}</td>
                          <td className="px-4 py-2 text-gray-600">{new Date(order.date).toLocaleDateString('es')}</td>
                          <td className="px-4 py-2 text-gray-900">{formatCurrency(order.total)}</td>
                          <td className="px-4 py-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {selectedCustomer.services.map((service) => (
                        <tr key={service.id}>
                          <td className="px-4 py-2 font-medium text-gray-900">{service.id}</td>
                          <td className="px-4 py-2 text-gray-600">{new Date(service.date).toLocaleDateString('es')}</td>
                          <td className="px-4 py-2 text-gray-900">{service.total === 0 ? 'Gratis' : formatCurrency(service.total)}</td>
                          <td className="px-4 py-2">
                            <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                              Servicio
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowCustomerDetails(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cerrar
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                  Editar Cliente
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
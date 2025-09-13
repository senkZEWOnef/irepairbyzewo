"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Calendar,
  BarChart3,
  PieChart,
  Download,
  Filter,
  RefreshCw,
  Star,
  Package,
  Clock
} from "lucide-react";

// Sample analytics data
const sampleAnalytics = {
  revenue: {
    total: 15750,
    growth: 12.5,
    thisMonth: 4250,
    lastMonth: 3800,
    dailyData: [
      { date: "2024-01-01", amount: 125 },
      { date: "2024-01-02", amount: 200 },
      { date: "2024-01-03", amount: 175 },
      { date: "2024-01-04", amount: 300 },
      { date: "2024-01-05", amount: 225 },
      { date: "2024-01-06", amount: 400 },
      { date: "2024-01-07", amount: 350 },
    ]
  },
  orders: {
    total: 89,
    growth: 8.2,
    thisMonth: 28,
    lastMonth: 24
  },
  customers: {
    total: 156,
    growth: 15.3,
    new: 23,
    returning: 45
  },
  products: {
    sold: 145,
    topSelling: [
      { name: "iPhone 13 Pro - Reacondicionado", sold: 25, revenue: 17475 },
      { name: "MacBook Air M1", sold: 18, revenue: 15282 },
      { name: "Samsung Galaxy Tab S8", sold: 15, revenue: 6735 },
      { name: "PlayStation 5", sold: 12, revenue: 4788 },
      { name: "AirPods Pro", sold: 28, revenue: 5012 }
    ]
  },
  services: {
    total: 67,
    revenue: 8450,
    mostRequested: [
      { name: "Reparación de iPhone", count: 23, revenue: 2277 },
      { name: "Reparación de Laptop", count: 18, revenue: 2682 },
      { name: "Reparación de Tableta", count: 12, revenue: 948 },
      { name: "Reparación de Consola", count: 9, revenue: 1161 },
      { name: "Consulta General", count: 5, revenue: 0 }
    ]
  },
  satisfaction: {
    average: 4.7,
    totalReviews: 234,
    ratings: [
      { stars: 5, count: 145, percentage: 62 },
      { stars: 4, count: 67, percentage: 29 },
      { stars: 3, count: 15, percentage: 6 },
      { stars: 2, count: 5, percentage: 2 },
      { stars: 1, count: 2, percentage: 1 }
    ]
  }
};

export default function AdminAnalyticsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("month"); // "week", "month", "quarter", "year"
  const [analytics, setAnalytics] = useState(sampleAnalytics);
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-PR', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando analytics...</p>
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
                <BarChart3 className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-semibold text-gray-900">Analytics y Reportes</h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="week">Esta Semana</option>
                <option value="month">Este Mes</option>
                <option value="quarter">Este Trimestre</option>
                <option value="year">Este Año</option>
              </select>
              
              <button className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
                <RefreshCw className="h-5 w-5" />
                <span>Actualizar</span>
              </button>

              <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                <Download className="h-5 w-5" />
                <span>Exportar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ingresos Totales</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(analytics.revenue.total)}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600 font-medium">
                {formatPercentage(analytics.revenue.growth)}
              </span>
              <span className="text-sm text-gray-500 ml-2">vs mes anterior</span>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pedidos</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.orders.total}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600 font-medium">
                {formatPercentage(analytics.orders.growth)}
              </span>
              <span className="text-sm text-gray-500 ml-2">vs mes anterior</span>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Clientes</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.customers.total}</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-100">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600 font-medium">
                {formatPercentage(analytics.customers.growth)}
              </span>
              <span className="text-sm text-gray-500 ml-2">vs mes anterior</span>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Productos Vendidos</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.products.sold}</p>
              </div>
              <div className="p-3 rounded-lg bg-orange-100">
                <Package className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Selling Products */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Productos Más Vendidos</h3>
              <PieChart className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {analytics.products.topSelling.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white ${
                      index === 0 ? 'bg-yellow-500' : 
                      index === 1 ? 'bg-gray-400' : 
                      index === 2 ? 'bg-orange-600' : 'bg-gray-300'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.sold} vendidos</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{formatCurrency(product.revenue)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Most Requested Services */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Servicios Más Solicitados</h3>
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {analytics.services.mostRequested.map((service, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white ${
                      index === 0 ? 'bg-blue-500' : 
                      index === 1 ? 'bg-purple-500' : 
                      index === 2 ? 'bg-green-500' : 'bg-gray-400'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{service.name}</p>
                      <p className="text-xs text-gray-500">{service.count} servicios</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      {service.revenue === 0 ? 'Gratis' : formatCurrency(service.revenue)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer Satisfaction */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Satisfacción del Cliente</h3>
              <Star className="h-5 w-5 text-yellow-400" />
            </div>
            
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-gray-900">{analytics.satisfaction.average}</div>
              <div className="text-sm text-gray-600">de 5.0 estrellas</div>
              <div className="text-xs text-gray-500">{analytics.satisfaction.totalReviews} reseñas totales</div>
            </div>

            <div className="space-y-3">
              {analytics.satisfaction.ratings.map((rating, index) => (
                <div key={rating.stars} className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-gray-600">{rating.stars}</span>
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${rating.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 w-8">{rating.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Desglose de Ingresos</h3>
              <DollarSign className="h-5 w-5 text-green-500" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900">Productos</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{formatCurrency(analytics.revenue.total - analytics.services.revenue)}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900">Servicios</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{formatCurrency(analytics.services.revenue)}</span>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-900">Total</span>
                  <span className="text-lg font-bold text-gray-900">{formatCurrency(analytics.revenue.total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Acciones Rápidas</h3>
            
            <div className="space-y-3">
              <Link
                href="/admin/products"
                className="block w-full p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Package className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-900">Gestionar Inventario</span>
                </div>
              </Link>

              <Link
                href="/admin/orders"
                className="block w-full p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <ShoppingCart className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-900">Ver Pedidos</span>
                </div>
              </Link>

              <Link
                href="/admin/bookings"
                className="block w-full p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium text-gray-900">Gestionar Citas</span>
                </div>
              </Link>

              <button className="w-full p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <Download className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900">Generar Reporte</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
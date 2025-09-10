import Link from "next/link";
import { Smartphone, Laptop, Wrench, ShoppingBag, Calendar, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
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
                Inicio
              </Link>
              <Link href="/services" className="text-gray-700 hover:text-blue-600">
                Servicios
              </Link>
              <Link href="/shop" className="text-gray-700 hover:text-blue-600">
                Tienda
              </Link>
              <Link href="/booking" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Reservar Cita
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Reparación Profesional de Electrónicos
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Servicios expertos de reparación para teléfonos, laptops y más. Electrónicos reacondicionados de calidad a la venta.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/booking" 
                className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
              >
                <Calendar className="inline mr-2" size={20} />
                Reservar Consulta
              </Link>
              <Link 
                href="/shop" 
                className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                <ShoppingBag className="inline mr-2" size={20} />
                Ver Productos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestros Servicios</h2>
            <p className="text-lg text-gray-600">Servicios profesionales de reparación en los que puedes confiar</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <Smartphone className="mx-auto mb-4 text-blue-600" size={48} />
              <h3 className="text-xl font-semibold mb-3">Reparación de Teléfonos</h3>
              <p className="text-gray-600 mb-4">Cambio de pantalla, problemas de batería, daños por agua y más</p>
              <p className="text-2xl font-bold text-blue-600">Desde $49</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <Laptop className="mx-auto mb-4 text-blue-600" size={48} />
              <h3 className="text-xl font-semibold mb-3">Reparación de Laptops</h3>
              <p className="text-gray-600 mb-4">Reparaciones de hardware, problemas de software, mejoras y mantenimiento</p>
              <p className="text-2xl font-bold text-blue-600">Desde $99</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <Wrench className="mx-auto mb-4 text-blue-600" size={48} />
              <h3 className="text-xl font-semibold mb-3">Electrónicos Generales</h3>
              <p className="text-gray-600 mb-4">Tabletas, consolas de juegos y otros dispositivos electrónicos</p>
              <p className="text-2xl font-bold text-blue-600">Desde $79</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Por Qué Elegir iRepair?</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <Star className="mx-auto mb-4 text-yellow-500" size={48} />
              <h3 className="text-lg font-semibold mb-2">Técnicos Expertos</h3>
              <p className="text-gray-600">Profesionales certificados con años de experiencia</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Servicio Rápido</h3>
              <p className="text-gray-600">Mayoría de reparaciones completadas en 24-48 horas</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Garantía de Calidad</h3>
              <p className="text-gray-600">Garantía de 90 días en todas las reparaciones</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Precios Justos</h3>
              <p className="text-gray-600">Tarifas competitivas sin cargos ocultos</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para Comenzar?</h2>
          <p className="text-xl mb-8">Reserva tu consulta hoy o navega nuestros productos reacondicionados de calidad</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/booking" 
              className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
            >
              Agendar Cita
            </Link>
            <Link 
              href="/shop" 
              className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Ver Productos
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">iRepair</h3>
            <p className="text-gray-400 mb-4">Reparación profesional de electrónicos y ventas</p>
            <p className="text-gray-400">© 2024 iRepair. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

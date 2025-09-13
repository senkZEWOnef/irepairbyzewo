import Link from "next/link";
import { Smartphone, Laptop, Wrench, ShoppingBag, Calendar, Star, Zap, Shield, Clock } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="w-12 h-12 rounded-xl overflow-hidden ring-2 ring-blue-500/30 group-hover:ring-blue-400 transition-all duration-300">
                  <img 
                    src="/images/gallery/logo.png" 
                    alt="iRepair Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-3xl font-black bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
                  iRepair
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-8">
              <Link href="/services" className="text-slate-200 hover:text-cyan-300 font-semibold text-lg transition-all duration-300 hover:drop-shadow-lg relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-cyan-300 hover:after:w-full after:transition-all after:duration-300">
                Servicios
              </Link>
              <Link href="/shop" className="text-slate-200 hover:text-cyan-300 font-semibold text-lg transition-all duration-300 hover:drop-shadow-lg relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-cyan-300 hover:after:w-full after:transition-all after:duration-300">
                Tienda
              </Link>
              <Link href="/booking" className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 ring-2 ring-cyan-400/20 hover:ring-cyan-300/40">
                Reservar Cita
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img 
            src="/images/store/local.png" 
            alt="iRepair Store" 
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/70 to-indigo-900/80"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/20 text-white drop-shadow-lg">
                ✨ Expertos en Reparación Electrónica
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-white drop-shadow-2xl">
              Reparación 
              <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent drop-shadow-xl">
                Profesional
              </span>
              <br />de Electrónicos
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-white leading-relaxed drop-shadow-lg">
              Servicios expertos de reparación para teléfonos, laptops y más. 
              <span className="text-yellow-200 font-semibold">Electrónicos reacondicionados de calidad</span> a la venta.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link 
                href="/booking" 
                className="group bg-white text-slate-900 px-8 py-4 rounded-full font-semibold hover:bg-slate-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center"
              >
                <Calendar className="mr-3 group-hover:rotate-12 transition-transform duration-300" size={24} />
                Reservar Consulta Gratis
              </Link>
              <Link 
                href="/shop" 
                className="group border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-slate-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
              >
                <ShoppingBag className="mr-3 group-hover:scale-110 transition-transform duration-300" size={24} />
                Explorar Productos
              </Link>
            </div>
            
            {/* Trust badges */}
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-80">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-medium">Garantía 90 Días</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span className="text-sm font-medium">Servicio Rápido</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 fill-current" />
                <span className="text-sm font-medium">Técnicos Certificados</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-6">
              NUESTROS SERVICIOS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Reparaciones de 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Calidad</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Servicios profesionales de reparación en los que puedes confiar, con garantía y técnicos certificados</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Smartphone className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Reparación de Teléfonos</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">Cambio de pantalla, problemas de batería, daños por agua y más</p>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Desde $49</p>
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Laptop className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Reparación de Laptops</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">Reparaciones de hardware, problemas de software, mejoras y mantenimiento</p>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Desde $99</p>
                <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center group-hover:bg-purple-100 transition-colors duration-300">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
            
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100">
              <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Wrench className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Electrónicos Generales</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">Tabletas, consolas de juegos y otros dispositivos electrónicos</p>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Desde $79</p>
                <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center group-hover:bg-indigo-100 transition-colors duration-300">
                  <Calendar className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-semibold mb-6">
              NUESTRAS VENTAJAS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              ¿Por Qué Elegir 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">iRepair?</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Nos destacamos por nuestra calidad, rapidez y compromiso con cada cliente</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group text-center">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <Star className="text-white" size={36} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Técnicos Expertos</h3>
              <p className="text-slate-600 leading-relaxed">Profesionales certificados con años de experiencia en reparaciones</p>
            </div>
            
            <div className="group text-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <Zap className="text-white" size={36} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Servicio Rápido</h3>
              <p className="text-slate-600 leading-relaxed">Mayoría de reparaciones completadas en 24-48 horas</p>
            </div>
            
            <div className="group text-center">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <Shield className="text-white" size={36} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Garantía de Calidad</h3>
              <p className="text-slate-600 leading-relaxed">Garantía de 90 días en todas nuestras reparaciones</p>
            </div>
            
            <div className="group text-center">
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <div className="text-white text-2xl font-bold">$</div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Precios Justos</h3>
              <p className="text-slate-600 leading-relaxed">Tarifas competitivas y transparentes sin cargos ocultos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Repair Process & Store Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-6">
              NUESTRO PROCESO
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Reparación 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Profesional
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Desde el diagnóstico hasta la entrega, te mostramos cada paso de nuestro proceso de reparación
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Repair Process Images */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Diagnóstico Profesional</h3>
                    <p className="text-slate-600 mb-4">
                      Evaluamos minuciosamente tu dispositivo con equipos especializados para identificar el problema exacto.
                    </p>
                    <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                      <img 
                        src="/images/repairs/repair.png" 
                        alt="Equipos de diagnóstico profesional"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 border border-green-100">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Reparación Especializada</h3>
                    <p className="text-slate-600 mb-4">
                      Nuestros técnicos certificados realizan la reparación con herramientas de precisión y repuestos originales.
                    </p>
                    <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                      <img 
                        src="/images/repairs/repair2.png" 
                        alt="Proceso de reparación en curso"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Store and Final Process */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Pruebas de Calidad</h3>
                    <p className="text-slate-600 mb-4">
                      Verificamos que todo funcione perfectamente antes de entregarte tu dispositivo reparado.
                    </p>
                    <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                      <img 
                        src="/images/repairs/repair3.png" 
                        alt="Pruebas finales de calidad"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-6 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Visítanos en Nuestra Tienda</h3>
                <p className="text-slate-600 mb-4">
                  Ubicados en Puerto Rico, ofrecemos un ambiente profesional y acogedor para todas tus necesidades tecnológicas.
                </p>
                <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src="/images/store/local.png" 
                    alt="Nuestra tienda iRepair"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-slate-700">Abierto Ahora</span>
                  </div>
                  <Link 
                    href="/booking"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                  >
                    Agenda tu Cita
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-700 to-indigo-800"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="mb-8">
            <span className="inline-block px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-8 border border-white/30">
              🚀 COMIENZA AHORA
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            ¿Listo para 
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Comenzar?
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Reserva tu consulta gratuita hoy o explora nuestros productos reacondicionados de calidad premium
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="/booking" 
              className="group bg-white text-slate-900 px-10 py-5 rounded-full font-bold text-lg hover:bg-slate-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 flex items-center justify-center"
            >
              <Calendar className="mr-3 group-hover:rotate-12 transition-transform duration-300" size={24} />
              Agendar Consulta Gratis
            </Link>
            <Link 
              href="/shop" 
              className="group border-2 border-white/40 bg-white/10 backdrop-blur-sm text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-slate-900 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center"
            >
              <ShoppingBag className="mr-3 group-hover:scale-110 transition-transform duration-300" size={24} />
              Explorar Productos
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-2xl overflow-hidden">
                <img 
                  src="/images/gallery/logo.png" 
                  alt="iRepair Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                iRepair
              </span>
            </div>
            
            <p className="text-slate-400 mb-6 text-lg max-w-md mx-auto">
              Reparación profesional de electrónicos y ventas de calidad en Puerto Rico
            </p>
            
            <div className="flex justify-center items-center space-x-6 mb-8 text-slate-400">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span className="text-sm">Garantía 90 Días</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4" />
                <span className="text-sm">Técnicos Certificados</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Servicio Rápido</span>
              </div>
            </div>
            
            <div className="border-t border-slate-800 pt-8">
              <p className="text-slate-500 text-sm">© 2024 iRepair. Todos los derechos reservados. Hecho con ❤️ en Puerto Rico.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

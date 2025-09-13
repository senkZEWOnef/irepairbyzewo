import Link from "next/link";
import { Smartphone, Laptop, Tablet, Gamepad2, Wrench, Clock, Shield, Star } from "lucide-react";

const services = [
  {
    icon: Smartphone,
    title: "Reparación de Teléfonos",
    price: "Desde $49",
    duration: "30-60 minutos",
    description: "Servicios completos de reparación de teléfonos incluyendo cambio de pantalla, problemas de batería, daños por agua, reparación de puertos de carga y solución de problemas de software.",
    features: [
      "Cambio de Pantalla y Display",
      "Cambio de Batería",
      "Recuperación por Daño de Agua",
      "Reparación de Cámara y Altavoz",
      "Problemas de Software",
      "Reparación de Puerto de Carga"
    ]
  },
  {
    icon: Laptop,
    title: "Reparación de Laptops",
    price: "Desde $99",
    duration: "1-3 horas",
    description: "Servicios profesionales de reparación de laptops cubriendo reparaciones de hardware, problemas de software, mejoras y optimización de rendimiento.",
    features: [
      "Reparación de Pantalla y Bisagras",
      "Cambio de Teclado",
      "Recuperación de Disco Duro",
      "Mejoras de RAM y SSD",
      "Eliminación de Virus y Malware",
      "Optimización de Rendimiento"
    ]
  },
  {
    icon: Tablet,
    title: "Reparación de Tabletas",
    price: "Desde $79",
    duration: "45-90 minutos",
    description: "Servicios expertos de reparación de tabletas para todas las marcas principales incluyendo cambio de pantalla, problemas de batería y problemas de software.",
    features: [
      "Reparación de Pantalla Táctil",
      "Cambio de Batería",
      "Reparación de Puerto de Carga",
      "Problemas de Altavoz y Audio",
      "Restauración de Software",
      "Recuperación de Datos"
    ]
  },
  {
    icon: Gamepad2,
    title: "Reparación de Consolas",
    price: "Desde $89",
    duration: "1-2 horas",
    description: "Servicios de reparación de consolas de videojuegos para PlayStation, Xbox, Nintendo Switch y otros dispositivos de gaming.",
    features: [
      "Reparación de Controles",
      "Problemas de Lector de Discos",
      "Problemas de Sobrecalentamiento",
      "Reparación de Puerto HDMI",
      "Problemas de Fuente de Poder",
      "Actualizaciones de Firmware"
    ]
  },
  {
    icon: Wrench,
    title: "Electrónicos Generales",
    price: "Desde $59",
    duration: "30-120 minutos",
    description: "Servicios de reparación para varios dispositivos electrónicos incluyendo relojes inteligentes, auriculares y otros gadgets.",
    features: [
      "Reparación de Relojes Inteligentes",
      "Reparación de Auriculares",
      "Sistemas de Altavoces",
      "Equipo de Cámaras",
      "Electrodomésticos Pequeños",
      "Electrónicos Personalizados"
    ]
  }
];

const processSteps = [
  {
    step: "1",
    title: "Reservar Consulta",
    description: "Agenda una consulta gratuita para diagnosticar el problema de tu dispositivo"
  },
  {
    step: "2",
    title: "Diagnóstico Profesional",
    description: "Nuestros expertos examinan exhaustivamente tu dispositivo y proporcionan una cotización"
  },
  {
    step: "3",
    title: "Reparación de Calidad",
    description: "Usamos piezas originales y técnicas profesionales para reparaciones duraderas"
  },
  {
    step: "4",
    title: "Pruebas y Garantía",
    description: "Pruebas exhaustivas y garantía de 90 días en todas las reparaciones"
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2 md:space-x-3 group">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl overflow-hidden ring-2 ring-blue-500/30 group-hover:ring-blue-400 transition-all duration-300">
                  <img 
                    src="/images/gallery/logo.png" 
                    alt="iRepair Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-xl md:text-3xl font-black bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
                  iRepair
                </span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/services" className="text-cyan-300 font-semibold text-lg relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-cyan-300">
                Servicios
              </Link>
              <Link href="/shop" className="text-slate-200 hover:text-cyan-300 font-semibold text-lg transition-all duration-300 hover:drop-shadow-lg relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-cyan-300 hover:after:w-full after:transition-all after:duration-300">
                Tienda
              </Link>
              <Link href="/booking" className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-bold hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 ring-2 ring-cyan-400/20 hover:ring-cyan-300/40">
                Reservar Cita
              </Link>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center space-x-3">
              <Link href="/services" className="text-cyan-300 font-medium text-sm">
                Servicios
              </Link>
              <Link href="/shop" className="text-slate-200 hover:text-cyan-300 font-medium text-sm transition-colors">
                Tienda
              </Link>
              <Link href="/booking" className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-3 py-2 rounded-full font-bold text-xs transition-all duration-300">
                Reservar
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Servicios Profesionales de Reparación</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Técnicos expertos, piezas de calidad y tiempos de entrega rápidos para todas tus necesidades de reparación electrónica
          </p>
          <Link 
            href="/booking" 
            className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Cotización Gratis
          </Link>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestros Servicios</h2>
            <p className="text-lg text-gray-600">Soluciones integrales de reparación para todos tus dispositivos</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-start mb-6">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <service.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-2xl font-bold text-blue-600">{service.price}</span>
                      <span className="text-gray-600 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {service.duration}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <div className="space-y-2 mb-6">
                  <h4 className="font-semibold text-gray-900">Lo que reparamos:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
                
                <Link 
                  href="/booking" 
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-center block"
                >
                  Reservar Reparación
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestro Proceso de Reparación</h2>
            <p className="text-lg text-gray-600">Simple, transparente y profesional</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestras Garantías</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Shield className="mx-auto mb-4 text-green-600" size={48} />
              <h3 className="text-xl font-semibold mb-3">Garantía de 90 Días</h3>
              <p className="text-gray-600">Todas las reparaciones incluyen una garantía integral de 90 días para tu tranquilidad</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Star className="mx-auto mb-4 text-yellow-500" size={48} />
              <h3 className="text-xl font-semibold mb-3">Piezas de Calidad</h3>
              <p className="text-gray-600">Usamos solo piezas originales y de alta calidad para reparaciones duraderas</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Clock className="mx-auto mb-4 text-blue-600" size={48} />
              <h3 className="text-xl font-semibold mb-3">Servicio Rápido</h3>
              <p className="text-gray-600">Mayoría de reparaciones completadas en 24-48 horas para que vuelvas a funcionar</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para Reparar tu Dispositivo?</h2>
          <p className="text-xl mb-8">Obtén una consulta gratuita y cotización hoy</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/booking" 
              className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
            >
              Reservar Consulta
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
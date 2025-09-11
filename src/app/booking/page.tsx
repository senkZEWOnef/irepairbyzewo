"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Clock, User, Mail, Phone, MessageSquare } from "lucide-react";

const services = [
  { id: "smartphone", name: "Reparación de Teléfono", price: 49, duration: 30 },
  { id: "laptop", name: "Reparación de Laptop", price: 99, duration: 60 },
  { id: "tablet", name: "Reparación de Tableta", price: 79, duration: 45 },
  { id: "console", name: "Reparación de Consola", price: 89, duration: 60 },
  { id: "consultation", name: "Consulta General", price: 0, duration: 30 },
];

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleServiceSelect = (serviceId: string) => {
    setFormData({ ...formData, service: serviceId });
    setStep(2);
  };

  const handleDateSelect = (date: string) => {
    setFormData({ ...formData, date });
    setStep(3);
  };

  const handleTimeSelect = (time: string) => {
    setFormData({ ...formData, time });
    setStep(4);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Booking data:", formData);
      alert("¡Cita reservada exitosamente! Recibirás un correo de confirmación pronto.");
      setIsSubmitting(false);
      // Reset form or redirect
    }, 2000);
  };

  const selectedService = services.find(s => s.id === formData.service);

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
              <Link href="/shop" className="text-slate-700 hover:text-blue-600 font-medium transition-colors duration-200">
                Tienda
              </Link>
              <Link href="/booking" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Reservar Cita
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-6">
            SISTEMA DE CITAS
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Reserva tu 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Cita
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
            Sigue estos simples pasos para reservar tu consulta gratuita
          </p>
          
          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="flex items-center">
                  <div className={`relative w-12 h-12 rounded-2xl flex items-center justify-center font-semibold transition-all duration-300 ${
                    step >= num 
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg" 
                      : step === num - 1
                      ? "bg-blue-100 text-blue-600 animate-pulse"
                      : "bg-slate-100 text-slate-400"
                  }`}>
                    {num}
                    {step >= num && (
                      <div className="absolute inset-0 rounded-2xl animate-pulse-glow"></div>
                    )}
                  </div>
                  {num < 4 && <div className={`w-16 h-1 mx-2 rounded-full transition-all duration-500 ${
                    step > num ? "bg-gradient-to-r from-blue-600 to-purple-600" : "bg-slate-200"
                  }`} />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step 1: Service Selection */}
        {step === 1 && (
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-slate-900">
                Selecciona un Servicio
              </h2>
              <p className="text-slate-600">Elige el tipo de reparación que necesitas</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => handleServiceSelect(service.id)}
                  className="group relative bg-gradient-to-br from-white to-slate-50 border-2 border-slate-100 rounded-2xl p-6 cursor-pointer hover:border-blue-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover-lift"
                >
                  <div className="absolute top-4 right-4 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="font-bold text-xl text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{service.name}</h3>
                    <p className="text-slate-600 text-sm mb-3">Duración: {service.duration} minutos</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {service.price === 0 ? "Gratis" : `Desde $${service.price}`}
                    </p>
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-sm">→</span>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Date Selection */}
        {step === 2 && (
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-slate-900">
                Selecciona la Fecha
              </h2>
              <div className="bg-blue-50 rounded-2xl p-4 mb-6">
                <p className="text-slate-700">
                  Servicio: <span className="font-bold text-blue-600">{selectedService?.name}</span>
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
              {Array.from({ length: 14 }, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() + i + 1);
                const dateStr = date.toISOString().split('T')[0];
                const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                const dayName = date.toLocaleDateString('es', { weekday: 'short' });
                const monthName = date.toLocaleDateString('es', { month: 'short' });
                
                return (
                  <button
                    key={i}
                    onClick={() => !isWeekend && handleDateSelect(dateStr)}
                    disabled={isWeekend}
                    className={`group relative p-4 rounded-2xl text-center transition-all duration-300 ${
                      isWeekend 
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                        : "bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 hover:border-green-300 hover:shadow-lg transform hover:-translate-y-1 hover-lift cursor-pointer"
                    }`}
                  >
                    <div className="text-sm font-medium text-slate-600 mb-1">{dayName}</div>
                    <div className="text-2xl font-bold text-slate-900 mb-1">{date.getDate()}</div>
                    <div className="text-xs text-slate-500">{monthName}</div>
                    
                    {!isWeekend && (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    )}
                  </button>
                );
              })}
            </div>
            
            <div className="flex justify-between items-center">
              <button
                onClick={() => setStep(1)}
                className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors duration-200"
              >
                <span>←</span>
                <span>Volver a Servicios</span>
              </button>
              <div className="text-sm text-slate-500">
                * Los fines de semana no están disponibles
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Time Selection */}
        {step === 3 && (
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-slate-900">
                Selecciona la Hora
              </h2>
              <div className="bg-purple-50 rounded-2xl p-4 mb-6">
                <p className="text-slate-700">
                  Fecha: <span className="font-bold text-purple-600">{new Date(formData.date).toLocaleDateString('es', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => handleTimeSelect(time)}
                  className="group relative bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 rounded-2xl p-4 hover:border-purple-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover-lift"
                >
                  <div className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors duration-300">
                    {time}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Disponible
                  </div>
                  
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setStep(2)}
              className="flex items-center space-x-2 text-slate-600 hover:text-purple-600 transition-colors duration-200"
            >
              <span>←</span>
              <span>Volver a Fecha</span>
            </button>
          </div>
        )}

        {/* Step 4: Contact Information */}
        {step === 4 && (
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-slate-900">
                Información de Contacto
              </h2>
              <p className="text-slate-600">Completa tus datos para finalizar la reserva</p>
            </div>
            
            {/* Booking Summary Card */}
            <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
              <h3 className="font-bold text-lg mb-4 text-slate-900 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Resumen de tu Cita
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span className="text-slate-600">Servicio:</span> 
                    <span className="font-semibold text-slate-900">{selectedService?.name}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-slate-600">Fecha:</span> 
                    <span className="font-semibold text-slate-900">{new Date(formData.date).toLocaleDateString('es', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span className="text-slate-600">Hora:</span> 
                    <span className="font-semibold text-slate-900">{formData.time}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-slate-600">Duración:</span> 
                    <span className="font-semibold text-slate-900">{selectedService?.duration} min</span>
                  </p>
                </div>
              </div>
              {selectedService?.price && selectedService.price > 0 && (
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <p className="flex justify-between items-center">
                    <span className="text-slate-600">Precio desde:</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      ${selectedService.price}
                    </span>
                  </p>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Nombre Completo *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Número de Teléfono *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                      placeholder="(787) 123-4567"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Correo Electrónico *
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                    placeholder="tu@correo.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Notas Adicionales (Opcional)
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={4}
                    className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 resize-none"
                    placeholder="Describe el problema de tu dispositivo o cualquier solicitud específica..."
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center pt-6 gap-4">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors duration-200"
                >
                  <span>←</span>
                  <span>Volver a Hora</span>
                </button>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                    isSubmitting ? 'animate-pulse' : 'hover:from-blue-700 hover:to-purple-700'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Reservando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5" />
                      <span>Reservar Cita</span>
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
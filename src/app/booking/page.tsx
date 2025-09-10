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
    // TODO: Implement booking submission
    console.log("Booking data:", formData);
    alert("¡Cita reservada! Recibirás un correo de confirmación pronto.");
  };

  const selectedService = services.find(s => s.id === formData.service);

  return (
    <div className="min-h-screen bg-gray-50">
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

      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Reserva Tu Cita</h1>
          
          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= num ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"
                  }`}>
                    {num}
                  </div>
                  {num < 4 && <div className={`w-12 h-0.5 ${
                    step > num ? "bg-blue-600" : "bg-gray-300"
                  }`} />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step 1: Service Selection */}
        {step === 1 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Calendar className="mr-2" />
              Selecciona un Servicio
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => handleServiceSelect(service.id)}
                  className="border rounded-lg p-4 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <h3 className="font-semibold text-lg">{service.name}</h3>
                  <p className="text-gray-600">Duración: {service.duration} minutos</p>
                  <p className="text-blue-600 font-semibold">
                    {service.price === 0 ? "Gratis" : `Desde $${service.price}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Date Selection */}
        {step === 2 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Calendar className="mr-2" />
              Selecciona Fecha
            </h2>
            <p className="mb-4">Servicio: <span className="font-semibold">{selectedService?.name}</span></p>
            
            <div className="grid grid-cols-7 gap-2 mb-4">
              {/* Simple date picker - in production, use a proper calendar library */}
              {Array.from({ length: 14 }, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() + i + 1);
                const dateStr = date.toISOString().split('T')[0];
                const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                
                return (
                  <button
                    key={i}
                    onClick={() => handleDateSelect(dateStr)}
                    disabled={isWeekend}
                    className={`p-3 rounded-md text-center ${
                      isWeekend 
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-gray-100 hover:bg-blue-100 hover:text-blue-600"
                    }`}
                  >
                    <div className="text-sm">{date.toLocaleDateString('en', { weekday: 'short' })}</div>
                    <div className="font-semibold">{date.getDate()}</div>
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => setStep(1)}
              className="text-blue-600 hover:text-blue-800"
            >
              ← Volver a Servicios
            </button>
          </div>
        )}

        {/* Step 3: Time Selection */}
        {step === 3 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Clock className="mr-2" />
              Selecciona Hora
            </h2>
            <p className="mb-4">
              Fecha: <span className="font-semibold">{new Date(formData.date).toLocaleDateString()}</span>
            </p>
            
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => handleTimeSelect(time)}
                  className="p-3 border rounded-md hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  {time}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setStep(2)}
              className="text-blue-600 hover:text-blue-800"
            >
              ← Volver a Fecha
            </button>
          </div>
        )}

        {/* Step 4: Contact Information */}
        {step === 4 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <User className="mr-2" />
              Información de Contacto
            </h2>
            
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-2">Resumen de Cita</h3>
              <p><strong>Servicio:</strong> {selectedService?.name}</p>
              <p><strong>Fecha:</strong> {new Date(formData.date).toLocaleDateString()}</p>
              <p><strong>Hora:</strong> {formData.time}</p>
              <p><strong>Duración:</strong> {selectedService?.duration} minutos</p>
              {selectedService?.price && selectedService.price > 0 && (
                <p><strong>Precio desde:</strong> ${selectedService.price}</p>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Completo *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tu nombre completo"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correo Electrónico *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="tu@correo.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Número de Teléfono *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notas Adicionales (Opcional)
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe el problema de tu dispositivo o cualquier solicitud específica..."
                  />
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  ← Volver a Hora
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
                >
                  Reservar Cita
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
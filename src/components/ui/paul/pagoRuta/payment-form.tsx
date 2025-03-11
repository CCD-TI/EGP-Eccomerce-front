'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function PaymentForm() {
  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1120] to-[#0E1B37] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <button className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Regresar
        </button>

        {/* Progress Steps */}
        <div className="flex justify-center items-center gap-4 mb-12">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-cyan-400 text-black flex items-center justify-center text-xl font-bold shadow-[0_0_20px_rgba(34,211,238,0.5)]">
              1
            </div>
            <div className="ml-2">
              <p className="text-cyan-400 font-medium">Información</p>
              <p className="text-cyan-400 font-medium">de pago</p>
            </div>
          </div>
          <div className="flex-1 border-t-2 border-dashed border-cyan-400/30 max-w-[100px]" />
          <div className="flex items-center opacity-50">
            <div className="w-12 h-12 rounded-full border-2 border-white/50 text-white/50 flex items-center justify-center text-xl font-bold">
              2
            </div>
            <div className="ml-2">
              <p className="text-white/50 font-medium">Confirmación</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {/* Payment Form */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold">¿Cómo quieres pagar?</h2>
              <div className="flex items-center gap-2 text-white/80">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Pago 100% Seguro
              </div>
            </div>

            <div className="bg-[#0E1B37]/80 rounded-3xl p-6 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <p className="text-lg text-white/80 mb-4">Selecciona tu forma de pago</p>
                
                {/* Payment Method Selection */}
                <div className="flex items-center gap-4 p-4 rounded-xl border-2 border-cyan-400 bg-cyan-400/10">
                  <div className="w-5 h-5 rounded-full border-2 border-cyan-400 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-cyan-400" />
                  </div>
                  <span className="flex-1">Tarjeta de crédito / débito</span>
                  <div className="flex gap-2">
                    <Image
                      src="/visa.png"
                      alt="Visa"
                      width={40}
                      height={25}
                      className="h-6 w-auto object-contain"
                    />
                    <Image
                      src="/mastercard.png"
                      alt="Mastercard"
                      width={40}
                      height={25}
                      className="h-6 w-auto object-contain"
                    />
                    <Image
                      src="/amex.png"
                      alt="American Express"
                      width={40}
                      height={25}
                      className="h-6 w-auto object-contain"
                    />
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm text-white/60 mb-2">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-[#0B1120] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-cyan-400"
                      placeholder="Ejemplo123@gmail.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="cardNumber" className="block text-sm text-white/60 mb-2">
                      Número de tarjeta
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                      className="w-full bg-[#0B1120] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-cyan-400"
                      placeholder="1234 1234 1234 1234"
                    />
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label htmlFor="expiry" className="block text-sm text-white/60 mb-2">
                        Fecha de expiración
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={formData.expiryMonth}
                          onChange={(e) => setFormData({...formData, expiryMonth: e.target.value})}
                          className="flex-1 bg-[#0B1120] border border-white/10 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:border-cyan-400"
                        >
                          <option value="">m/d</option>
                          {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                            <option key={month} value={month}>{month.toString().padStart(2, '0')}</option>
                          ))}
                        </select>
                        <select
                          value={formData.expiryYear}
                          onChange={(e) => setFormData({...formData, expiryYear: e.target.value})}
                          className="flex-1 bg-[#0B1120] border border-white/10 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:border-cyan-400"
                        >
                          <option value="">Año</option>
                          {Array.from({length: 10}, (_, i) => new Date().getFullYear() + i).map(year => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="w-1/3">
                      <label htmlFor="cvv" className="block text-sm text-white/60 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        value={formData.cvv}
                        onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                        className="w-full bg-[#0B1120] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-cyan-400"
                        maxLength={4}
                      />
                    </div>
                  </div>
                </div>

                {/* Terms and Submit */}
                <div className="space-y-4">
                  <p className="text-sm text-white/60">
                    Al hacer clic en Completar compra, usted acepta los siguientes{' '}
                    <a href="#" className="text-cyan-400 underline hover:text-cyan-300">
                      Términos de servicio
                    </a>
                    .
                  </p>
                  <button
                    type="submit"
                    className="w-full bg-white text-black font-semibold rounded-full py-3 px-6 hover:bg-white/90 transition-colors"
                  >
                    Completar compra
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Course Summary */}
          <div className="lg:w-[450px]">
            <div className="bg-[#0E1B37]/80 rounded-3xl p-6 backdrop-blur-sm">
              <div className="flex gap-4 mb-6">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cZhnxkdXQpCnVXcZGwSJI2YqxBn2TZ.png"
                    alt="Course thumbnail"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-cyan-400 mb-2">
                    Nombre de ruta de aprendizaje 1
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      Ingeniería geológica aplicada a obras civiles y minera
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      Geomecánica minera
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      Control de operaciones mineras
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      Ventilación minera
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      Gestion de perforación y voladura en minería superficial y subterránea
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                <span className="text-lg">Total:</span>
                <span className="text-2xl font-bold">S/ 2,345.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


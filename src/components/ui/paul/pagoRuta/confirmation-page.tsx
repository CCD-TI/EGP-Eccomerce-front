'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1120] to-[#0E1B37] text-white p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Progress Steps */}
        <div className="flex justify-center items-center gap-4 mb-12">
          <div className="flex items-center opacity-50">
            <div className="w-12 h-12 rounded-full border-2 border-white/50 text-white/50 flex items-center justify-center text-xl font-bold">
              1
            </div>
            <div className="ml-2">
              <p className="text-white/50 font-medium">Información</p>
              <p className="text-white/50 font-medium">de pago</p>
            </div>
          </div>
          <div className="flex-1 border-t-2 border-dashed border-cyan-400/30 max-w-[100px]" />
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-cyan-400 text-black flex items-center justify-center text-xl font-bold shadow-[0_0_20px_rgba(34,211,238,0.5)]">
              2
            </div>
            <div className="ml-2">
              <p className="text-cyan-400 font-medium">Confirmación</p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CheckCircle2 className="w-8 h-8 text-cyan-400" />
            <h1 className="text-2xl font-bold">Compra Exitosa</h1>
          </div>
          <p className="text-white/80">
            Hemos enviado un correo de confirmación a{' '}
            <span className="text-cyan-400">Ejemplo1234@gmail.com</span>
          </p>
        </div>

        <h2 className="text-2xl font-bold text-center mb-8">
          ¡Ya puedes disfrutar del contenido de tu ruta!
        </h2>

        {/* Course Card */}
        <div className="bg-[#0E1B37]/80 rounded-3xl p-6 backdrop-blur-sm mb-8">
          <div className="flex gap-4 mb-6">
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-igBxcyVYid2pCKA5k2nxa1AgtDeri1.png"
                alt="Course thumbnail"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
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
            <span className="text-lg">Total cobrado:</span>
            <span className="text-2xl font-bold">S/ 2,345.00</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/mis-cursos"
            className="inline-flex justify-center items-center px-8 py-3 rounded-full bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition-colors"
          >
            Ir a Mis Cursos
          </Link>
          <Link
            href="/rutas"
            className="inline-flex justify-center items-center px-8 py-3 rounded-full border-2 border-cyan-400 text-cyan-400 font-semibold hover:bg-cyan-400/10 transition-colors"
          >
            Conocer mas rutas
          </Link>
        </div>
      </div>
    </div>
  )
}


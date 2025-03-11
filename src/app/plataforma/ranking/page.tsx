'use client'

import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../layout'
import axios from 'axios'
import { environment } from '@/environments/environment'

export default function StudentRanking() {
  // Estado para el término de búsqueda y para indicar si se ha presionado el botón buscar
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTerm, setFilterTerm] = useState('')

  const [searchTriggered, setSearchTriggered] = useState(false)
  // Estado para almacenar la data completa de ranking (tipo any para este ejemplo)
  const [rankingData, setRankingData] = useState<any[]>([])

  // Configuración de axios para consumir la API
  const api = axios.create({
    baseURL: environment.baseUrl,
    headers: { 'Content-Type': 'application/json' },
  })

  // Cambiamos el valor global
  const { setNombreGlobal } = useGlobalContext()
  setNombreGlobal('ranking')

  // useEffect para cargar la data al montar el componente
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await api.post('/inicio/listaralumnospuntajev2', {})
        // Se asume que la respuesta trae la data en response.data.data
        let data: any[] = response.data.data[0]

        // Ordenamos de mayor a menor puntaje (asumiendo que la consulta ya lo hace, pero por si acaso)
        data.sort((a, b) => b.Puntaje - a.Puntaje)

        // Asignamos la posición (ranking) a cada usuario y definimos el avatar a partir de "RutaImagenPerfil"
        data = data.map((student, index) => ({
          ...student,
          rank: index + 1,
          avatar: student.RutaImagenPerfil || '/placeholder.svg?height=50&width=50',
        }))

        // Asignamos los íconos de medalla a los 3 primeros
        if (data.length > 0) {
          data[0].medals = '🏆'
        }
        if (data.length > 1) {
          data[1].medals = '🥈'
        }
        if (data.length > 2) {
          data[2].medals = '🥉'
        }

        setRankingData(data)
      } catch (error) {
        console.error('Error cargando los datos:', error)
      }
    }
    loadData()
  }, [])

  // Para el podio: si existen al menos 3 usuarios, los reordenamos de modo que
  // el segundo (índice 1) quede a la izquierda, el primero (índice 0) en el centro y el tercero (índice 2) a la derecha.
  const podiumStudents =
    rankingData.length >= 3 ? [rankingData[1], rankingData[0], rankingData[2]] : []

  // Determinamos qué estudiantes se mostrarán en la tabla:
  // - Si se ha activado el buscador y el término no está vacío se filtra sobre toda la data.
  // - Si no, se muestran por defecto los usuarios del 4° al 10° puesto.
  const tableStudents: any[] =
    filterTerm !== ''
      ? rankingData.filter(
        (student) =>
          student.NombreCompleto?.toLowerCase().includes(filterTerm.toLowerCase()) ||
          student.Usuario?.toLowerCase().includes(filterTerm.toLowerCase()) ||
          String(student.Puntaje).includes(filterTerm)
      )
      : rankingData.slice(3, 10)

  // Handler para el botón de búsqueda
  const handleSearch = () => {
    setFilterTerm(searchTerm.trim())
  }

  return (
    <div className=" bg-[#0F1729] p-6">
      <div className="mx-auto h-full max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">🏆 Ranking de Campeones 🏆</h2>
          <p className="text-blue-400">¡Compite por la gloria!</p>
        </div>

        {/* Sección del Podio */}
        <div className="relative h-[500px] mb-12">
          {podiumStudents.length === 3 && (
            <>
              {/* Segundo Lugar (izquierda) */}
              <div className="absolute left-4 bottom-0 w-[30%] flex flex-col items-center animate-bounce-slow">
                <div className="relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-4xl">
                    {podiumStudents[0].medals}
                  </div>
                  <img
                    src={podiumStudents[0].avatar}
                    alt=""
                    className="w-20 h-20 rounded-full border-4 border-[#C0C0C0] shadow-lg shadow-blue-500/50"
                  />
                </div>
                <div className="text-white font-bold mt-2 text-center">
                  <div className="text-lg">
                    {podiumStudents[0].NombreCompleto.toLowerCase().split(" ").map((palabra: any) =>
                      palabra.charAt(0).toUpperCase() + palabra.slice(1)
                    ).join(" ") || podiumStudents[0].Usuario}
                  </div>
                  <div className="text-[#C0C0C0]">{podiumStudents[0].Puntaje} pts</div>
                </div>
                <div className="h-[160px] w-full bg-gradient-to-t from-[#C0C0C0] to-[#E0E0E0] rounded-t-lg mt-4" />
              </div>

              {/* Primer Lugar (centro) */}
              <div
                className="absolute left-[35%] transform -translate-x-1/2 bottom-0 w-[30%] flex flex-col items-center z-10 animate-bounce-slow"
                style={{ animationDelay: '0.1s' }}
              >
                <div className="relative">
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-5xl animate-pulse">
                    {podiumStudents[1].medals}
                  </div>
                  <img
                    src={podiumStudents[1].avatar}
                    alt=""
                    className="w-24 h-24 rounded-full border-4 border-yellow-400 shadow-lg shadow-yellow-500/50"
                  />
                  <div className="absolute -top-2 -right-2 text-2xl">👑</div>
                </div>
                <div className="text-white font-bold mt-2 text-center">
                  <div className="text-xl">
                    {podiumStudents[1].NombreCompleto.toLowerCase().split(" ").map((palabra: any) =>
                      palabra.charAt(0).toUpperCase() + palabra.slice(1)
                    ).join(" ") || podiumStudents[1].Usuario}
                  </div>
                  <div className="text-yellow-400">{podiumStudents[1].Puntaje} pts</div>
                </div>
                <div className="h-[200px] w-full bg-gradient-to-t from-yellow-400 to-yellow-300 rounded-t-lg mt-4" />
              </div>

              {/* Tercer Lugar (derecha) */}
              <div
                className="absolute right-4 bottom-0 w-[30%] flex flex-col items-center animate-bounce-slow"
                style={{ animationDelay: '0.2s' }}
              >
                <div className="relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-4xl">
                    {podiumStudents[2].medals}
                  </div>
                  <img
                    src={podiumStudents[2].avatar}
                    alt=""
                    className="w-20 h-20 rounded-full border-4 border-[#CD7F32] shadow-lg shadow-orange-500/50"
                  />
                </div>
                <div className="text-white font-bold mt-2 text-center">
                  <div className="text-lg">
                    {podiumStudents[2].NombreCompleto.toLowerCase().split(" ").map((palabra: any) =>
                      palabra.charAt(0).toUpperCase() + palabra.slice(1)
                    ).join(" ") || podiumStudents[2].Usuario}
                  </div>
                  <div className="text-[#CD7F32]">{podiumStudents[2].Puntaje} pts</div>
                </div>
                <div className="h-[120px] w-full bg-gradient-to-t from-[#CD7F32] to-[#DFA878] rounded-t-lg mt-4" />
              </div>
            </>
          )}
        </div>

        {/* Barra de Búsqueda */}
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Busca tu nombre aquí..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-l-full bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 rounded-r-full bg-blue-500 text-white font-bold hover:bg-blue-600 transition-colors"
          >
            Buscar
          </button>
        </div>

        {/* Tabla de Ranking */}
        <div className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">
            🌟 Tabla de Clasificación 🌟
          </h3>
          <div className="space-y-4">
            {tableStudents.map((student: any) => (
              <div
                key={student.IdUsuario}
                className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-slate-700/40 to-slate-600/40 hover:from-slate-600/60 hover:to-slate-500/60 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex max-md:flex-col items-center space-x-4">
                  <div className='flex max-md:w-full items-center max-md:mb-2 gap-4'>
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-lg shadow-lg shadow-blue-500/50">
                    {student.rank}
                  </div>
                  <img
                    src={student.avatar}
                    alt=""
                    className="w-12 h-12 rounded-full bg-slate-600 border-2 border-blue-400 shadow-md"
                  />
                  </div>
                  <span className="text-white font-medium text-lg max-md:text-sm">
                    {student.NombreCompleto.toLowerCase().split(" ").map((palabra: any) =>
                      palabra.charAt(0).toUpperCase() + palabra.slice(1)
                    ).join(" ") || student.Usuario}
                  </span>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="flex flex-col items-end">
                    <span className="text-slate-400 text-sm">Puntaje:</span>
                    <span className="text-blue-400 font-bold text-xl">{student.Puntaje}</span>
                  </div>
                  {/* Si en algún momento tienes información sobre la tendencia, la puedes mostrar aquí */}
                  {student.trend && (
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-700">
                      {student.trend === 'up' && (
                        <div className="text-emerald-500 text-2xl">↑</div>
                      )}
                      {student.trend === 'down' && (
                        <div className="text-rose-500 text-2xl">↓</div>
                      )}
                      {student.trend === 'same' && (
                        <div className="text-slate-400 text-2xl">→</div>
                      )}
                    </div>
                  )}
                  {student.medals && (
                    <div className="text-3xl">{student.medals}</div>
                  )}
                </div>
              </div>
            ))}
            {tableStudents.length === 0 && (
              <div className="text-center text-white">
                No se encontró ningún usuario con ese nombre.
              </div>
            )}
          </div>
        </div>

        <style jsx global>{`
          @keyframes bounce-slow {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          .animate-bounce-slow {
            animation: bounce-slow 3s infinite;
          }
        `}</style>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'

import Progress from "@/components/ui/bruno/ProgressEva"
import { LogOut, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { environment } from '@/environments/environment'
import { useCourseStore } from '@/context/cursodetalle'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function Component() {
  const api = axios.create({
    baseURL: environment.baseUrl,
    headers: { "Content-Type": "application/json" },
  });
  const router = useRouter();

  const { data: session } = useSession();
 
  const weekDays = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date(2023, 6, 30)) // July 30, 2023
  

  const getWeekDates = (startDate: string | number | Date) => {
    const dates = [];
    
    // Asegurarse de que startDate sea un objeto Date
    const start = typeof startDate === 'string' || typeof startDate === 'number'
      ? new Date(startDate)
      : startDate;

    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      dates.push(date);
    }

    return dates;
  }
  const currentWeek = getWeekDates(currentWeekStart)

  const events = [
    { date: new Date(2023, 7, 1), type: "CLASE", label: "Clase" },
    { date: new Date(2023, 7, 3), type: "EXAMEN", label: "Examen" },
  ]
  const navigateWeek = (direction: string) => {
    const newDate = new Date(currentWeekStart)
    newDate.setDate(currentWeekStart.getDate() + (direction === 'next' ? 7 : -7))
    setCurrentWeekStart(newDate)
  }

  const [datacursos, setdatacursos] = useState([]);

  useEffect(() => {
    if (session?.user) {
      const loadData = async () => {
        try {
          const responseTipoDocumento = await api.post("/inicio/listarcursosplataformaxusuario", {
            fusuario_id: session?.user.uid
          });
          setdatacursos(responseTipoDocumento.data.data[0])

        } catch (error) {
          console.error("Error cargando los datos:", error);
        }
      };
      loadData();
    }

  }, [session?.user.Usuario, api]);



  const setCourseData = useCourseStore((state) => state.setCourseData); // Obtener la función para actualizar el estado

const handleCourseNavigation = (IdModelo:any,Modelo:any,Clasificacion:any,IdProducto:any,IdTipoProducto:any) => {
  // Almacenar los datos en el estado de Zustand
  setCourseData(Clasificacion, IdModelo,IdProducto,IdTipoProducto);
  // Luego, navegar a la página de detalles
  router.push(`mis-cursos/${Modelo}`);
};

  return (
    <div className="w-[90%] max-sm:w-full container mx-auto p-4  max-sm:pt-16 space-y-8">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          Hola, <span className="text-primary text-xl">{session?.user.Usuario}</span>
        </h1>
        <Button variant="light">
          <LogOut className="h-4 w-4 mr-2" />
          Cerrar Sesión
        </Button>
      </header>

      <section aria-labelledby="courses-heading">
        <h2 id="courses-heading" className="text-xl font-semibold mb-4">Mis Cursos y Diplomas</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {datacursos.map((item: any, index) => (

              <div key={index} onClick={() => handleCourseNavigation(item.IdModelo, item.Modelo, item.Clasificacion,item.IdProducto,item.IdTipoProducto)} className="border rounded-lg shadow-md overflow-hidden relative">
                <Image
                  src={environment.baseUrlStorage + item.RutaImagen}
                  alt={`Imagen del curso:`}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 space-y-4">
                  <h3 className="font-medium line-clamp-2">{item.Modelo}</h3>
                  <Progress value={50} aria-label={`Progreso del curso: ${50}%`} />
                
                </div>
                <h1 className='p-2 px-4 bg-blue-1 text-white absolute top-3 rounded-lg right-3'>{item.Clasificacion}</h1>
              </div>
        
          ))}
        </div>
        <Link href={'mis-cursos'}>
        <Button variant="solid"  className="mt-4 text-primary bg-dark-1 text-white">
          Ver todos mis cursos
        </Button>
        </Link>
      
      </section>

      <section aria-labelledby="activities-heading">
        <h2 id="activities-heading" className="text-xl font-semibold mb-4">Mis actividades semanales</h2>
        <div className="border rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-100 p-4 border-b">
            <div className="flex justify-between items-center">
              <Button variant="light" onClick={() => navigateWeek('prev')} aria-label="Semana anterior">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-lg font-semibold">
                {`${currentWeek[0].toLocaleDateString('es-ES', { month: 'long', day: 'numeric' })} - ${currentWeek[6].toLocaleDateString('es-ES', { month: 'long', day: 'numeric' })}`}
              </h3>
              <Button variant="light" onClick={() => navigateWeek('next')} aria-label="Semana siguiente">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-7 gap-1">
              {weekDays.map((day) => (
                <div key={day} className="text-center text-sm font-medium p-2">
                  {day}
                </div>
              ))}
              {currentWeek.map((date, index) => {
                const event = events.find((e) => e.date.toDateString() === date.toDateString())
                return (
                  <div
                    key={index}
                    className={`text-center p-2 rounded-md ${event
                      ? event.type === "CLASE"
                        ? "bg-primary/10 text-primary"
                        : "bg-dark-1 text-white"
                      : "border"
                      }`}
                  >
                    <div className="text-sm">{date.getDate()}</div>
                    {event && (
                      <div className="text-xs mt-1">{event.label}</div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <Button variant="solid" className="mt-4 text-primary bg-dark-1 text-white">
          Ver todas mis actividades
        </Button>
      </section>
    </div>
  )
}

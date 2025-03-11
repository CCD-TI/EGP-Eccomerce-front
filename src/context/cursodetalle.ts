import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CourseState {
    Clasificacion: string;
    IdModelo: number;
    IdProducto: number;
    IdTipoProducto: number;
    setCourseData: (Clasificacion: string, IdModelo: number,IdProducto: number,IdTipoProducto: number) => void;
    clearCourseData: () => void;
}

export const useCourseStore = create<CourseState>()(
    persist(
    (set) => ({
        Clasificacion: '',
        IdModelo: 0,
        IdProducto: 0,
        IdTipoProducto: 0,
        setCourseData: (Clasificacion, IdModelo,IdProducto,IdTipoProducto ) => set({ Clasificacion, IdModelo,IdProducto,IdTipoProducto }),
        clearCourseData: () => set({ Clasificacion: '', IdModelo: 0 ,IdProducto: 0 ,IdTipoProducto: 0 })
    }),
    {
        name: 'course-store', // Nombre del almacenamiento persistente
    }
));

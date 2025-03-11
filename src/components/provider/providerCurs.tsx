import { createContext, useState, useContext } from "react";

// Crear el contexto con valor por defecto `null`
const CourseContext = createContext({
  selectedCourse: null,
  setSelectedCourse: (course: any) => {},
});

// Proveedor del contexto
export const CourseProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <CourseContext.Provider value={{ selectedCourse, setSelectedCourse }}>
      {children}
    </CourseContext.Provider>
  );
};

// Hook para usar el contexto
export const useCourse = () => useContext(CourseContext);

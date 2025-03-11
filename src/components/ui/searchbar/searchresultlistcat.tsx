import React, { useRef, useEffect } from 'react';
import { SearchResult } from './searchresult';
import { environment } from '@/environments/environment';
import { SearchResultCat } from './searchresultcat';

export const SearchResultsListCat = ({ results, setResults, handleClose }: any) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setResults([]);  // Limpiar resultados si se hace clic fuera del contenedor
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setResults]);

  const handleResultClick = (result: any) => {

    // Validar que handleClose es una función antes de ejecutarla
    if (typeof handleClose === 'function') {
      handleClose();  // Cerrar el modal al hacer clic en un resultado
    } else {
      console.error('handleClose no es una función válida:', handleClose);
    }
  };

  return (
    <div
      ref={containerRef}
      className="py-2 bg-[image:var(--newgrad)] flex flex-col mt-[1.5rem] shadow-lg rounded-lg max-h-[300px] overflow-auto fixed w-[65%] max-lg:w-[50%] max-sm:w-[80%]"
    >
      {results.map((result: any, id: any) => {
        console.log(JSON.stringify(result))
        return (
          <div
            key={id}
            className="cursor-pointer p-1  flex items-center"  // Reduje el padding a p-1 y añadí flex
            onClick={() => handleResultClick(result)}
          >
            <SearchResultCat
              clasificacion={result.Clasificacion}
              categoria={result.Categoria}
              result={result.Modelo}
              IdProducto={result.IdProducto}
              foto={environment.baseUrlStorage + result.RutaImagen}
              setResults={setResults}
            />
          </div>
        )
      })}
    </div>
  );
};

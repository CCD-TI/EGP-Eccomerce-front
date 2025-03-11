import { environment } from "@/environments/environment";
import { Accordion, AccordionItem } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function App({ dato }: any) {
  const defaultContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  const [datomodulo, setdatomodulo] = useState([]);

  const api = axios.create({
    baseURL: environment.baseUrl,
    headers: { "Content-Type": "application/json" },
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const listarTemario = await api.post("/inicio/listarTemario", {
          fproductoid: dato
        });
        setdatomodulo(listarTemario.data.data[0])
      } catch (error) {
        console.error("Error cargando los datos:", error);
      }
    };
    loadData();
  }, [])


  return (
    <Accordion  variant="splitted" className="!border-0 !shadow-none !px-0" >
      {datomodulo.map((modulo: any, index: number) => (
        <AccordionItem className="my-1" key={index} title={<strong>{(index + 1) + '. ' + modulo.nombre}</strong>}>
          {/* Muestra los temas del módulo */}
          <ul className="">
            {modulo.temas.map((tema: any, temaIndex: number) => (
              <li key={temaIndex} className="mb-2 text-[#001540]">
                <h1 className='px-4'>{tema.nombre}</h1>
              </li>
            ))}
          </ul>
        </AccordionItem>
      ))}
    </Accordion>

  );
}
import { Image } from "@nextui-org/react";
import Link from "next/link";
import { IoMdSearch } from "react-icons/io";

export const SearchResult = ({ clasificacion,result,IdProducto,setResults,foto }: any) => {
    const data = 'Hello, World!';
    const handleClick = () => {
        setResults(null); // O cualquier otra acción que quieras ejecutar al hacer clic
    };
    return (
        <Link  onClick={handleClick}  href={{ pathname: '/busqueda/', query: { result,IdProducto } }} className="  py-2 px-4">
            <div
                className="search-result flex gap-4 "
            >
                <Image src={foto} width={40} radius="none"/>
               
                <div className="flex flex-col">
                    <span className="text-[#162E54] ">{result}</span>
                    <span className="text-[#3185F7]"><strong>{clasificacion}</strong></span>
                </div>
            </div>  
        </Link>
    );
};

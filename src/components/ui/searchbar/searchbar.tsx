import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { Input } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { environment } from "@/environments/environment";

export const SearchBar = ({ setResults }: any) => {
    const api = axios.create({
        baseURL: environment.baseUrl,
        headers: { "Content-Type": "application/json" },
    });




    const [input, setInput] = useState("");
    const router = useRouter(); // Inicializa useRouter
    const fetchData = (value: any) => {
        fetch(environment.baseUrl + "/inicio/listarProductoBusqueda")
            .then((response) => response.json())
            .then((json) => {
                const results = json.data[0].filter((user: any) => {
                    return (
                        value.toUpperCase() &&
                        value &&
                        user &&
                        user.Modelo &&
                        user.Modelo.toUpperCase().includes(value) &&
                        user.Modelo.toUpperCase().includes(value.toUpperCase())

                    );
                });
                setResults(results);
            });
    };

    const handleChange = (value: any) => {
        setInput(value);
        if (value.length >= 3) {

            fetchData(value.toUpperCase());
        } else {
            fetchData("");

        }

    };
    const handleSearch = () => {
        // Construye la URL con los parámetros de consulta
        const query = new URLSearchParams({
            result: input,
        }).toString();

        router.push(`/busqueda/?${query}`);
        setResults(null);

    };

    return (

        <Input

            autoComplete="off"
            isClearable
            defaultValue={input}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    handleSearch();
                }
            }}
            radius="sm"
            className=" w-[23rem] max-[1440px]:w-[12rem]  !text-[#162E54]"
            classNames={{
                label: "!text-[#162E54] ",
                input: [
                    "bg-transparent !text-[#162E54]",
                    "",
                    "placeholder:!text-[#162E54] ",
                ],
                innerWrapper: "bg-transparent !text-[#162E54]",
                inputWrapper: [
                    "shadow-xl !text-[#162E54]",
                    "bg-default-200/50",
                    "dark:bg-default/60",
                    "backdrop-blur-xl",
                    "backdrop-saturate-200",
                    "hover:bg-default-200/70",
                    "dark:hover:bg-default/70",
                    "group-data-[focus=true]:bg-default-200/50",
                    "dark:group-data-[focus=true]:bg-default/60",
                    "!cursor-text border-1 border-black/30",
                ],
            }}
            placeholder="Busca el curso deseado"
            startContent={
                <MagnifyingGlassIcon className=" h-5  mb-0.5  text-[#162E54] pointer-events-none flex-shrink-0" />
            }
        />


    );
};

import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { Input } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { environment } from "@/environments/environment";

export const SearchBarCat = ({ setResults }: any) => {

    const api = axios.create({
        baseURL: environment.baseUrl,
        headers: { "Content-Type": "application/json" },
    });

    const [input, setInput] = useState("");
    const router = useRouter(); // Inicializa useRouter
    const fetchData = (value: any) => {
        fetch(environment.baseUrl + "/inicio/listarProductoBusquedaCatalogo")
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
        const query = new URLSearchParams({
            result: input,
            IdProducto: "null"
        }).toString();
        //router.push(`/busqueda/?${query}`);
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
            className=" w-full  lg:w-[25rem] !text-white"
            classNames={{
                label: "!text-white ",
                input: [
                    "bg-transparent !text-white",
                    "",
                    "placeholder:!text-white ",
                ],
                innerWrapper: "bg-transparent !text-[#002F5A]",
                inputWrapper: [
                    "shadow-xl !text-white",
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
                <MagnifyingGlassIcon className=" h-5  mb-0.5  text-[#002F5A] pointer-events-none flex-shrink-0" />
            }
        />


    );
};

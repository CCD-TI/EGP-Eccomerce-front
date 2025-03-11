"use client";
import { BreadcrumbItem, Breadcrumbs, Button } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";

export const BreadcrumbCatComponent = () => {
    const pathname = usePathname();
    const paths = pathname.split("/").filter((path) => path !== ""); // Filtramos las rutas vacías

    const capitalize = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    const router = useRouter();
    return (
        <div className="flex gap-5  items-center">
              <Button color="primary" variant="solid" onClick={() => router.back()} >
                <FaArrowLeft className='w-8 h-8'/>
                </Button>
            

            {/* <Breadcrumbs separator=">" className=""

                underline="hover"
                classNames={{
                    list: "bg-[var(--ccdcolordark)] shadow-small border-1 border-black/10 p-3",
                }}
                itemClasses={{
                    item: "text-white/60 data-[current=true]:text-white",
                    separator: "text-white/40",
                }}
                variant="solid"

            >

                {paths.map((path, index) => {
                    const href = `/${paths.slice(0, index + 1).join("/")}`;
                    const text = decodeURI(capitalize(path));

                    return (
                        <BreadcrumbItem
                            key={index}
                            classNames={{ separator: "text-[var(--coloranti)] text-xl font-bold" }}
                        >
                            <Link
                                href={href}
                                className="text-[var(--coloranti)] flex items-center"
                            >
                                {text}
                            </Link>
                        </BreadcrumbItem>
                    );
                })}
            </Breadcrumbs> */}
        </div>



    );
};

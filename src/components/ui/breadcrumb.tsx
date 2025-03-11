"use client";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export const BreadcrumbComponent = () => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter((path) => path !== ""); // Filtramos las rutas vacías

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
      <Breadcrumbs separator=">" className=""

        underline="hover"
        classNames={{
          list: "!bg-transparent shadow-small border-black/10 p-3",
        }}
        itemClasses={{
          item: "text-white/60 data-[current=true]:text-white",
          separator: "text-white/40",
        }}
        variant="solid"

      >
        <BreadcrumbItem>
          <Link
            href="/"
            className="text-[var(--coloranti)] flex items-center"
          >
            <HomeIcon className="h-5 w-5 mr-1 text-[var(--coloranti)]" />
            Home
          </Link>
        </BreadcrumbItem>
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
      </Breadcrumbs>
    

  );
};

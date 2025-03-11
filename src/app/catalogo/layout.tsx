"use client"
import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button, Image, Input } from "@nextui-org/react";
import { GoSearch } from "react-icons/go";
import { environment } from "@/environments/environment";
import { SearchBar } from "@/components/ui/searchbar/searchbar";
import { SearchResultsList } from "@/components/ui/searchbar/searchresultlist";
import { SearchBarCat } from "@/components/ui/searchbar/searchbarcat";
import { SearchResultsListCat } from "@/components/ui/searchbar/searchresultlistcat";
import Dropdownlist from "@/components/ui/bruno/dropdownlist";


export default function App({ children, }: Readonly<{ children: React.ReactNode; }>) {

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];
    const [results, setResults] = useState([]);

    useEffect(() => {
        const interBubble = document.querySelector<HTMLDivElement>('.interactive');
        let curX = 0;
        let curY = 0;
        let tgX = 0;
        let tgY = 0;

        function move() {
            curX += (tgX - curX) / 20;
            curY += (tgY - curY) / 20;
            if (interBubble) {
                interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
            }
            requestAnimationFrame(move);
        }

        window.addEventListener('mousemove', (event) => {
            tgX = event.clientX;
            tgY = event.clientY;
        });

        move();

        // Cleanup function to remove event listeners when component unmounts
        return () => {
            window.removeEventListener('mousemove', (event) => {
                tgX = event.clientX;
                tgY = event.clientY;
            });
        };
    }, []);
    return (
        <div className="h-full w-full">
            <div className=" w-full">
                <Navbar
                    isBordered
                    isMenuOpen={isMenuOpen}
                    onMenuOpenChange={setIsMenuOpen}
                    className=" text-white w-full  bg-[image:var(--colorepresentativo)]"
                >
                    <NavbarContent className="max-md:hidden   pr-3 text-white " justify="start">
                        <NavbarBrand>
                            <Link href="/catalogo">
                                <Image src={environment.baseUrlStorage + "/Multimedia/Imagen/Ccd/Logos/CCDLOGOWHITE3.png"} className="w-20 h-20" />
                            </Link>
                        </NavbarBrand>
                        <NavbarBrand>
                           <Dropdownlist/>
                        </NavbarBrand>
                    </NavbarContent>
                    <NavbarContent className="max-md:hidden   pr-3 text-white " justify="center">
                        <div className="search-bar-container">
                            <SearchBarCat setResults={setResults} />
                            {results && results.length > 0 && <SearchResultsListCat results={results} setResults={setResults} />}
                        </div>
                    </NavbarContent>
                    <NavbarContent justify="end">
                        <NavbarItem className="flex gap-4">
                            <Link href="https://online.forms.app/owendirec/campo"target="_blank">
                                <Button variant="flat" className="bg-white/30 text-[#002F5A] font-extrabold ">
                                    Registro Matrícula
                                </Button>
                            </Link>
                        </NavbarItem>
                        <NavbarItem className="flex gap-4">
                            <Link href="https://docs.google.com/forms/d/e/1FAIpQLSfJHZk_rMxNXd37tAbW5InfubednUcvFKhvtKlDAnOkvO39aQ/viewform" target="_blank">
                                <Button  variant="flat" className="bg-white/30 text-[#002F5A] font-extrabold ">
                                    Registro Participante
                                </Button>
                            </Link>
                        </NavbarItem>
                    </NavbarContent>
                    <NavbarMenu>
                        {menuItems.map((item, index) => (
                            <NavbarMenuItem key={`${item}-${index}`}>
                                <Link
                                    className="w-full"
                                    color={
                                        index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
                                    }
                                    href="#"
                                    size="lg"
                                >
                                    {item}
                                </Link>
                            </NavbarMenuItem>
                        ))}
                    </NavbarMenu>
                </Navbar>
                {children}

            </div>
        </div>
    );
}

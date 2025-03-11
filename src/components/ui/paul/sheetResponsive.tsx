import React from "react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../sheet";
import { FaArrowLeft, FaBars } from "react-icons/fa6";
import Image from "next/image";
import { FaRegCalendarAlt } from "react-icons/fa";

interface Props {
  content: React.ReactNode;
  btn: React.ReactNode;
}

export default function sheetResponsive({ content ,btn}: Props) {
  return (
    <Sheet>
     
      <SheetTrigger
      
      
      className=" scale-0 max-lg:scale-100"  asChild>
        {btn}
      </SheetTrigger>
      <SheetContent className="bg-colors-night-blue-ccd2 border-colors-dark-blue-ccd w-[80%] h-full overflow-y-auto">
        <SheetClose asChild>
          <FaArrowLeft className="text-5xl text-colors-sky-ccd" />
        </SheetClose>

        {content}
      </SheetContent>
    </Sheet>
  );
}

"use client"
import ProductoFilter from '@/components/ui/pricing/productofilter';
import React from 'react'
interface Props {
    params: {
        clasificacion: string;
    };
}
export default function Page({ params }: Props) {
    return (
        <ProductoFilter url1={decodeURI(params.clasificacion)} url2={""} url3={""}/>
    )
}

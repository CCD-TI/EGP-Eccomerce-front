"use client"

import ProductoFilter from '@/components/ui/pricing/productofilter';
import React from 'react'

interface Props {
  params: {
    clasificacion:string,
    categoria: string,
    subcategoria:string
  };
}

export default function Page({ params }: Props) {
  return (
    <ProductoFilter url1={decodeURI(params.clasificacion)} url2={decodeURI(params.categoria)} url3={decodeURI(params.subcategoria)} />
  )
}

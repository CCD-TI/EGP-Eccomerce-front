import FormProm from '@/components/ui/paul/FormProm'
import PacksSection from '@/components/ui/paul/packsection'
import Promocionespack from '@/components/ui/paul/Promocionespack'
import PromoSection from '@/components/ui/paul/PromoSection'
import React from 'react'

const Page = () => {
  return (
    <div>
      <PacksSection bg="bg-sectors-PromoForm2"/>
      <PromoSection/>
      <FormProm/>
    </div>
  )
}

export default Page

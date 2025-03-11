'use client'

import Image from 'next/image'
import { useState } from 'react'
import Paymentflow from '@/components/ui/paul/pagoRuta/payment-flow'

export default function PaymentPage() {
  const [selectedPayment, setSelectedPayment] = useState<'card' | 'qr'>('card')
  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }
  return (
    <Paymentflow/>
  );
}


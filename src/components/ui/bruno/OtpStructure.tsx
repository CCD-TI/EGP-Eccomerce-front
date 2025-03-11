"use client"

import type React from "react"
import { useState, useRef, useEffect, type KeyboardEvent, type ClipboardEvent } from "react"

interface OTPInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
  autoFocus?: boolean;
  disabled?: boolean;
  value?: string; // Nueva prop para el valor del OTP
}
export default function OTPInput({ length = 6, onComplete, autoFocus = true, disabled = false, value= "" }: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  useEffect(() => {
    if (value) {
      const newOtp = value.split("").slice(0, length);
      setOtp(newOtp);
    } else {
      setOtp(Array(length).fill(""));
    }
  }, [value, length]);
  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length)
  }, [length])

  // Auto-focus first input on mount
  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [autoFocus])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value

    // Only accept single digit
    if (value.length > 1 || !/^\d*$/.test(value)) return

    // Update the OTP array
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // If input is filled, move to next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    // Check if OTP is complete
    const otpValue = newOtp.join("")
    if (otpValue.length === length && onComplete) {
      onComplete(otpValue)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (otp[index] === "") {
        // If current input is empty, focus previous input
        if (index > 0) {
          inputRefs.current[index - 1]?.focus()
        }
      } else {
        // Clear current input
        const newOtp = [...otp]
        newOtp[index] = ""
        setOtp(newOtp)
      }
    }
  }

  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={otp[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          disabled={disabled}
          className="w-12 h-14 rounded-xl text-center text-xl font-bold border  focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100 disabled:text-gray-400"
          aria-label={`OTP digit ${index + 1}`}
        />
      ))}
    </div>
  )
}
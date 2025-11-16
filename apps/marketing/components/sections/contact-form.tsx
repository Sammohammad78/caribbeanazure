"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setStatus("success")
        e.currentTarget.reset()
      } else {
        setStatus("error")
      }
    } catch (error) {
      setStatus("error")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Naam
        </label>
        <Input id="name" name="name" required />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          E-mail
        </label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          Telefoon (optioneel)
        </label>
        <Input id="phone" name="phone" type="tel" />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Bericht
        </label>
        <Textarea id="message" name="message" required rows={5} />
      </div>
      <Button type="submit" disabled={status === "loading"} className="w-full">
        {status === "loading" ? "Verzenden..." : "Verstuur bericht"}
      </Button>
      {status === "success" && (
        <p className="text-sm text-green-600">Bericht verzonden!</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600">Er ging iets mis. Probeer het opnieuw.</p>
      )}
    </form>
  )
}

"use client"

import { useState } from "react"
import { useTranslations } from 'next-intl'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  const t = useTranslations('common.contactForm')
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
        <label htmlFor="name" className="block text-sm font-medium mb-2 text-[color:var(--fg)]">
          {t('fields.name.label')}
        </label>
        <Input
          id="name"
          name="name"
          required
          placeholder={t('fields.name.placeholder')}
          aria-describedby="name-error"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2 text-[color:var(--fg)]">
          {t('fields.email.label')}
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder={t('fields.email.placeholder')}
          aria-describedby="email-error"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2 text-[color:var(--fg)]">
          {t('fields.phone.label')}
        </label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder={t('fields.phone.placeholder')}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2 text-[color:var(--fg)]">
          {t('fields.message.label')}
        </label>
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder={t('fields.message.placeholder')}
          aria-describedby="message-error"
        />
      </div>

      <Button type="submit" disabled={status === "loading"} className="w-full">
        {status === "loading" ? t('submitting') : t('submit')}
      </Button>

      {status === "success" && (
        <p className="text-sm text-[color:var(--success)] font-medium" role="alert">
          {t('success')}
        </p>
      )}

      {status === "error" && (
        <p className="text-sm text-[color:var(--error)] font-medium" role="alert">
          {t('error')}
        </p>
      )}
    </form>
  )
}

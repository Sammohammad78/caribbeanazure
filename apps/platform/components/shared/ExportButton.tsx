'use client'

import { Download, FileText, Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface ExportButtonProps {
  data: any
  filename?: string
  format?: 'json' | 'txt' | 'clipboard'
}

export function ExportButton({ data, filename = 'export', format = 'json' }: ExportButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleExport = () => {
    if (format === 'clipboard') {
      const text = JSON.stringify(data, null, 2)
      navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      return
    }

    let content: string
    let mimeType: string
    let ext: string

    if (format === 'json') {
      content = JSON.stringify(data, null, 2)
      mimeType = 'application/json'
      ext = 'json'
    } else {
      content = formatAsText(data)
      mimeType = 'text/plain'
      ext = 'txt'
    }

    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${filename}.${ext}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const formatAsText = (obj: any): string => {
    let text = ''
    for (const [key, value] of Object.entries(obj)) {
      text += `${key}: ${value}\n`
    }
    return text
  }

  const Icon = format === 'clipboard' ? (copied ? Check : Copy) : format === 'json' ? Download : FileText

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-sm font-medium"
    >
      <Icon className="w-4 h-4" />
      <span>
        {format === 'clipboard'
          ? copied
            ? 'Copied!'
            : 'Copy'
          : `Export ${format.toUpperCase()}`}
      </span>
    </button>
  )
}

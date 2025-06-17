"use client"

import { useEffect, useRef } from "react"

interface PrismCodeProps {
  code: string
  language: string
}

export function PrismCode({ code, language }: PrismCodeProps) {
  const codeRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Simple syntax highlighting without external dependencies
    if (codeRef.current) {
      // Apply basic styling based on language
      codeRef.current.className = `language-${language}`
    }
  }, [code, language])

  // Simple syntax highlighting for common languages
  const highlightCode = (code: string, lang: string) => {
    if (lang === "go") {
      return code
        .replace(
          /(package|import|func|var|const|type|struct|interface|if|else|for|range|return|defer|go|chan|select|case|default|switch|break|continue)\b/g,
          '<span class="text-blue-400">$1</span>',
        )
        .replace(
          /(string|int|int32|int64|float32|float64|bool|byte|rune|error|nil|true|false)\b/g,
          '<span class="text-green-400">$1</span>',
        )
        .replace(/(".*?")/g, '<span class="text-yellow-300">$1</span>')
        .replace(/(\/\/.*$)/gm, '<span class="text-gray-500">$1</span>')
    }

    if (lang === "bash") {
      return code
        .replace(/^(#.*$)/gm, '<span class="text-gray-500">$1</span>')
        .replace(/(echo|cd|ls|mkdir|touch|git|npm|yarn|docker|kubectl)\b/g, '<span class="text-blue-400">$1</span>')
        .replace(/(\$\w+)/g, '<span class="text-green-400">$1</span>')
        .replace(/(".*?")/g, '<span class="text-yellow-300">$1</span>')
    }

    if (lang === "typescript" || lang === "javascript") {
      return code
        .replace(
          /(function|const|let|var|if|else|for|while|return|import|export|class|interface|type|async|await|try|catch|finally)\b/g,
          '<span class="text-blue-400">$1</span>',
        )
        .replace(
          /(string|number|boolean|object|undefined|null|true|false)\b/g,
          '<span class="text-green-400">$1</span>',
        )
        .replace(/(".*?"|'.*?'|`.*?`)/g, '<span class="text-yellow-300">$1</span>')
        .replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, '<span class="text-gray-500">$1</span>')
    }

    return code
  }

  return (
    <div className="relative">
      <div className="absolute top-3 right-3 text-xs text-muted-foreground uppercase tracking-wide">{language}</div>
      <pre className="bg-slate-900 text-slate-100 p-6 rounded-lg overflow-x-auto text-sm leading-relaxed">
        <code
          ref={codeRef}
          className={`language-${language}`}
          dangerouslySetInnerHTML={{
            __html: highlightCode(code, language),
          }}
        />
      </pre>
    </div>
  )
}

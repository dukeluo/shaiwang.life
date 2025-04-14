'use client'

import mermaid from 'mermaid'
import { useEffect, useRef } from 'react'

interface MermaidDiagramProps {
  id: string
  code: string
}

export const MermaidDiagram = ({ id, code }: MermaidDiagramProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
      })

      const renderDiagram = async () => {
        try {
          const { svg } = await mermaid.render(`mermaid-${id}`, code)
          if (containerRef.current) {
            containerRef.current.innerHTML = svg
          }
        } catch (error) {
          if (containerRef.current) {
            containerRef.current.innerHTML = `<div className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700" role="alert"><span className="block sm:inline">Failed to render mermaid diagram</span></div>`
          }
        }
      }

      renderDiagram()
    }
  }, [code, id])

  return <div ref={containerRef} key={id} />
}

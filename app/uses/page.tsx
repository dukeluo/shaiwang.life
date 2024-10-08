import { NextSeo } from 'next-seo'

import { PageLayout } from '../components/PageLayout'
import { Tool } from '../components/tools/Tool'
import { ToolsSection } from '../components/tools/ToolsSection'
import { Tools } from '../lib/lifeApi'

const seoTitle = 'Uses'
const seoDescription = 'Software I use, gadgets I love, and other things I recommend.'

export default function Uses() {
  return (
    <PageLayout title="Software I use, gadgets I love, and other things I recommend.">
      <div className="space-y-20">
        {Object.entries(Tools).map(([title, tools]) => (
          <ToolsSection key={title} title={title}>
            {tools.map((tool) => (
              <Tool key={tool.title} title={tool.title} href={tool.href}>
                {tool.description}
              </Tool>
            ))}
          </ToolsSection>
        ))}
      </div>
    </PageLayout>
  )
}

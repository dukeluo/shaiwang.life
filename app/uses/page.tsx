import { useId } from 'react'

import { Card } from '../components/Card'
import { PageLayout } from '../components/PageLayout'

const Tools = {
  Software: [
    {
      title: 'Visual Studio Code',
      description: `Free, lightweight, and powerful ecosystem, but its git feature is not great for me.`,
      href: 'https://code.visualstudio.com/',
    },
    {
      title: 'WebStorm',
      description: `The best Git GUI I have ever used.`,
      href: 'https://www.jetbrains.com/webstorm/',
    },
    {
      title: 'Cursor',
      description: `AI-powered code editor. It helps me write code faster.`,
      href: 'https://www.cursor.com/',
    },
    {
      title: 'Notion',
      description: `My knowledge base. I use it to keep track of my ideas, notes, and thoughts.`,
      href: 'https://www.notion.so/',
    },
    {
      title: '1Password',
      description: `It knows all my passwords. I can't imagine life without it.`,
      href: 'https://1password.com/',
    },
    {
      title: 'Raycast',
      description: `A better but free replacement for Alfred.`,
      href: 'https://www.raycast.com/',
    },
  ],
  Services: [
    {
      title: '魔戒机场',
      description: `按量计费且不限时间的机场服务，便宜省心。`,
      href: 'https://mojie.me/#/register?code=rqQCcPmH',
    },
  ],
  Articles: [
    {
      title: 'React Official Documentation',
      description: `Lots of useful articles and tutorials. Every React developer should read it.`,
      href: 'https://react.dev/learn',
    },
  ],
}

const ToolsSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const id = useId()

  return (
    <section aria-labelledby={id} className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
      <div className="grid max-w-3xl grid-cols-1 items-baseline gap-y-8 md:grid-cols-4">
        <h2 id={id} className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
          {title}
        </h2>
        <div className="md:col-span-3">
          <ul role="list" className="space-y-16">
            {children}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default function Uses() {
  return (
    <PageLayout title="My favorite software, articles and more.">
      <div className="space-y-20">
        {Object.entries(Tools).map(([title, tools]) => (
          <ToolsSection key={title} title={title}>
            {tools.map((tool) => (
              <Card as="li" key={tool.title}>
                <Card.Title as="h3" href={tool.href}>
                  {tool.title}
                </Card.Title>
                <Card.Description>{tool.description}</Card.Description>
              </Card>
            ))}
          </ToolsSection>
        ))}
      </div>
    </PageLayout>
  )
}

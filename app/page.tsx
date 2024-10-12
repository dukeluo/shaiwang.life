import {
  RiGithubFill,
  RiLinkedinFill,
  RiNpmjsFill,
  RiRssFill,
  RiStackOverflowFill,
  RiTwitterXFill,
  RiWechatFill,
} from '@remixicon/react'
import hljs from 'highlight.js'
import { Metadata } from 'next'

import { ExternalLink } from './components/ExternalLink'
import { PageTitle } from './components/PageTitle'
import { Prose } from './components/Prose'
import { SocialLink } from './components/SocialLink'

const SocialMedia = [
  { name: 'Github', link: 'https://github.com/dukeluo', icon: RiGithubFill },
  { name: 'X', link: 'https://x.com/ihuanluo', icon: RiTwitterXFill },
  { name: 'WeChat', link: 'https://mp.weixin.qq.com/s/dyRGCLy9VStJwd3gPBO1_w', icon: RiWechatFill },
  { name: 'LinkedIn', link: 'https://www.linkedin.com/in/ihuanluo', icon: RiLinkedinFill },
  { name: 'StackOverflow', link: 'https://stackoverflow.com/users/12814009/huan', icon: RiStackOverflowFill },
  { name: 'npm', link: 'https://www.npmjs.com/~dukeluo', icon: RiNpmjsFill },
  { name: 'RSS', link: '/feed.xml', icon: RiRssFill },
]

const PoeticCode = `/* Participation Matters */
class Life {
  constructor() {
    this.experiences = []
  }
  participate(event) {
    this.experiences.push(event)
  }
  reflect() {
    return this.experiences
      .reduce((wisdom, exp) => wisdom + exp, 0)
  }
}
const myLife = new Life()
while (myLife.reflect() < Number.POSITIVE_INFINITY) {
  const next = World.opportunity()
  myLife.participate(next)
}`

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Huan',
    description: "A passionate front-end engineer Huan's bio page",
    keywords: 'dukeluo, shaiwang, 晒网',
    authors: [{ name: process.env.NEXT_PUBLIC_SITE_AUTHOR! }],
    openGraph: {
      title: process.env.NEXT_PUBLIC_SITE_NAME,
      description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
      url: process.env.NEXT_PUBLIC_SITE_URL,
      type: 'website',
      images: './icon.svg',
    },
    twitter: {
      card: 'summary_large_image',
      title: process.env.NEXT_PUBLIC_SITE_NAME,
      description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
      creator: process.env.NEXT_PUBLIC_SITE_AUTHOR,
      images: './icon.svg',
    },
    robots: 'index, follow',
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  }
}

export default function Home() {
  return (
    <div className="mt-9 md:flex md:gap-2">
      <div className="md:mt-20 md:w-5/12">
        <PageTitle>Hello there.</PageTitle>
        <div className="flex flex-col gap-4">
          <p className="mt-6 text-balance text-base">
            I’m <span className="font-bold">Huan</span>, a front-end engineer who loves building{' '}
            <span className="font-bold">polished web applications</span>. I dream of one day building{' '}
            <span className="font-bold">my own product</span> with a lot of users.
          </p>
          <p>
            Currently crafting at{' '}
            <ExternalLink href="https://www.boxo.io/">
              <span className="font-bold">Boxo</span>
            </ExternalLink>
            , previously at{' '}
            <ExternalLink href="https://www.thoughtworks.com/">
              {' '}
              <span className="font-bold">Thoughtworks</span>
            </ExternalLink>
            .
          </p>
        </div>
        <div className="mt-6 flex gap-6">
          {SocialMedia.map((socialProfile) => (
            <SocialLink
              key={socialProfile.name}
              aria-label={`Follow on ${socialProfile.name}`}
              href={socialProfile.link}
              icon={socialProfile.icon}
            />
          ))}
        </div>
      </div>
      <Prose className="mt-10 md:mt-0 md:w-7/12">
        <pre>
          <code dangerouslySetInnerHTML={{ __html: hljs.highlight(PoeticCode, { language: 'javascript' }).value }} />
        </pre>
      </Prose>
    </div>
  )
}

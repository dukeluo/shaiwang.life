import { NextSeo } from 'next-seo'

import { Container } from '../components/Container'
import { PageTitle } from '../components/PageTitle'
import { SocialLink } from '../components/SocialLink'
import { About, Name, SocialMedia } from '../data/lifeApi'

const seoTitle = 'Bartosz Jarocki'
const seoDescription = 'A passionate software engineer with an eye for details based in Wrocław, Poland.'

export default function Home() {
  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={`${process.env.NEXT_PUBLIC_URL}`}
        openGraph={{
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_URL}/api/og?title=${seoTitle}&description=${seoDescription}`,
            },
          ],
        }}
      />
      <Container className="mt-9">
        <div className="max-w-2xl">
          <PageTitle>{Name}</PageTitle>
          <p className="mt-6 max-w-2xl text-balance text-base">{About}</p>
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
      </Container>
    </>
  )
}

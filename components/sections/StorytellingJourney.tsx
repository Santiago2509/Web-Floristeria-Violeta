import { StorytellingJourneyDesktop } from './StorytellingJourneyDesktop'
import { StorytellingJourneyMobile } from './StorytellingJourneyMobile'
import type { CollagePhoto } from './VintageCollage'

export function StorytellingJourney({ photos = [] }: { photos?: CollagePhoto[] }) {
  return (
    <>
      <div className="hidden lg:block">
        <StorytellingJourneyDesktop photos={photos} />
      </div>
      <div className="block lg:hidden">
        <StorytellingJourneyMobile photos={photos} />
      </div>
    </>
  )
}

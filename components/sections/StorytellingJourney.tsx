import { StorytellingJourneyDesktop } from './StorytellingJourneyDesktop'
import { StorytellingJourneyMobile } from './StorytellingJourneyMobile'

export function StorytellingJourney() {
  return (
    <>
      <div className="hidden lg:block">
        <StorytellingJourneyDesktop />
      </div>
      <div className="block lg:hidden">
        <StorytellingJourneyMobile />
      </div>
    </>
  )
}

import { useEffect, useState } from "react"
import NavigationalButtons from "./components/NavigationalButtons"
import TwoDirectionalStep from "./components/TwoDirectionalStep"
import React from "react"

export const data = [
  {
    title: "Скринер",
    description: `Lorem ipsum dolobus aliquam nesciunt atque debitis laboriosam, repellat doloremque inventore nihil consequatur fugiat. Quo ipsa natus tempore placeat sed iste sunt odio ipsam quaerat modi temporibus omnis alias officiis accusamus obcaecati numquam inventore aspernatur saepe aliquid, suscipit a voluptatibus molestiae iusto? Quaerat, veniam impedit. Corrupti saepe dignissimos recusandae quisquam expedita distinctio nostrum commodi? Molestias, ab? Iste sunt quo voluptatem ad repudiandae facilis nostrum cupiditate, laboriosam quas alias ullam, quasi ipsa suscipit dolore facere autem odio qui. Debitis fuga dolor quia accusamus unde perferendis fugiat esse earum, non doloremque beatae nemo et itaque!Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam sit amet dictum. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus dolor placeat, debitis eius quibusdam ducimus quas laboriosam fugiat nemo cumque nesciunt aperiam ipsam voluptatibus consectetur saepe natus! Aspernatur, mollitia culpa Expedita iusto, ratione nisi gendi quos beatae molestias odit nihil, tempore reiciendis? Maiores deserunt beatae, odit quae laboriosam aperiam quisquam ex.Explicabo repellat enim blanditiis mollitia quae officia in. Repellendus dolores perspiciatis numquam reprehenderit cupiditate laborum officiis commodi temporibus ipsa, distinctio nemo fugit rerum dolorem beatae labore, dicta veritatis debitis autem hic tempora, suscipit porro! Sit illo illum consequuntur`,
    image: "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg",
    presentationalText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam sit amet dictum."
  },
  {
    title: "Аналитика",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam sit amet dictum.",
    image: "https://image.shutterstock.com/image-photo/black-rowan-berries-on-branches-260nw-159086927.jpg",
    presentationalText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam sit amet dictum."
  },
  {
    title: "Исследования",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam sit amet dictum.",
    image: "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
    presentationalText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam sit amet dictum."
  }
]

const titles = data.map((elem) => elem.title)
const textData = data.map((elem) => ({ title: elem.title, description: elem.description }))
const presentationalData = data.map((elem) => ({ title: elem.title, presentationalImage: elem.image, presentationalText: elem.presentationalText }))

function Carousel() {
  const [step, setStep] = useState(0)
  const [activeStepHeight, setActiveStepHeight] = useState(0)
  const divRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateDivHeight = () => {
      if (divRef.current) {
        if (window.innerWidth < 1024) {
          divRef.current.style.minHeight = `${activeStepHeight}px`
          divRef.current.style.height = `${activeStepHeight}px`
        } else {
          divRef.current.style.height = `100%`
        }
      }
    }

    updateDivHeight()

    window.addEventListener('resize', updateDivHeight)
    return () => {
      window.removeEventListener('resize', updateDivHeight)
    }
  }, [activeStepHeight])

  const handleChangeStep = (index: number) => {
    setStep(index)
  }

  return (
    <div className="p-[32px] h-screen items-center flex flex-col gap-[24px]">
      <div className="w-full min-h-[42px] flex lg:justify-center overflow-x-clip rounded-[48px]">
        <NavigationalButtons buttons={titles} step={step} handleChangeStep={handleChangeStep} />
      </div>

      <div
        className="p-[24px] w-full h-full flex gap-[24px] rounded-[48px] bg-[#111115] transition-all duration-500 *:relative *:overflow-hidden"
        ref={divRef}
      >
        <div className="w-full lg:w-[50%]">
          <TwoDirectionalStep direction="vertical" setActiveStepHeight={setActiveStepHeight} content={textData} step={step} />
        </div>

        <div className="hidden lg:block p-[24px] w-[50%] rounded-[48px] bg-[#16171A]">
          <TwoDirectionalStep direction="horizontal" content={presentationalData} step={step} />
        </div>
      </div>
    </div>
  )
}

export default Carousel

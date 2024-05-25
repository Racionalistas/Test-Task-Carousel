import React, { useEffect, useRef, useState } from 'react'

interface NavigationalButtonsProps {
    buttons: string[]
    handleChangeStep: (index: number) => void
    step: number
}

const NavigationalButtons: React.FC<NavigationalButtonsProps> = ({ buttons, handleChangeStep, step }) => {
    const [activeButtonStyle, setActiveButtonStyle] = useState<{ left: number; width: number }>({ left: 0, width: 110 })
    const containerRef = useRef<HTMLDivElement>(null)
    const childRefs = useRef<HTMLButtonElement[]>([])

    useEffect(() => {
        const updateActiveButtonStyle = () => {
            const container = containerRef.current
            if (container) {
                const button = container.children[step + 1] as HTMLElement
                
                const { offsetLeft, offsetWidth } = button

                setActiveButtonStyle({
                    left: offsetLeft,
                    width: offsetWidth,
                })
            }
        }

        updateActiveButtonStyle()

        window.addEventListener('resize', updateActiveButtonStyle)
        return () => {
            window.removeEventListener('resize', updateActiveButtonStyle)
        }
    }, [step])

    return (
        <div ref={containerRef} className="absolute lg:relative w-fit flex justify-center border-white/30 border-[1px] rounded-[36px]">
            <div
                className="absolute top-0 bottom-0 bg-white/30 transition-all duration-300 rounded-[36px]"
                style={{ left: activeButtonStyle.left, width: activeButtonStyle.width }}
            />
            {buttons.map((button, index) => (
                <button
                    ref={el => {
                        childRefs.current[index] = el as HTMLButtonElement
                    }}
                    key={index}
                    className={`
                    px-[24px] py-[8px] rounded-[36px] hover:bg-white/15 active:scale-95 transition-colors 
                    ${step === index ? 'bg-active' : ''}
                    `}
                    onClick={() => handleChangeStep(index)}
                >
                    {button}
                </button>
            ))}
        </div>
    )
}

export default NavigationalButtons

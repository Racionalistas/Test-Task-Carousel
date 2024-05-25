import { useCallback, useEffect, useRef, useState } from "react"

interface TwoDirectionalStepProps {
    step: number
    content: {
        title: string
        description?: string
        presentationalImage?: string
        presentationalText?: string
    }[]
    direction: "vertical" | "horizontal"
    setActiveStepHeight?: React.Dispatch<React.SetStateAction<number>>
}

const TwoDirectionalStep: React.FC<TwoDirectionalStepProps> = ({ step, content, direction, setActiveStepHeight }) => {
    const [sizes, setSizes] = useState<number[]>([])
    const [currentOffset, setCurrentOffset] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)
    const childRefs = useRef<HTMLDivElement[]>([])

    const updateSizes = useCallback(() => {
        childRefs.current = childRefs.current.slice(0, content.length)

        const newSizes = childRefs.current.map(ref => (direction === "vertical" ? ref!.offsetHeight : ref!.offsetWidth))
        setSizes(newSizes)
    }, [content, direction])

    useEffect(() => {
        updateSizes()

        const handleResize = () => {
            updateSizes()
        }

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [updateSizes])

    const getPosition = useCallback((index: number): number => {
        if (index === 0) return 0
        return sizes.slice(0, index).reduce((acc, size) => acc + size, 0)
    }, [sizes])

    useEffect(() => {
        if (childRefs.current[step]) {
            setCurrentOffset(-getPosition(step))
            if (setActiveStepHeight) {
                const padding = 48
                const gap = 16

                setActiveStepHeight(childRefs.current[step].children[0].clientHeight + childRefs.current[step].children[1].clientHeight + padding + gap)
            }
        }
    }, [getPosition, setActiveStepHeight, step, sizes])

    const updateContainerSize = useCallback(() => {
        if (containerRef.current) {
            if (direction === "vertical") {
                if (window.innerWidth < 1024) {
                    containerRef.current.style.height = `${content.length * 300}%`
                } else {
                    containerRef.current.style.height = `${content.length * 100}%`
                }
                containerRef.current.style.top = `${currentOffset}px`
            } else {
                containerRef.current.style.width = `${content.length * 100}%`
                containerRef.current.style.left = `${currentOffset}px`
            }
        }
    }, [content.length, currentOffset, direction])

    useEffect(() => {
        updateContainerSize()

        const handleResize = () => {
            updateContainerSize()
        }

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [updateContainerSize])

    const itemStyles = (index: number) => ({
        [direction === "vertical" ? "top" : "left"]: `${getPosition(index)}px`,
        [direction === "vertical" ? "height" : "width"]: `${100 / content.length}%`,
    })

    const containerClass = `
        absolute transition-all duration-500 
        ${direction === "vertical" ? "left-0 w-full" : "top-0 h-full"}
    `

    const itemClass = `
        absolute flex flex-col gap-[16px]
        ${direction === "vertical" ? "left-0 p-[0px] w-full text-left lg:justify-center" : "top-0 p-[64px] h-full items-center text-center justify-center"}
    `

    return (
        <div ref={containerRef} className={containerClass}>
            {content.map((elem, index) => (
                <div
                    key={index}
                    ref={el => {
                        childRefs.current[index] = el as HTMLDivElement
                    }}
                    style={itemStyles(index)}
                    className={itemClass}
                >
                    {elem.presentationalImage && <img src={elem.presentationalImage} className="w-[230px] h-[230px] rounded-[48px] object-cover" alt="step img" />}

                    <h1 className="text-[32px] font-bold">{elem.title}</h1>

                    {elem.description && <p className="oveflow-y-hidden lg:overlow-y-auto">{elem.description}</p>}

                    {elem.presentationalText && <p>{elem.presentationalText}</p>}
                </div>
            ))}
        </div>
    )
}

export default TwoDirectionalStep

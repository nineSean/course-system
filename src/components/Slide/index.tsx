import {Carousel} from "antd"
import React, {FC, useEffect} from "react"
import {ISlide} from "@/typings/slide"

interface Props {
  slides: ISlide[]
  getSlides: () => any
}

const Slide: FC<Props> = (props: Props) => {
  useEffect(() => {
    !props.slides.length && props.getSlides()
  }, [])
  return (
    <Carousel autoplay>
      {
        props.slides.map((slide, idx) => <img
          src={slide.url}
          alt="carousel"
          key={idx}
        />)
      }
    </Carousel>
  )
}
export default Slide

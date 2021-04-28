import Carousel from "react-slick"
import React, {FC, useEffect} from "react"
import {ISlide} from "@/typings/slide"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

interface Props {
  className?: string
  slides: ISlide[]
  getSlides: () => any
}

const Slide: FC<Props> = (props: Props) => {
  useEffect(() => {
    !props.slides.length && props.getSlides()
  }, [])
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <Carousel {...settings} className={props.className}>
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

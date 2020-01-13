import React, { useState } from "react"
import GatsbyImage from "gatsby-image"
import styled from "@emotion/styled"

import media from "@styles/media"

const ProductImage = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0)
  return (
    <Section>
      <Preview>
        {images.map((image, index) => (
          <Wrapper show={index === currentImage}>
            <PreviewImage fluid={image.regular} />
          </Wrapper>
        ))}
      </Preview>

      <Thumbnail>
        {images.map((image, index) => (
          <ImageFrame
            key={index}
            onMouseEnter={() => setCurrentImage(index)}
            show={index === currentImage}
          >
            <ThumbnailImage fluid={image.small} />
          </ImageFrame>
        ))}
      </Thumbnail>
    </Section>
  )
}

export default ProductImage

const Section = styled.section`
  grid-column: left / 6 col-end;

  ${media.desktop` width: 100px; `};
`

const Preview = styled.div`
  position: relative;
  display: flex;
  height: 55rem;
  /* overflow: hidden; */
`
const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 0px;
  left: 0px;
  transition: opacity 0.4s ease-in-out;
  ${p => (p.show ? `opacity: 1;` : `opacity: 0;`)};
`

const PreviewImage = styled(GatsbyImage)`
  width: 100%;
  height: 55rem;
`

const Thumbnail = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: 1.2rem;
  display: flex;
  justify-content: center;
`

const ImageFrame = styled.div`
  margin: 0 12px;
  position: relative;
  cursor: pointer;

  &:after {
    display: block;
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 4rem;
    width: 4rem;
    background: transparent;
    border-radius: 100%;

    ${p =>
      p.show
        ? `border: 1px solid ${p.theme.colors.primary};`
        : `border: none;`};
  }
`

const ThumbnailImage = styled(GatsbyImage)`
  border-radius: 100%;
  width: 3.2rem;
  height: 3.2rem;
`

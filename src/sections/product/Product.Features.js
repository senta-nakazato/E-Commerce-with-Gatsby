import React, { useState } from "react"
import GatsbyImage from "gatsby-image"
import styled from "@emotion/styled"
import media from "@styles/media"

import AddIcon from "@icons/Add.Icon"
import { ParallaxBox } from "@components/ParallaxBox"
import PanelSlideIn from "@components/Panel/Panel.SlideIn"
// import MediaQuery from "@components/MediaQuery"

const ProductFeatures = ({ productFeatures }) => {
  const [showPanel, setShowPanel] = useState(false)

  const togglePanel = () => {
    setShowPanel(!showPanel)
  }

  return (
    <Section>
      {productFeatures.map(feature => (
        <Wrapper key={feature.id}>
          <ParallaxBox>
            <ImageContainer>
              <Image fluid={feature.image.fluid} />
            </ImageContainer>
          </ParallaxBox>
          <ContentContainer>
            <Heading>{feature.heading}</Heading>
            <Description
              dangerouslySetInnerHTML={{
                __html: feature.description.description,
              }}
            />
            <MediaQuery>
              {feature.detail && (
                <>
                  <button onClick={() => togglePanel(!showPanel)}>
                    <AddIcon />
                  </button>
                  <PanelSlideIn showPanel={showPanel} togglePanel={togglePanel}>
                    <Detail>{feature.detail.detail}</Detail>
                  </PanelSlideIn>
                </>
              )}
            </MediaQuery>
          </ContentContainer>
        </Wrapper>
      ))}
    </Section>
  )
}

export default ProductFeatures

const Section = styled.section`
  width: 100%;
  min-height: calc(100vh - 6rem);
  position: relative;

  ${media.desktop`
    margin-top: 20rem;
  `}

  ${media.tablet`
    margin-top: 12rem;
  `}
`

const Wrapper = styled.div`
  padding: 8rem 0;
  max-width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  &:nth-child(even) {
    flex-flow: row-reverse;

    ${media.desktop`
    flex-direction: column;
  `}
  }

  ${media.desktop`
    flex-direction: column;
    padding: 4rem 0;
  `}
`

const ImageContainer = styled.div`
  height: calc(100vh - 12rem);
  width: 50vw;
  overflow: hidden;

  ${media.desktop`
    width: 80vw;
    height: 40rem;
  `}

  ${media.tablet`
    height: 24rem;
  `}
`

const ContentContainer = styled.div`
  padding: 4rem 0rem;
  text-align: center;
  width: 30rem;
`

const MediaQuery = styled.div`
  ${media.tablet`
    display: none;
  `}
`

const Image = styled(GatsbyImage)`
  height: 100%;
  width: 100%;
`
const Heading = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2.4rem;
`
const Description = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.92;
  margin-bottom: 2.4rem;
`
const Detail = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.92;
`

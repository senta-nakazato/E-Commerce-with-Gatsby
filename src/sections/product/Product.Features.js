import React, { useContext, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import GatsbyImage from "gatsby-image"
import { css } from "@emotion/core"
import styled from "@emotion/styled"
import { InView } from "react-intersection-observer"

import AddIcon from "@icons/Add.Icon"
import { PanelContext } from "@components/Panel/Panel.Context"
import { ParallaxBox } from "@components/ParallaxBox"

const ProductFeatures = ({ productFeatures }) => {
  const { togglePanel } = useContext(PanelContext)

  const handleView = (inView, entry) => {
    const $element = entry.target
    $element.setAttribute("opacity", "1")
    console.log($element)
    console.log("inView", inView)
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
            {feature.detail && (
              <>
                {/* <Detail>{feature.detail.detail}</Detail> */}

                <button onClick={() => togglePanel()}>
                  <AddIcon />
                </button>
              </>
            )}
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
  }
`

const ImageContainer = styled.div`
  height: calc(100vh - 12rem);
  width: 50vw;
  overflow: hidden;
`

const ContentContainer = styled.div`
  padding: 4rem 0rem;
  text-align: center;
  width: 30rem;
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
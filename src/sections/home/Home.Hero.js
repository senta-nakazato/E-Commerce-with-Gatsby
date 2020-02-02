import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import GatsbyImage from "gatsby-image"
import styled from "@emotion/styled"

import Button from "@components/Button"

const imageQuery = graphql`
  {
    file(relativePath: { eq: "hero-desktop-3.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 2000) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`

const HomeHero = () => {
  const data = useStaticQuery(imageQuery)
  const imageSrc = data.file.childImageSharp.fluid

  return (
    <Sticky>
      <Section id="home-hero">
        <HeroImage fluid={imageSrc} alt="Product Image" />
        <Container>
          <Headline>Meet Gatsby</Headline>
          <SubHeadline>
            A custom bottle for your wrinkles and no one else’s
          </SubHeadline>
          <Link to="/products">
            <Button text="Shop All" />
          </Link>
        </Container>
      </Section>
    </Sticky>
  )
}

export default HomeHero

const Sticky = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
`

const Section = styled.section`
  position: relative;
`

const HeroImage = styled(GatsbyImage)`
  height: 90vh;
  width: 100%;
`

const Container = styled.div`
  color: white;
  position: absolute;
  left: 6%;
  bottom: 20%;
  display: flex;
  flex-direction: column;
  text-align: left;
  max-width: 60rem;
`

const Headline = styled.h1`
  color: ${p => p.theme.colors.headline};
  color: white;
  font-family: ${p => p.theme.fonts.headline};
  font-size: 9rem;
  font-weight: 300;
  letter-spacing: 0.6px;
  line-height: 75px;
  margin-bottom: 3.2rem;
`

const SubHeadline = styled.p`
  color: ${p => p.theme.colors.subHeadline};
  color: white;
  font-family: ${p => p.theme.fonts.main};
  font-size: 3.2rem;
  font-weight: 500;
  letter-spacing: -0.2px;
  line-height: 1.63;
  margin-bottom: 3.2rem;
  width: 40rem;
`

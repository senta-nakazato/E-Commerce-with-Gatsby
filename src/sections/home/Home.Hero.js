import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import GatsbyImage from "gatsby-image"
import styled from "@emotion/styled"

const imageQuery = graphql`
  {
    file(relativePath: { eq: "hero-desktop.jpg" }) {
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
            あなたにあった、あなただけの洗顔液
            <br />
            さあ、これまで以上に美しく
          </SubHeadline>
          <Link to="/products">
            <Button>Shop All</Button>
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
  right: 10%;
  bottom: 16%;
  display: flex;
  flex-direction: column;
  text-align: center;
  max-width: 60rem;
`

const Headline = styled.h1`
  font-family: ${p => p.theme.fonts.headline};
  font-size: 9rem;
  font-weight: 150;
  letter-spacing: 0.6px;
  line-height: 75px;
  margin-bottom: 3.2rem;
`

const SubHeadline = styled.p`
  font-family: ${p => p.theme.fonts.main};
  font-size: 2.4rem;
  font-weight: 500;
  letter-spacing: -0.2px;
  line-height: 1.63;
  margin-bottom: 3.2rem;
`

const Button = styled.button`
  background: ${p => p.theme.colors.primary};
  color: white;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  padding: 0rem 4rem;
  height: 6rem;
  transition: all 300ms ease 0s;

  &:hover {
    background: white;
    color: ${p => p.theme.colors.primary};
  }
`

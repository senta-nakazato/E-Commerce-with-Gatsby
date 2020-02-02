import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import GatsbyImage from "gatsby-image"
import styled from "@emotion/styled"

import { formatPrice } from "@utils/index"

import ArrowIcon from "@icons/Arrow.Icon"

const imageQuery = graphql`
  {
    file(relativePath: { eq: "hero-desktop.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }
`

const OurStory = ({ product }) => {
  const data = useStaticQuery(imageQuery)
  const imageSrc = data.file.childImageSharp.fluid
  const url = "/about"

  return (
    <Section>
      <Grid>
        <ImageContainer>
          <Link to={url}>
            <Image fluid={imageSrc} />
          </Link>
        </ImageContainer>
        <Info>
          <Header>
            <Link to={url}>
              <Heading>OUR STORY</Heading>
              <Description>
                A conditioning spray for pubic hair and skin that hydrates and
                nourishes at every stage of growth.
              </Description>
            </Link>
          </Header>
          <ActionLink to={url} className="action-link">
            <Text>LEARN MORE</Text>
            <ArrowIcon />
          </ActionLink>
        </Info>
      </Grid>
    </Section>
  )
}

export default OurStory

const Section = styled.div`
  background: ${p => p.theme.colors.background};
  padding: 10rem 0;
  position: relative;
  z-index: 400;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns:
    [left] minmax(9%, 1fr) repeat(12, [col-start] minmax(0px, 70px) [col-end])
    minmax(9%, 1fr) [right];
  grid-column-gap: 1.5vw;
`
const Image = styled(GatsbyImage)`
  height: 100%;
  width: 100%;
`
const ImageContainer = styled.div`
  grid-column: left / 5 col-end;
  height: 32rem;
  width: 100%;
  overflow: hidden;

  &:hover + div .action-link {
    transform: translateX(1.2rem);
  }
`

const Info = styled.div`
  grid-column: 7 col-start / 12 col-end;
`

const Header = styled.div`
  padding: 4rem 0 2rem;
  margin-bottom: 3.2rem;

  &:hover + .action-link {
    transform: translateX(1.2rem);
  }
`

const Heading = styled.h2`
  font-size: 3.2rem;
  font-weight: 300;
  margin-bottom: 2rem;
  text-transform: uppercase;
`

const Description = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 1.92;
`

const Text = styled.span`
  font-size: 1.2rem;
  font-weight: 400;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
  margin-right: 8px;
`
const ActionLink = styled(Link)`
  transition: all 0.2s var(--ease-in-out-quad);

  &:hover {
    transform: translateX(1.2rem);
  }
`

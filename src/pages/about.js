import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import GatsbyImage from "gatsby-image"
import styled from "@emotion/styled"
import media from "@styles/media"

import Layout from "@components/layout"
import SEO from "@components/SEO"

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

const AboutPage = ({ location }) => {
  const data = useStaticQuery(imageQuery)
  const imageSrc = data.file.childImageSharp.fluid

  return (
    <Layout location={location}>
      <SEO title="Home" />
      <Wrapper>
        <GatsbyImage fluid={imageSrc} alt="Background Image" />
      </Wrapper>
    </Layout>
  )
}

export default AboutPage
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;

  ${media.desktop`
    height: auto;
  `}

  .gatsby-image-wrapper {
    width: 100%;
    height: 100%;
  }
`

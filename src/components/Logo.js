import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import GatsbyImage from "gatsby-image"
import styled from "@emotion/styled"

const imageQuery = graphql`
  {
    file(relativePath: { eq: "gatsby-icon.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`

const Logo = () => {
  const data = useStaticQuery(imageQuery)
  const imageSrc = data.file.childImageSharp.fluid

  return (
    <Container>
      <GatsbyImage fluid={imageSrc} />
    </Container>
  )
}

export default Logo

const Container = styled.div`
  width: 4rem;
  height: 4rem;
  margin: 44px;

  .gatsby-image-wrapper {
  }
`

import React from "react"
import { GatsbyImage } from "gatsby-image"
import styled from "@emotion/styled"

const Card = ({ children }) => {
  return (
    <Container>
      <GatsbyImage />
      {children}
    </Container>
  )
}

export default Card

const Card = styled.div``

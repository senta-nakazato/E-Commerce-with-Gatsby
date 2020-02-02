import React from "react"
import { css } from "@emotion/core"
import styled from "@emotion/styled"

const Grid = styled.div`
  display: grid;
  grid-column-gap: 1.5vw;
  grid-template-columns:
    [left] minmax(9%, 1fr) repeat(12, [col-start] minmax(0px, 70px) [col-end])
    minmax(9%, 1fr) [right];
  min-height: 100vh;
  margin-top: 10rem;

  ${p =>
    p.narrow &&
    css`
      display: grid;
      grid-template-columns: [left] repeat(12, [col-start] 1fr [col-end]) [right];
      grid-column-gap: 1.5vw;
      margin: 0px 1.5vw;
    `};
`

export default Grid

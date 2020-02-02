import React from "react"
import { css } from "@emotion/core"
import styled from "@emotion/styled"

/**
 *
 * @param {string} text label of button
 * @param {boolean} pink/white purple/pink/white background color of button
 *
 */

const Button = ({ pink, white, text, width = "auto" }) => (
  <Frame width={width} pink={pink} white={white}>
    {text}
  </Frame>
)

const Frame = styled.button`
  background: ${p => p.theme.colors.primary};
  color: white;
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  padding: 2rem 4rem;
  transition: all 300ms ease 0s;
  width: ${p => p.width};
  min-width: 20rem;

  &:hover {
    background: white;
    color: ${p => p.theme.colors.primary};
  }

  ${p =>
    p.pink &&
    css`
      background: #ff5e4d;

      &:hover {
        opacity: 0.8;
      }
    `};

  ${p =>
    p.white &&
    css`
      background: white;
      border: 1px solid ${p.theme.colors.primary};
      color: ${p.theme.colors.primary};

      &:hover {
        background: ${p.theme.colors.primary};
        color: white;
      }
    `}
`

export default Button

import React from "react"
import styled from "@emotion/styled"
import media from "@styles/media"

import InstagramIcon from "@icons/Instagram.Icon"
import FacebookIcon from "@icons/Facebook.Icon"

const SocialLinks = () => {
  return (
    <SNS>
      <FacebookIcon />
      <InstagramIcon />
    </SNS>
  )
}

export default SocialLinks

const SNS = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8rem;

  & > svg {
    margin: 0 2rem;
  }
`

import React from "react"
import { Link } from "gatsby"

import Layout from "@components/layout"

import SEO from "@components/SEO"

import HomeHero from "@sections/home/Home.Hero"
import HomeContent from "@sections/home/Home.Content"
import HomeCTA from "@sections/home/Home.CTA"
import OurStory from "@sections/OurStory"

const IndexPage = ({ location }) => {
  return (
    <Layout location={location}>
      <SEO title="Home" />
      <HomeHero />
      <HomeContent />
      <HomeCTA />
      <OurStory />
    </Layout>
  )
}

export default IndexPage

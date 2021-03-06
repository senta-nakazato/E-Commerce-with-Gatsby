import React from "react"
import Helmet from "react-helmet"
import { graphql, useStaticQuery } from "gatsby"

const seoQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            description
            social {
              url
            }
            siteUrl
            title
          }
        }
      }
    }
  }
`

const SEO = ({
  title,
  description,
  children,
  url,
  image,
  published,
  pathname,
  timeToRead,
}) => {
  const results = useStaticQuery(seoQuery)
  const site = results.allSite.edges[0].node.siteMetadata
  const twitter = site.social.find(option => option.name === "twitter") || {}

  const fullURL = path => (path ? `${site.siteUrl}${path}` : site.siteUrl)

  // If no image is provided lets looks for a default novela static image
  image = image ? image : "/preview.jpg"

  const metaTags = [
    { charset: "utf-8" },
    {
      "http-equiv": "X-UA-Compatible",
      content: "IE=edge",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      name: "theme-color",
      content: "#fff",
    },
    {
      rel: "canonical",
      href: fullURL(pathname),
    },
    { itemprop: "name", content: title || site.title },
    { itemprop: "description", content: description || site.description },
    { itemprop: "image", content: fullURL(image) },
    { name: "description", content: description || site.description },

    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: site.name },
    { name: "twitter:title", content: title || site.title },
    { name: "twitter:description", content: description || site.description },
    { name: "twitter:creator", content: twitter.url },
    {
      name: "twitter:image",
      content: fullURL(image),
    },

    { property: "og:title", content: title || site.title },
    { property: "og:url", content: url },
    { property: "og:image", content: fullURL(image) },
    { property: "og:description", content: description || site.description },
    { property: "og:site_name", content: site.name },
  ]

  if (published) {
    metaTags.push({ name: "article:published_time", content: published })
  }

  if (timeToRead) {
    metaTags.push({ name: "twitter:label1", value: "Reading time" })
    metaTags.push({ name: "twitter:data1", value: `${timeToRead} min read` })
  }

  return (
    <Helmet
      title={title || site.title}
      htmlAttributes={{ lang: "ja" }}
      meta={metaTags}
    >
      {children}
      <script src="https://js.stripe.com/v3/" />
      <link
        href="https://fonts.googleapis.com/css?family=Sawarabi+Mincho"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c"
        rel="stylesheet"
      />
    </Helmet>
  )
}

export default SEO

import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import GatsbyImage from "gatsby-image"
import styled from "@emotion/styled"
import media from "@styles/media"

import Checkout from "@components/Checkout/Checkout"

const booksQuery = graphql`
  query {
    skus: allStripeSku {
      nodes {
        attributes {
          name
        }
        currency
        id
        price
        localFiles {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`

const BookCollection = () => {
  const result = useStaticQuery(booksQuery)
  const skus = result.skus.nodes

  function formatPrice(price, currency) {
    let numberFormat = new Intl.NumberFormat(["ja-JP"], {
      style: "currency",
      currency: currency,
      currencyDisplay: "symbol",
    })
    return numberFormat.format(price)
  }

  return (
    <Frame>
      {skus.map(sku => (
        <Card key={sku.id}>
          <ImageContainer>
            <Image
              fluid={sku.localFiles[0].childImageSharp.fluid}
              alt={sku.attributes.name}
            />
          </ImageContainer>
          <Contents>
            <h4>{sku.attributes.name}</h4>
            <p>{formatPrice(sku.price, sku.currency)}</p>
            <Checkout sku={sku} />
          </Contents>
        </Card>
      ))}
    </Frame>
  )
}

export default BookCollection

const Frame = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

const Card = styled.div`
  border-radius: 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ImageContainer = styled.div`
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  overflow: hidden;
  width: 100%;
`

const Image = styled(GatsbyImage)`
  width: 100%;
  height: 300px;
`

const Contents = styled.div`
  text-align: center;
  padding: 2rem;
`

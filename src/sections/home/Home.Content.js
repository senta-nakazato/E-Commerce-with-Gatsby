import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import GatsbyImage from "gatsby-image"
import { css } from "@emotion/core"
import styled from "@emotion/styled"
import media from "@styles/media"

import Product from "./Home.Product"

const productsQuery = graphql`
  {
    products: allContentfulProduct(
      limit: 3
      filter: { isFeatured: { eq: true } }
    ) {
      nodes {
        images {
          fluid(maxWidth: 400) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
        name
        price
      }
    }
  }
`

const HomeContent = () => {
  const result = useStaticQuery(productsQuery)
  const products = result.products.nodes

  return (
    <Section>
      <Wrapper className="copy-writing">
        <CopyWriting>
          We’ve spent years developing products for nuanced parts of personal
          care rituals because we believe that when we show up for ourselves in
          private, we show up as ourselves in public.
        </CopyWriting>
      </Wrapper>

      <Wrapper>
        <Heading>GET TO KNOW OUR PRODUCTS</Heading>
        <Grid>
          {products.map((product, index) => (
            <ProductContainer index={index} key={index}>
              <Product product={product} />
            </ProductContainer>
          ))}
        </Grid>
      </Wrapper>
    </Section>
  )
}

export default HomeContent

const ProductContainer = styled.div`
  padding-bottom: 16rem;
  ${p => p.index === 0 && `grid-column: 1 col-start / 7 col-end;`};
  ${p => p.index === 1 && `grid-column: 5 col-start / 11 col-end;`};
  ${p => p.index === 2 && `grid-column: 2 col-start / 8 col-end;`};
`

const Wrapper = styled.div`
  background: ${p => p.theme.colors.background};

  &.copy-writing {
    padding: 100px 0px 80px;
    background: ${p => p.theme.colors.greyBackground};
  }
`

const Heading = styled.h3`
  color: ${p => p.theme.colors.headline};
  font-size: 2rem;
  font-weight: 300;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns:
    [left] minmax(9%, 1fr) repeat(12, [col-start] minmax(0px, 70px) [col-end])
    minmax(9%, 1fr) [right];
  grid-column-gap: 1.5vw;
  overflow: hidden;
`

const Section = styled.section`
  background: rgb(250, 245, 243);
  position: relative;
  z-index: 200;
  width: 100%;
`

const CopyWriting = styled.p`
  color: ${p => p.theme.colors.headline};
  font-size: 2rem;
  font-weight: 400;
  letter-spacing: 1px;
  line-height: 1.6;
  text-transform: none;
  text-align: center;
  margin: 0 auto 25px;
  width: 48rem;

  ${media.phablet`
    font-size: 18px;
    width: 80%
  `}
`

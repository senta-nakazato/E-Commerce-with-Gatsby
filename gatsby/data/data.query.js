const GatsbyFluid_withWebp = `
  base64
  aspectRatio
  src
  srcSet
  srcWebp
  srcSetWebp
  sizes
`

module.exports.contentful = {
  products: `{
    products: allContentfulProduct {
      nodes {
        colors {
          hex
          name
        }
        images {
          regular: fluid(maxWidth: 653, quality: 100) {
            ${GatsbyFluid_withWebp}
          }
          small: fluid(maxWidth: 200, quality: 100) {
            ${GatsbyFluid_withWebp}
          }
          seo: fixed(width: 1200, quality: 100) {
            src
          }
        }
        name
        price    
        description {
          description
        }
      }
    }
  }`,
}

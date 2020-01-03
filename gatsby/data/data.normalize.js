function normalizeImage(product) {
  let images = {
    regular: {},
    small: {},
    seo: {},
  }

  if (product.images) {
    images = {
      regular: product.images.regular.fluid,
      small: product.images.narrow.fluid,
      seo: product.images.seo.fixed,
    }
  } else {
    console.log("\u001B[33m", `Missing hero for "${product.title}"`)
  }

  return hero
}

module.exports.contentful = {
  posts: post => {
    return {
      ...post,
      content: post.content.childMdx.body,
      timeToRead: post.content.childMdx.timeToRead,
    }
  },
}

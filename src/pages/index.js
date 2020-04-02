import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Post from "./../components/Post"
import "./index.css"

const Index = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />
      <div>
        <h4>Total posts: {data.allMarkdownRemark.totalCount}</h4>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <Post key={node.id} data={{ ...node }} />
        ))}
      </div>
    </Layout>
  )
}
export default Index

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            description
          }
          fields {
            slug
          }
          excerpt(truncate: true)
        }
      }
    }
  }
`

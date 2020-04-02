import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "./index.css"

const Index = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />
      <div>
        <h4>Total posts: {data.allMarkdownRemark.totalCount}</h4>
        {data.allMarkdownRemark.edges.map(({ node }) => {
          return (
            <div key={node.id}>
              <Link to={node.fields.slug}>
                <div className="header">
                  <h2>{node.frontmatter.title} </h2>
                  <p>{node.frontmatter.date}</p>
                </div>
                <p>{node.frontmatter.description || node.excerpt}</p>
              </Link>
              <hr />
            </div>
          )
        })}
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

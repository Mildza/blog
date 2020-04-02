import React from "react"

import { Link } from "gatsby"

import "./Post.scss"

const Post = ({ data }) => {
  return (
    <div className="default">
      <Link to={data.fields.slug}>
        <div className="header">
          <h2>{data.frontmatter.title} </h2>
          <p>{data.frontmatter.date}</p>
        </div>
        <p>{data.frontmatter.description || data.excerpt}</p>
      </Link>
      <hr />
    </div>
  )
}

export default Post

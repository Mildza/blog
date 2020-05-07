import React from "react"

import { Link } from "gatsby"

import "./Post.css"

const Post = ({ data: { fields, frontmatter, excerpt } }) => {
  return (
    <div>
      <Link to={fields.slug}>
        <div className="header">
          <h2>{frontmatter.title} </h2>
          <p>{frontmatter.date}</p>
        </div>
        <p>{frontmatter.description || excerpt}</p>
      </Link>
      <hr />
    </div>
  )
}

export default Post

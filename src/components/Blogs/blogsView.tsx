import React from "react"
import IBlogData from "../../Interfaces/IBlogData"

export type blogProps = {
  blog: IBlogData
}
const BlogsView = ({ blog }: blogProps) => {
  return (
    <div className="col-4 u-equal-height">
      <div
        className="p-card p-card--highlighted u-align-text--left"
        data-cy="blog_card"
      >
        <header className="p-card__header">
          <h5 data-cy="header">{blog.header}</h5>
        </header>
        <hr />
        <div className="p-card__content">
          <a href={blog.link}>
            <img className="p-card__image" src={blog.img} alt={blog.title} />
          </a>
          <h4>
            <a data-cy="title" href={blog.link}>
              {blog.title}
            </a>
          </h4>
          <p>
            <em>
              {" By "}
              <a href={blog.authorLink}>{blog.author}</a>
              {` on ${blog.date.getDate()} ${blog.date.toLocaleString("en-US", { month: "long" })} ${blog.date.getFullYear()} `}
            </em>
          </p>
        </div>
        <div className="p-card__footer">
          <hr />
          <p> {blog.footer} </p>
        </div>
      </div>
    </div>
  )
}

export default BlogsView

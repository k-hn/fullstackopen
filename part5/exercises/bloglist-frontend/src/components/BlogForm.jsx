const BlogForm = (props) => {
  return (
    <form onSubmit={props.handleBlogSubmit}>
      <div>
        title
        <input
          type="text"
          value={props.blogTitle}
          onChange={(event) => props.setBlogTitle(event.target.value)}
        />
      </div>

      <div>
        author
        <input
          type="text"
          value={props.blogAuthor}
          onChange={(event) => props.setBlogAuthor(event.target.value)}
        />
      </div>

      <div>
        url
        <input
          type="text"
          value={props.blogURL}
          onChange={(event) => props.setBlogURL(event.target.value)}
        />
      </div>

      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
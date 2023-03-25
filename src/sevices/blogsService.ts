import axios from "axios"
import IBlogData from "../Interfaces/IBlogData"

/**
 *  Fetch posts data from api & Returns response
 */
const fetchBlogsData = async () => {
  try {
    const response = await axios.request({
      method: "GET",
      url: "https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json",
    })
    return response
  } catch (err: any) {
    console.error("Failed To Load Blogs Data", err)
    return err
  }
}

/**
 * Returns blogs data mapped IBlogData interface 
 * @param {Array} blogsApiData array of blogs from api response
 * @return {Array} array of mapped blogs 
 */
const blogsDataMap = (blogsApiData: Array<Object>) => {
  // INFO => all empty strings can be replaced with default data in case no data in blog 
  var mappedBlogs: Array<IBlogData> = []
  for (let i = 0; i < blogsApiData.length; i++) {
    const blogElement: any = blogsApiData[i]
    mappedBlogs.push({
      id: blogElement.id,
      header: getHeader(blogElement._embedded["wp:term"]) || "",
      title: blogElement.title.rendered || "",
      img: blogElement.featured_media,
      author: blogElement._embedded.author[0].name || "",
      authorLink: blogElement._embedded.author[0].link || "",
      date: new Date(blogElement.date) || new Date(),
      link: blogElement.link || "",
      footer: getGategory(blogElement._embedded["wp:term"]) || "",
    })
  }
  return mappedBlogs
}

/**
 * Returns post header string from post meta data
 * @param {Array} wpTerm array of meta data of post
 * @return {String} 
 */
const getHeader = (wpTerm: Array<[]>) => {
  let topicElem: any = wpTerm.filter((elem: any) => elem[0]?.taxonomy === "topic")[0]
  if (!topicElem) {
    topicElem = wpTerm.filter((elem: any) => elem[0]?.taxonomy === "post_tag")[0]
  }
  return topicElem[0]?.name
}


/**
 * Returns post category string from post meta data
 * @param {Array} wpTerm array of meta data of post
 * @return {String} 
 */
const getGategory = (wpTerm: Array<[]>) => {
  let categoryElem: any = wpTerm.filter((elem: any) => elem[0]?.taxonomy === "category")[0]
  return categoryElem[0]?.name.slice(0, -1)
}

export { fetchBlogsData, blogsDataMap }

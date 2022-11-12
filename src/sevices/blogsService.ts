import axios from "axios";
import IBlogData from "../Interfaces/IBlogData";

const fetchBlogsData = async () => {
  try {
    const response = await axios.request({
      method: "GET",
      url: "https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json",
    });
    return response;
  } catch (err: any) {
    console.error("Failed To Load Blogs Data", err);
    return err;
  }
};

const blogsDataMap = (blogsApiData: Array<Object>) => {
  var mappedBlogs: Array<IBlogData> = [];
  for (let i = 0; i < blogsApiData.length; i++) {
    const blogElement: any = blogsApiData[i];
    mappedBlogs.push({
      id: blogElement.id,
      header:
          blogElement._embedded["wp:term"][2][0]?.name ||
          blogElement._embedded["wp:term"][1][0]?.name ||
          "",
      title: blogElement.title.rendered || "",
      img: blogElement.featured_media,
      author: blogElement._embedded.author[0].name || "",
      authorLink: blogElement._embedded.author[0].link || "",
      date: new Date(blogElement.date) || new Date(),
      link: blogElement.link || "",
      //INFO => Article is hardcoded as i don't understand which part of API is responsible for decide footer
      footer: "Article",
    });
  }
  return mappedBlogs;
};

export { fetchBlogsData, blogsDataMap };

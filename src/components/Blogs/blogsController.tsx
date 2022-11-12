import React, { useEffect, useState } from "react";
import IBlogData from "../../Interfaces/IBlogData";
import { blogsDataMap, fetchBlogsData } from "../../sevices/blogsService";
import BlogsView from "./blogsView";

const BlogsController = () => {
  const [blogsData, setBlogsData] = useState<IBlogData[]>([]);

  useEffect(() => {
    fetchBlogsData().then((response) => {
      setBlogsData(blogsDataMap(response.data));
    });
  }, []);

  return (
    <div>
      {blogsData.length !== 0 && (
        <div className="row">
          {blogsData.map((blog: IBlogData) => {
            return <BlogsView key={blog.id} blog={blog} />;
          })}
        </div>
      )}
    </div>
  );
};

export default BlogsController;

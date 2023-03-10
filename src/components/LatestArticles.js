import React, { useState, useEffect } from "react";
import Article from "./Article";
import "../Article.css";

function LatestArticles() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const articleGrabber = () => {
      fetch("/api/posts?per_page=10")
        .then((response) => response.json())
        .then((data) => {
          setPosts(data);
          console.log(data);
        })
        .catch((error) =>
          console.log("Authorization failed: " + error.message)
        );
    };

    articleGrabber();
  }, []);

  return (
    <div className="article-container">
      {posts.map((post, index) => (
        <ul key={index}>
          <Article post={post} />
        </ul>
      ))}
    </div>
  );
}

export default LatestArticles;

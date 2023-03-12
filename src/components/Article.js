import React from "react";
import "../Article.css";

function Article({ post }) {
  const length = 200;

  const title = post.title.replaceAll("&#8217;", "'");

  const excerpt = post.excerpt.replaceAll("<p>", "");
  const excerpt2 = excerpt.replaceAll("</p>", "");
  const excerpt3 = excerpt2.replaceAll("&#8216;", "'");
  const excerpt4 = excerpt3.replaceAll("&#8217;", "'");
  const excerpt5 = excerpt4.replaceAll("[&hellip;]", "...");
  const excerpt6 = excerpt5.replaceAll("&#8211;", "...");

  function shortenString(str, length) {
    if (str.length > 200) {
      return str.substring(0, length - 3) + "...";
    } else {
      return str;
    }
  }

  const excerpt7 = shortenString(excerpt6, length);

  return (
    <div className="article">
      <h3 className="title">{title}</h3>
      <p className="excerpt">{excerpt7}</p>
      <a href={post.link} className="link">
        Full article
      </a>
    </div>
  );
}

export default Article;

//      <p className="excerpt">{excerpt7}</p>
//<a className="link" href={post.link}>
//Full article
//</a>

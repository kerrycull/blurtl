import React, { useState, useEffect } from "react";
import Article from "./Article";
import "../Article.css";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

function LatestArticles() {
  const [posts, setPosts] = useState([]);
  const [newPosts, setNewPosts] = useState([]);

  async function addPost(thePost) {
    if (posts.find((post) => post.id === thePost.id)) {
      //console.log("already exists");
      return;
    }
    if (thePost.id === undefined) {
      //console.log("postId is undefined");
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        id: thePost.id,
        title: thePost.title,
        excerpt: thePost.excerpt,
        link: thePost.link,
      });
      //console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const articleGrabber = () => {
    //console.log("grabbing");
    fetch(
      "https://cryptonews-api.com/api/v1/category?section=general&items=50&extra-fields=id&page=1&token=5ouww0nypihcbvkubvklapfqvqwh4d3ibeniydyv"
    )
      .then((response) => response.json())
      .then((data) => {
        setNewPosts(data.data);
      })
      .catch((error) => console.log("Authorization failed: " + error.message));
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push(doc.data());
      });
      posts.sort((a, b) => b.id - a.id); // sort by id in descending order
      setPosts(posts.slice(0, 10)); // get the 10 most recent posts
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      articleGrabber();
    }, 180000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    console.log(newPosts);
    newPosts.forEach((post) => {
      if (!posts.find((p) => p.id === post.id)) {
        addPost({
          id: post.news_id,
          title: post.title,
          excerpt: post.text,
          link: post.news_url,
        });
      }
    });
  }, [newPosts]);

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

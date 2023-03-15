import React, { useState, useEffect, useCallback } from "react";
import Article from "./Article";
import "../Article.css";
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useKeepAwake } from "@sayem314/react-native-keep-awake";

function LatestArticles() {
  useKeepAwake();
  const [posts, setPosts] = useState([]);
  const [newPosts, setNewPosts] = useState([]);
  const [page, setPage] = useState(1);

  const addPost = useCallback(
    async (thePost) => {
      if (posts.find((post) => post.id === thePost.id)) {
        //console.log("already exists");
        return;
      }
      if (thePost.id === undefined) {
        console.log("postId is undefined");
        return;
      }
      if (thePost.upvotes || thePost.downvotes >= 0) {
        const docRef = await addDoc(collection(db, "posts"), {
          id: thePost.id,
          title: thePost.title,
          excerpt: thePost.excerpt,
          link: thePost.link,
          upvotes: thePost.upvotes,
          downvotes: thePost.downvotes,
          docId: null,
        });
        const docRef2 = doc(db, `posts/${docRef.id}`);
        await updateDoc(docRef2, { docId: docRef.id });
        return;
      }
      try {
        const docRef = await addDoc(collection(db, "posts"), {
          id: thePost.id,
          title: thePost.title,
          excerpt: thePost.excerpt,
          link: thePost.link,
          docId: null,
          upvotes: thePost.upvotes,
          downvotes: thePost.downvotes,
        });
        const docRef2 = doc(db, `posts/${docRef.id}`);
        await updateDoc(docRef2, { docId: docRef.id });
        //console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    [posts]
  );

  const articleGrabber = () => {
    console.log("fetching articles");
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
      setPosts(posts.slice(0, page * 10)); // get the 10 most recent posts
      //console.log(posts);
    });

    return unsubscribe;
  }, [page]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      articleGrabber();
    }, 180000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    //console.log(newPosts);
    newPosts.forEach((post) => {
      if (!posts.find((p) => p.id === post.id)) {
        addPost({
          id: post.news_id,
          docId: post.docId,
          title: post.title,
          excerpt: post.text,
          link: post.news_url,
          upvotes: 0,
          downvotes: 0,
        });
      }
    });
  }, [newPosts, posts, addPost]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop;
      const scrollHeight =
        (document.documentElement && document.documentElement.scrollHeight) ||
        document.body.scrollHeight;
      const clientHeight =
        document.documentElement.clientHeight || window.innerHeight;
      const scrolledToBottom =
        Math.ceil(scrollTop + clientHeight) >= scrollHeight;

      if (scrolledToBottom) {
        setPage(page + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [page]);

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

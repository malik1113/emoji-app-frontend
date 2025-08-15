import React, { useState, useEffect } from "react";
//useState → lets your app store and update variables that persist across re-renders. Manages variables that change (e.g., posts, emoji list, current view).

//useEffect → lets your app run certain code at specific times (like when the page loads). Runs side effects like fetching data from your backend.


import ComposeTranslator from "./components/ComposeTranslator";
import Chatter from "./components/Chatter";
import EmojiLibrary from "./components/EmojiLibrary";
import "./App.css";
//ComposeTranslator → for typing text and getting emoji translations.
//Chatter → for viewing emoji-based posts. where all posts appear in a chat-style feed.
//EmojiLibrary → for browsing the full emoji set.
//Imports your CSS styles.


const mockUsers = [
  { id: "u1", name: "Bronx Marcus" },
  { id: "u2", name: "Kush Harlem" },
];
//Creates a fake list of users (hard-coded for now) so the app has something to work with before real authentication is built. Just placeholder users since you don’t have authentication yet. Will be used for author info when posting.


function App() {
  const [view, setView] = useState("home");
  //view → which page you’re currently looking at: "home", "chatter", or "library". Controls which screen you see.

  const [posts, setPosts] = useState([]); // live posts
  //posts → an array of emoji posts (chat messages) fetched from the backend MongoDB.

  const [emojiMap, setEmojiMap] = useState([]); // live emoji DB
  //emojiMap → an array of all emojis fetched from the backend.

  const users = mockUsers;
  //users → just your mock data.

  const currentUser = users[0];
  //currentUser → picks the first user (Bronx Marcus) as the logged-in user.

  
  useEffect(() => {
    const fetchEmojis = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/emojis");
        const data = await res.json();
        if (data && data.payload) {
          setEmojiMap(data.payload);
        }
      } catch (err) {
        console.error("Failed to fetch emojis:", err);
      }
    };
    fetchEmojis();
  }, []);
  // Fetch live emojis Runs once when the app loads ([] means “no re-runs”) (empty [] dependency array). Calls your backend (/api/emojis) to get emoji data.
  //Stores it in emojiMap, if it gets a payload, updates emojiMap state with fresh emoji data from your database.



  // Fetch live posts from backend Pulls all existing posts and stores them in posts. Loads your “chat feed” when the app starts. no dependencies
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/posts");
        const data = await res.json();
        if (data && data.payload) {
          setPosts(data.payload); // populate posts from DB
        }
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };
    fetchPosts();
  }, []);


  const handlePost = async ({ emojiMessage, originalText, author }) => {
    // Create post object
    if (!emojiMessage?.trim()) return; 
    //Validates input — if there’s no emojiMessage, it does nothing.
    
    const newPost = {
      emojiMessage,
      originalText,
      author,
    };

    try {
      const res = await fetch("http://localhost:3001/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      const data = await res.json();

      if (data && data.payload) {
        setPosts([...posts, data.payload]); // add live DB post
        setView("chatter");
      }
    } catch (err) {
      console.error("Failed to create post:", err);
    }
  };
  //Checks if the message has actual content (ignores empty/whitespace).
  //Sends a POST request to /api/posts with the new message.
  //If the backend confirms it saved the post, updates the posts list so the new post appears without refreshing.
  //Switches the app’s view to "chatter" so you immediately see the post.


  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🛕 HOOD-ROGLIPHICS 🛕</h1>
        <nav>
        {/* Header — Title and navigation buttons. Clicking a button updates view state. */}
          {["home", "chatter", "library"].map((navView) => (
            <button
              key={navView}
              onClick={() => setView(navView)}
              className={`nav-btn ${view === navView ? "active" : ""}`}
            >
              {/* Shows title and navigation bar. Nav buttons change view state. */}
              {navView.charAt(0).toUpperCase() + navView.slice(1)}
            </button>
          ))}
        </nav>
      </header>

      {/* The main section changes depending on which view is active:
      home → shows ComposeTranslator to make a new post. chatter → shows the list of all posts.library → shows the emoji library. */}
      <main className="app-main">
        {view === "home" && (
          <ComposeTranslator
            onPost={handlePost}
            author={currentUser}
            emojiMap={emojiMap}
          />
        )}
        {view === "chatter" && <Chatter posts={posts} users={users} />}
        {view === "library" && <EmojiLibrary emojiMap={emojiMap} />}
        {/* Home → ComposeTranslator form. Chatter → Live post feed.Library → Emoji list. */}
      </main>
    </div>
  );
}

export default App;

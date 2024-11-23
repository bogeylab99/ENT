import React, { useState, useEffect } from "react";
import { auth, provider } from "./firebaseConfig";
import { signInWithPopup, signOut } from "firebase/auth";
import Chat from "./chat";
import PostForm from "./PostForm";
import PostList from "./PostList";
import "./index.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  const handleLogin = async () => {
    const result = await signInWithPopup(auth, provider);
    setUser(result.user);
  };

  const handleLogout = () => {
    signOut(auth);
    setUser(null);
  };

  return (
    <div className="app">
      <header>
        <h1>ENTERTAINMENT😂😅</h1>
        {user ? (
          <div>
            <span>Welcome, {user.displayName}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <button onClick={handleLogin}>Login with Google</button>
        )}
      </header>
      <main>
        {user ? (
          <div className="content-container">
            <Chat user={user} />
            <div>
              <PostForm onAddPost={(content) => setPosts([content, ...posts])} />
              <PostList posts={posts} />
            </div>
          </div>
        ) : (
          <p>Please log in to access the app.</p>
        )}
      </main>
    </div>
  );
};

export default App;

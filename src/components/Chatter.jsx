import React, { useState } from "react";

const Chatter = ({ posts, users }) => {
  const [selected, setSelected] = useState(null);
  //Keeps track of which post (by index) is currently expanded to show the original text. null means no post is selected.


  const getAuthorName = (id) => users.find((u) => u.id === id)?.name || "Unknown";
  //Finds the user by their id from the users prop. Uses optional chaining (?.) to avoid errors if the user isn’t found. Falls back to "Unknown" if no match.


  return (
    <div className="chatter-container">
      {posts.map((post, index) => (
        // Loops through all posts. Uses post.id for React’s key prop.
        <div
          key={post.id}
          className="chatter-post"
          onClick={() => setSelected(selected === index ? null : index)}
          // If you click the same post twice, it collapses (null).Clicking a different one selects it.
        >
          <strong>{getAuthorName(post.author)}</strong>

          {/* Emoji line with green dots If there’s an emojiMessage array, it loops through: Renders each emoji. Adds a • dot after each emoji except the last.   */}
          <p className="chatter-text">
            {post.emojiMessage
              ? post.emojiMessage.map((emoji, i, arr) => (
                  <React.Fragment key={i}>
                    <span className="emoji-char">{emoji}</span>
                    {i < arr.length - 1 && <span className="emoji-dot">•</span>}
                  </React.Fragment>
                ))
              : "…"}
          </p>

          {/* Original text below emojis, shown when toggled Only renders when the current post is selected. Displays the original text version under the emojis.*/}
          {selected === index && (
            <p className="chatter-translation">{post.originalText}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Chatter;

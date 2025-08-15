import React, { useState, useEffect } from "react";

const ComposeTranslator = ({ onPost, author, emojiMap }) => {
  //State for user's text input
  const [text, setText] = useState("");

  // State for translated emoji array
  const [translation, setTranslation] = useState([]);

  //State for error messages
  const [error, setError] = useState("");

  //Props: onPost (function): Callback function to handle posting a translated message.
  //author (object): The current user (must have an `id` property).
  //emojiMap (array): Array of emoji objects, each with: { symbol: "😊", words: ["happy", "smile"] }


  // Translate input text to emojis
  const translateText = (input) => {
    const words = input
      .toLowerCase()   // lowercase it
      .replace(/[.,!?]/g, "") // Remove punctuation
      .split(/\s+/);  // Split into words


    // Map each word to matching emoji or leave as text
    const emojiWords = words.map((word) => {
      const match = emojiMap.find((e) =>
        e.words.some((w) => w.toLowerCase() === word)
      );
      return match ? match.symbol : word;
    });

    return emojiWords; // keep as array for posting and for flexibility
  };


  // Validates input and updates the `translation` state with the emoji conversion of the current `text` value.
  const handleTranslate = () => {
    if (!text.trim()) {
      setError("Please enter text to translate.");
      return;
    }
    setError("");
    setTranslation(translateText(text));
  };

  const handlePost = () => {
    if (!translation.length) {
      setError("Translate before posting.");
      return;
    }
    setError("");

    // Send post data to parent component / backend
    onPost({
      emojiMessage: translation, // send as array to backend
      originalText: text,
      author: author.id,
    });

    setText("");
    setTranslation([]);
  };


  // In your return block, you’re telling React exactly what UI this ComposeTranslator component should render, and how it should respond to user interactions.
  return (
    // stops the browser from reloading when the form is submitted (since we’re handling everything with buttons instead of a traditional form submit).
    <form onSubmit={(e) => e.preventDefault()} className="compose-translator">
      {/* Creates a form container with a CSS class compose-translator */}
      <label htmlFor="message">Your Message</label>
      {/* A label and a textarea for the user to type their message. */}
      <textarea
        id="message"
        value={text}  
        // The value={text} makes it a controlled component tied to the text state.
        onChange={(e) => setText(e.target.value)}
        //onChange updates text in state as the user types.
        placeholder="Type your message..."
      />
      {error && <p className="error-text">{error}</p>}

      <div className="button-group">
        <button type="button" className="btn-translate" onClick={handleTranslate}>
        {/* Translate button → Runs handleTranslate() when clicked (turns text into emojis). */}
        </button>
        <button
          type="button"
          className="btn-post"
          onClick={handlePost}
          // disabled={!translation.length} prevents posting until there’s a translation.
          disabled={!translation.length}
        >
          {/* Post button → Runs handlePost() when clicked (sends the translation to the backend via onPost) */}
          Post
        </button>
      </div>


      {/* Only shows this block if there’s at least one emoji in translation. */}
      {translation.length > 0 && (
        <div className="emoji-display">
          {/* Loops through translation array and: Displays each emoji.Adds a • dot between emojis (but not after the last one). */}
          {translation.map((emoji, i) => (
            <React.Fragment key={i}>
              <span className="emoji-char">{emoji}</span>
              {i < translation.length - 1 && <span className="emoji-dot">•</span>}
            </React.Fragment>
            // React.Fragment lets you return multiple elements without adding an extra HTML wrapper.
          ))}
        </div>
      )}
    </form>
  );
};

export default ComposeTranslator;

import React, { useState } from "react";

const EmojiLibrary = ({ onAddEmoji }) => {
  const [emojiLabel, setEmojiLabel] = useState("");
  //emojiLabel → Text description (like “alien” or “party”).

  const [emojiSymbol, setEmojiSymbol] = useState("");
  //emojiSymbol → The actual emoji character (like 👽 or 🎉).

  const [error, setError] = useState("");
  // error → Holds validation messages when inputs are missing.

  const handleAdd = () => {
    if (!emojiLabel.trim() || !emojiSymbol.trim()) {
      //Prevents empty submissions. Shows an error if either field is blank or just spaces.

      setError("Both Label and Emoji symbol are required.");
      return;
    }
    setError("");
    onAddEmoji({ symbol: emojiSymbol, label: emojiLabel });
    // Calls the parent component’s onAddEmoji function (this is key — EmojiLibrary doesn’t store the new emoji list itself, it hands that responsibility to its parent).

    setEmojiLabel("");
    setEmojiSymbol("");
    // Then clears both inputs for the next emoji.
  };

  return (
    <div className="emoji-library">
      <h2>Add Custom Emoji</h2>
      {error && <p className="error-text">{error}</p>}
      <input
        placeholder="Label"
        value={emojiLabel}
        onChange={(e) => setEmojiLabel(e.target.value)}
      />
      <input
        placeholder="Emoji"
        value={emojiSymbol}
        onChange={(e) => setEmojiSymbol(e.target.value)}
      />
      <button onClick={handleAdd}>Add Emoji</button>
    </div>
  );
};

export default EmojiLibrary;
//UI Flow
//User types label and emoji.
// Click Add Emoji.
//If valid → Calls parent’s handler, resets fields.
//If invalid → Shows red error message.


//CHATGPT: Possible Improvements
//Keyboard Submit → Let users press Enter to add emoji.

//Better Validation → Check that emojiSymbol contains at least one Unicode emoji (not just letters).

//Async Save → Call a backend API to store the emoji in MongoDB directly.

//Live Preview → Show the emoji and label together as the user types.
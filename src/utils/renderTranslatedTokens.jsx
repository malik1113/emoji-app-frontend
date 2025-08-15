import React from "react";
import Dot from "../components/Dot";

//If each item in your array has a unique ID (like item.id), use key={item.id} instead of the index — it’s safer and better for performance.  <React.Fragment key={i}>

export function renderTokens(tokens) {
  return tokens.map((item, i) => (
    //item = the current element from the tokens array during that specific loop iteration.
    //i = the index of the current element in the array.

    <React.Fragment key={i}>
      {/* React uses keys to identify which elements have changed, been added, or removed when it re-renders a list. */}
      {/* Here, you’re passing the index (i) of the element in the array as the key. */}
      {/* Example: First item gets key={0}
       Second item gets key={1}
       Third item gets key={2} */}
       {/* Normally fragments don’t take a key, but in a list (like your tokens.map(...)), you must provide a key for the outermost element returned by each loop iteration. Since a fragment is your wrapper, the key goes there. */}

      <span
        style={{
          color: item.type === "unknown" ? "red" : "inherit",
          backgroundColor: item.type === "unknown" ? "rgba(169, 79, 79, 0.1)" : "transparent",
          borderRadius: "3px",
          padding: "0 2px",
          fontSize: "1.5rem",
          lineHeight: "1.5rem",
          display: "inline-block"
        }}
      >
        <span>{item.value}</span>
      </span>

      {i < tokens.length - 1 && <Dot />}
    </React.Fragment>
  ));
}

//<React.Fragment key={i}>
//This works okay for static lists (ones that don’t change order), but if the array’s order changes or items are inserted/removed, using the index as the key can cause unexpected rendering glitches.






//Possible Improvements

//Accessibility: Add aria-label or title to unknown tokens so users know why they’re red.

//Styling class: Instead of inline styles, move them to a CSS class (easier to maintain and theme).

//Custom dot behavior: Allow passing a separator prop to swap Dot with something else (e.g., a comma or space).

//Click action: Let users click an unknown token to open a modal (EmojiModal) suggesting possible matches.

//CHATGPT: If you want, I can connect this renderTokens function to your EmojiModal so when a user clicks a red “unknown” token, it pops up a modal showing possible emoji matches.


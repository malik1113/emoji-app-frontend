import emojisMap from "./emojisMap.json";
// imports array of emoji objects

export function tokenizeMessage(message) {
  //function takes string "message"

  const words = message.trim().split(/\s+/);
  //Removes whitespace at the start and end (trim()). Then splits the string into an array of words based on any amount of whitespace (split(/\s+/)).

  return words.map(word => {
    //Iterates over each word in the message.map transforms each word into a new object.

    const match = emojisMap.find(e => e.words.some(w => w.toLowerCase() === word.toLowerCase()));
    //For each word, it searches the emoji map to see if any emoji’s words array contains a match.
    //.some() returns true if at least one word matches (case-insensitive).

    return match ? { type: "emoji", value: match.symbol } : { type: "unknown", value: word };
  });
  // If a match is found, return an object with: 
  // type: "emoji" → marks it as an emoji. 
  // value: match.symbol → the emoji itself.

  //If no match, return:
  // type: "unknown" → not in your emoji map.
  // value: word → keeps the original word.
}

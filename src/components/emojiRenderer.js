// src/components/emojiRenderer.js
import React from "react";
import Dot from "./Dot";

export function renderTokens(tokens) {
  return tokens.map((item, i) => (
    <React.Fragment key={i}>
      <span
        style={{
          color: item.type === "unknown" ? "red" : "inherit",
          backgroundColor: item.type === "unknown" ? "rgba(255,0,0,0.1)" : "transparent",
          borderRadius: "3px",
          padding: "0 2px",
          fontSize: "1.5rem",
          lineHeight: "1.5rem",
          display: "inline-block"
        }}
      >
        {item.value}
      </span>
      {i < tokens.length - 1 && <Dot />}
    </React.Fragment>
  ));
}

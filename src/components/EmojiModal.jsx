import React from "react";

const EmojiModal = ({ isOpen, onClose, emoji }) => {
  if (!isOpen) return null;
  //If isOpen is false, React renders nothing at all (modal stays hidden).Keeps DOM clean when not in use.

  return (
    <div className="emoji-modal-backdrop" onClick={onClose}>
      {/* Clicking the dark background closes the modal. That’s good UX — easy to dismiss without finding the button. */}

      <div className="emoji-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Prevents clicks inside the modal from triggering the backdrop’s onClick. Without this, clicking anywhere (even the emoji) would close the modal. */}

        <span className="emoji-large">{emoji}</span>
        <button onClick={onClose}>Close</button>
        {/* Shows a large emoji in the center. Simple close button*/}
      </div>
    </div>
  );
};

export default EmojiModal;
//Props
//isOpen → Boolean to control visibility.
//onClose → Callback to close the modal (usually from parent state).
//emoji → The emoji to display in the modal.

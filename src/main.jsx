import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
//This is your app’s entry point. React mounts your <App /> component into the HTML page inside the element with id="root".

//Imports StrictMode from React — this helps highlight potential problems in your app during development.

//Imports createRoot from react-dom/client — this is how React 18+ creates the root for rendering your app.

//Imports global CSS for your app.

//Imports your main App component.


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
//Finds the HTML element with the id="root" (usually in index.html).

//Creates a React root at that element.

//Renders your app (<App />) wrapped in <StrictMode> — this adds extra checks and warnings for development but does not affect production behavior.




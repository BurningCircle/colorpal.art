import React from "react"
import ReactDOM from "react-dom"
import "./index.sass"
import App from "./App"
import { Provider } from "@/state/Context.js"

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)

import React from "react"
import "./App.sass"
import { Menu } from "@components"
import { MainPage } from "@pages"

function App() {
  return (
    <div className="App">
      <Menu />
      <MainPage />
    </div>
  )
}

export default App

import React, { useContext } from "react"
import "./App.sass"
import { Menu } from "@components"
import { MainPage } from "@pages"
import { Context } from "@/state/Context.js"

function App(props) {
  console.log(useContext(Context))
  return (
    <div className="App">
      <Menu />
      <MainPage />
    </div>
  )
}

export default App

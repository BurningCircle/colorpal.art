import React, { useContext } from "react"
import "./index.sass"
import { Logo, TextButton } from "@components"
import { Context } from "@/state/Context.js"

export const Menu = () => {
  let context = useContext(Context)
  return (
    <nav className="menu">
      <Logo />
      <TextButton onClick={context.changeLocalization}>{context.localization.changeTo}</TextButton>
    </nav>
  )
}

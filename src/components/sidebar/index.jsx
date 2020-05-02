import React, { useContext } from "react"
import { BaseButton } from "@components"
import { Context } from "@/state/Context.js"
import { ColorPick } from "./_ColorPick"
import "./index.sass"

const Header = ({ localization }) => (
  <div className="sidebar__header">
    <div className="sidebar__title">
      {localization.current === "RU" ? "Параметры цвета" : "Color parameters"}
    </div>
    <span className="sidebar__splitter bold"></span>
  </div>
)

export const Sidebar = () => {
  const { localization, colorPickers, addColorPicker } = useContext(Context)

  return (
    <div className="sidebar">
      <Header localization={localization} />
      <div className="sidebar__color-pickers">
        <div className="sidebar__color-pickers__wrapper">
          {colorPickers.map((colorPick) => (
            <ColorPick key={colorPick.id} {...colorPick} />
          ))}
        </div>
      </div>
      <div className="sidebar__button">
        <BaseButton onClick={addColorPicker}>
          {localization.current === "RU" ? "Добавить цвет" : "Add color"}
        </BaseButton>
      </div>
    </div>
  )
}

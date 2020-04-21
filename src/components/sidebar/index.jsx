import React, { useContext } from "react"
import {BaseButton} from '@components'
import { Context } from "@/state/Context.js"
import { ColorPick } from "./_ColorPick"
import "./index.sass"

export const Sidebar = () => {
  const {localization, colorPickers, addColorPicker} = useContext(Context)

  return (
    <div className="sidebar">
      <div className="sidebar__title">
        {localization.current === "RU" ? "Параметры цвета" : "Color parameters"}
      </div>
      <span className="sidebar__splitter bold"></span>
      <div className="sidebar__color-pickers">
        {colorPickers.map((colorPick) => (
          <ColorPick key={colorPick.id} {...colorPick} />
        ))}
      </div>
        <BaseButton onClick={addColorPicker}>{localization.current === 'RU' ? 'Добавить цвет' : 'Add color'}</BaseButton>
    </div>
  )
}

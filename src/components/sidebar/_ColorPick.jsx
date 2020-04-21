import React, { useContext } from "react"
import { Context } from "@/state/Context.js"

export const ColorPick = ({ id, color, step }) => {
  const { localization, setColor, setStep } = useContext(Context)

  function onInputChangeHandler({ target }) {
    let val = target.value

    if (val[0] !== "#") {
      val = "#" + val
    } else if (val.length === 1) {
      val = ""
    }

    setColor(id, val.slice(0, 7))
  }

  function onRangeChangeHandler({ target }) {
    setStep(id, target.value)
  }

  return (
    <div className="color-pick">
      <div className="color-pick__row">
        <div className="color-pick__title">
          {localization.current === "RU" ? "Цвет:" : "Color:"}
        </div>
        <input
          type="text"
          className="color-pick__input"
          placeholder={"#ff44ff"}
          value={color}
          onChange={onInputChangeHandler}
        />
      </div>
      <div className="color-pick__row">
        <div className="color-pick__title">
          {localization.current === "RU" ? `Шаг(${step}%):` : `Step(${step}%):`}
        </div>
        <input
          type="range"
          className="color-pick__input"
          min={1}
          max={10}
          value={step}
          onChange={onRangeChangeHandler}
        />
      </div>
    </div>
  )
}

import React, { useState, useMemo, Fragment } from "react"
import { lightenColor, darkenColor } from "@utils"
import { BaseButton } from "../../components"
import "./index.sass"

function MainPage() {
  const [inputValue, setInputValue] = useState("")
  const [step, setStep] = useState(5)
  const [copiedId, setCopiedId] = useState(null)
  const [copyTimeout, setCopyTimeout] = useState(null)

  const colors = useMemo(() => {
    if (inputValue.length !== 7) return []

    let lightColors = []
    let darkColors = []

    for (let i = 1; i < 5; i++) {
      lightColors.push({
        id: i,
        hex: lightenColor(inputValue, i * step),
      })
    }

    for (let i = 1; i < 5; i++) {
      darkColors.push({
        id: i + 4,
        hex: darkenColor(inputValue, i * step),
      })
    }

    let colors = [...lightColors.reverse(), ...darkColors]

    colors.splice(4, 0, {
      id: "original",
      hex: inputValue,
    })

    return colors
  }, [inputValue, step])

  const stringColors = useMemo(() => {
    return colors.reduce((acc, color, index) => {
      if (!acc.length) {
        return (acc += `${index + 1}: ${color.hex}`)
      }
      return (acc += `; ${index + 1}: ${color.hex}`)
    }, "")
  }, [colors])

  function copyToClipboard(str, id) {
    const el = document.createElement("textarea")
    el.value = str
    document.body.appendChild(el)
    el.select()
    document.execCommand("copy")
    document.body.removeChild(el)

    if (id) {
      setCopiedId(id)
      clearTimeout(copyTimeout)
      setCopyTimeout(
        setTimeout(() => {
          setCopiedId(null)
        }, 3000)
      )
    }
  }

  function onInputChangeHandler({ target }) {
    let val = target.value

    if (val[0] !== "#") {
      val = "#" + val
    } else if (val.length === 1) {
      val = ""
    }

    setInputValue(val.slice(0, 7))
  }

  function onRangeChangeHandler({ target }) {
    setStep(target.value)
  }

  return (
    <Fragment>
      <div className="app-logo">Colorpal.art</div>
      <div className="color-form">
        <div className="color-form__row">
          <div className="color-form__title">Укажите цвет:</div>
          <input
            className="color-form__input"
            placeholder="#ff00ff"
            value={inputValue}
            onChange={onInputChangeHandler}
          />
        </div>
        <input
          className="color-form__range"
          type="range"
          min={1}
          max={10}
          value={step}
          onChange={onRangeChangeHandler}
        />
      </div>
      <div className="color-pallete">
        <div className="color-pallete__header">
          <div className="color-pallete__title">Палитра оттенков</div>
          <BaseButton
            disabled={!colors.length}
            onClick={() => copyToClipboard(stringColors)}
          >
            Копировать палитру
          </BaseButton>
        </div>
        {colors.map((color) => (
          <div key={color.id} className="color-pallete__item" style={{ backgroundColor: color.hex }}>
            <div
              className="color-pallete__item-code"
              title="Скопировать в буфер обмена"
              onClick={() => copyToClipboard(color.hex, color.id)}
            >
              {copiedId === color.id ? "Скопировано" : color.hex}
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  )
}

export default MainPage

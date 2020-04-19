import React, { useState, useMemo } from "react"
import "./App.sass"

function App() {
  const [inputValue, setInputValue] = useState("")
  const [copiedId, setCopiedId] = useState(null)
  const [copyTimeout, setCopyTimeout] = useState(null)

  const colors = useMemo(() => {
    if (inputValue.length !== 7) return []

    let lightColors = []
    let darkColors = []
    let step = 10

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
  }, [inputValue])

  function lightenColor(hex, percent) {
    let num = parseInt(hex.replace("#", ""), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt,
      B = ((num >> 8) & 0x00ff) + amt,
      G = (num & 0x0000ff) + amt
    return (
      "#" +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
        (G < 255 ? (G < 1 ? 0 : G) : 255)
      )
        .toString(16)
        .slice(1)
    )
  }

  function darkenColor(hex, percent) {
    let num = parseInt(hex.replace("#", ""), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) - amt,
      B = ((num >> 8) & 0x00ff) - amt,
      G = (num & 0x0000ff) - amt
    return (
      "#" +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
        (G < 255 ? (G < 1 ? 0 : G) : 255)
      )
        .toString(16)
        .slice(1)
    )
  }

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

  function onChangeHandler({ target }) {
    let $val = target.value

    if ($val[0] !== "#") {
      $val = "#" + $val
    } else if ($val.length === 1) {
      $val = ""
    }

    setInputValue($val.slice(0, 7))
  }

  return (
    <div className="App">
      <div className="App__logo">Colorpal.io</div>
      <div className="input">
        <div className="input__title">Укажите цвет:</div>
        <input className="input__field" placeholder="#ff00ff" value={inputValue} onChange={onChangeHandler} />
      </div>
      <div className="color-pallete">
        <div className="color-pallete__header">
          <div className="color-pallete__title">Палитра оттенков</div>
          <button
            className="color-pallete__button"
            disabled={!colors.length}
            onClick={() => copyToClipboard(stringColors)}
          >
            Копировать палитру
          </button>
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
    </div>
  )
}

export default App

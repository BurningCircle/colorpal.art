import React, { useMemo, useContext } from "react"
import { BaseButton } from "@components"
import { lightenColor, darkenColor } from "@utils"
import { Context } from "@/state/Context"
import "./_color_pallete.sass"

export const ColorPallete = ({ id, color, step }) => {
  const { localization } = useContext(Context)
  const colors = useMemo(() => {
    if (color.length !== 7) return []

    let lightColors = []
    let darkColors = []

    for (let i = 1; i < 5; i++) {
      lightColors.push({
        id: i,
        hex: lightenColor(color, i * step),
      })
    }

    for (let i = 1; i < 5; i++) {
      darkColors.push({
        id: i + 4,
        hex: darkenColor(color, i * step),
      })
    }

    let colors = [...lightColors.reverse(), ...darkColors]

    colors.splice(4, 0, {
      id: "original",
      hex: color,
    })

    return colors
  }, [color, step])

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
  }

  if (color.length !== 7) return null

  return (
    <div className="color-pallete">
      <BaseButton
        disabled={!colors.length}
        style={{ width: "360px", marginBottom: "10px" }}
        onClick={() => copyToClipboard(stringColors)}
      >
        {localization.current === "RU" ? "Копировать палитру" : "Copy pallete"}
      </BaseButton>
      {colors.map((color) => (
        <div
          key={color.id}
          className="color-pallete__item"
          style={{ backgroundColor: color.hex }}
        >
          <div
            className="color-pallete__item-code"
            title="Copy"
            onClick={() => copyToClipboard(color.hex, color.id)}
          >
            {color.hex}
          </div>
        </div>
      ))}
    </div>
  )
}

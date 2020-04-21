import React from "react"
import { BaseButton } from "@components"
import "./_color_pallete.sass"

export const ColorPallete = ({ colors, copyToClipboard, stringColors, copiedId }) => (
  <div className="color-pallete">
    <div className="color-pallete__header">
      <div className="color-pallete__title">Color pallete</div>
      <BaseButton disabled={!colors.length} onClick={() => copyToClipboard(stringColors)}>
        Copy pallete
      </BaseButton>
    </div>
    {colors.map((color) => (
      <div key={color.id} className="color-pallete__item" style={{ backgroundColor: color.hex }}>
        <div className="color-pallete__item-code" title="Copy" onClick={() => copyToClipboard(color.hex, color.id)}>
          {copiedId === color.id ? "Copied" : color.hex}
        </div>
      </div>
    ))}
  </div>
)

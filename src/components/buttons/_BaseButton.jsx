import React from "react"
import "./_base_button.sass"

export const BaseButton = ({ children, ...otherProps }) => (
  <button className="base-button" {...otherProps}>
    {children}
  </button>
)

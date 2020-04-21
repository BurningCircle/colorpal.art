import React from "react"
import "./_text_button.sass"

export const TextButton = ({ children, ...otherProps }) => (
  <button className="text-button" {...otherProps}>
    {children}
  </button>
)

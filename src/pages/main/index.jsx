import React, { useContext, Fragment } from "react"
import { ColorPallete } from "./fragments"
import { Sidebar } from "@components"
import { Context } from "@/state/Context"
import "./index.sass"

function MainPage() {
  const { colorPickers } = useContext(Context)
  return (
    <Fragment>
      <div className="content">
        <Sidebar />
        <div className="content__color-pallets">
          <div className="content__color-pallets__wrapper">
            {colorPickers.map((colorPicker) => (
              <ColorPallete key={colorPicker.id} {...colorPicker} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default MainPage

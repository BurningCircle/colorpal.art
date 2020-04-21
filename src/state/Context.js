import React from "react"

const Context = React.createContext()

class Provider extends React.Component {
  state = {
    colorPickers: [
      {
        id: Date.now(),
        color: "",
        step: 5,
      },
    ],
    localization: {
      current: "RU",
      changeTo: "ENG",
    },
  }

  render() {
    return (
      <Context.Provider
        value={{
          colorPickers: this.state.colorPickers,
          localization: this.state.localization,
          addColorPicker: () =>
            this.setState({
              ...this.state,
              colorPickers: [...this.state.colorPickers, { id: Date.now(), color: "", step: 5 }],
            }),
          setColor: (id, value) => {
            let colorPickers = [...this.state.colorPickers]
            colorPickers.forEach((colorPicker) => {
              if (colorPicker.id === id) {
                colorPicker.color = value
              }
            })
            this.setState({
              ...this.state,
              colorPickers,
            })
          },
          setStep: (id, value) => {
            let colorPickers = [...this.state.colorPickers]
            colorPickers.forEach((colorPicker) => {
              if (colorPicker.id === id) {
                colorPicker.step = value
              }
            })
            this.setState({
              ...this.state,
              colorPickers,
            })
          },
          changeLocalization: () => {
            this.setState((prevState) => ({
              ...this.state,
              localization: {
                current: prevState.localization.changeTo,
                changeTo: prevState.localization.current,
              },
            }))
          },
        }}
      >
        {this.props.children}
      </Context.Provider>
    )
  }
}

export { Context, Provider }

import React from "react"

const Context = React.createContext()

class Provider extends React.Component {
  state = {
    colorPickers: [
      {
        color: null,
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
              colorPickers: [...this.state.colorPickers, { color: null, step: 5 }],
            }),
          setColor: (index, value) => {
            let colorPickers = [...this.state.colorPickers]
            colorPickers[index].color = value
          },
          setStep: (index, value) => {
            let colorPickers = [...this.state.colorPickers]
            colorPickers[index].step = value
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

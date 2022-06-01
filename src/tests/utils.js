import {render as rtlRender} from "@testing-library/react";
import {store} from "../redux/store";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";

const Wrapper = ({children}) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </Provider>
  )
}

const render = (ui, options) => {
  return rtlRender(ui, {wrapper: Wrapper, ...options})
}

export * from "@testing-library/react"
export {render}
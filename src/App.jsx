import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import HomeTemplate from "./templates/HomeTemplate";
import ReduxToolkit from "./pages/ReduxToolkit";
import TanstackQuery from "./pages/TanstackQuery";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<HomeTemplate />}>
          <Route path="redux" element={<ReduxToolkit />}></Route>
          <Route path="tanstack" element={<TanstackQuery />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

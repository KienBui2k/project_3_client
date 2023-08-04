import "./main.scss";
import { Routes } from "react-router-dom";
import {useEffect } from 'react';

/* Route Config */
import AuthRoute from "@pages/auths/Route";
import HomeRoute from "@pages/home/Route";

import { useDispatch } from 'react-redux';
import { userActions } from '@actions/user';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.authenToken())
  }, [])
  return (
      <Routes>
        {/* Auth Routing */}
        {AuthRoute}
        {/* Home */}
        {HomeRoute}
      </Routes>
  );
}

export default App;

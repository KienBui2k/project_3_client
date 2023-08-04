import "./main.scss";
import { Routes } from "react-router-dom";
import { useState, useEffect } from 'react';

import Navbar from '@components/Navbar'
import Footer from '@components/Footer'

import { useTranslation } from "react-i18next";

/* Route Config */
import ExampleRouteConfig from "./pages/examples/route.config";
import AuthRouteConfig from "@pages/auths/Route";

import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '@actions/user';
function App() {
  const store = useSelector(store => store)
  const { t } = useTranslation();
  const [feature, setFeature] = useState([
    "Find a Store", "Help", "Join Us", "Sign In"
  ])

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.authenToken())
  }, [])
  return (
    <div className="root_page">
      {/* Before Nav */}
      <section className="before_nav">
        <div className="before_nav_content">
          <h1 className="brand_name">JS_230410_CLIENT {t("hello")}  -  {t("about")}  User: {store.userStore?.data?.first_name}  {store.userStore?.data?.last_name}</h1>
          <div className="feature">
              {
                feature.map((item, index) => (
                  <span className="feature_item" key={Date.now() * Math.random()}>{item}</span>
                ))
              }
          </div>
        </div>
      </section>
      {/* Navbar */}
      <Navbar/>
      {/* Body */}
      <section className="body_container">
        <div className="body_container_center">
          <Routes>
            {/* Exemple Routing */}
            {ExampleRouteConfig}
            {/* Auth Routing */}
            {AuthRouteConfig}
          </Routes>
        </div>
      </section>
      {/* Footer */}
      <Footer/>
    </div>
  );
}

export default App;

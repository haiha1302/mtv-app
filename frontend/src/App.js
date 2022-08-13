import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AuthContext from "./Context/auth";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Movies from "./Pages/Movies";
import TVSeries from "./Pages/TVSeries";
import WatchMovie from "./Pages/WatchMovie";
import WatchDetails from "./Pages/WatchDetails";
import Footer from "./Components/Shared/Footer";
import WatchTVSeries from "./Pages/WatchTVSeries";
import RequiredAuth from "./Components/RequiredAuth";
import WithNav from "./Components/ShowHideNav/WithNav";
import WithoutNav from "./Components/ShowHideNav/WhitoutNav";
import Meta from "./Components/Meta";
import styled from "styled-components";

const AppStyle = styled.div`
  background-color: #02080f;
`;

function App() {
  const [authUser, setAuthUser] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );
  const setUser = (data) => {
    localStorage.setItem("loginData", JSON.stringify(data));
    setAuthUser(data);
  };

  return (
    <AuthContext.Provider value={{ user: authUser, setUser: setUser }}>
      <AppStyle>
        <Meta
          title="Cinema App By HL"
          description="Movies and Tv Series free"
        />
        <Routes>
          <Route element={<WithNav />}>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tvseries" element={<TVSeries />} />
            <Route path="/details/:media_type/:id" element={<WatchDetails />} />
            <Route element={<RequiredAuth />}>
              <Route path="/:media_type/:id" element={<WatchMovie />} />
              <Route
                path="/:media_type/:id/season=:season_id/episode=:episode_id"
                element={<WatchTVSeries />}
              />
            </Route>
          </Route>
          <Route element={<WithoutNav />}>
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
        <Footer />
      </AppStyle>
    </AuthContext.Provider>
  );
}

export default App;

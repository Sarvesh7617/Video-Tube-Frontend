import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  AuthLayout,
  Login,
  SignUp,
  EditProfile,
  Changepassword
} from "./components";
import Store from "./store/store.js";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import {
  WatchHistory,
  VideoDetail,
  TermsandCondition,
  SearchVideo,
  MySubscription,
  LikedVideos,
  HomePage,
  EditChaannel,
  AdminDashboard,
  Channel,
  ChannelPlaylist,
  ChannelSubscription,
  ChannelTweets,
  ChannelVideo
}
 from "./pages/index.js";
import { getCurrentUser } from './store/Slices/authSlice.js'


const Router=createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login"
          element={
            <AuthLayout authentication={false}>
              <Login/>
            </AuthLayout>
          }
        />
        <Route path="/signup"
          element={
            <AuthLayout authentication={false}>
              <SignUp/>
            </AuthLayout>
          }
        />
        <Route path="/watch/:videoId"
          element={
            <AuthLayout authentication={true}>
              <VideoDetail/>
            </AuthLayout>
          }
        />
        <Route path="/collections"
          element={
            <AuthLayout authentication={true}>
              <AdminDashboard/>
            </AuthLayout>
          }
        />
        <Route path="terms&condition"
          element={
            <AuthLayout authentication={true}>
              <TermsandCondition/>
            </AuthLayout>
          }
        />
      <Route path="/" element={<App/>}>
        <Route index                                         /*index matlab hota hai: “Jab base route / ho, tab <Home /> dikhana. */
          element={
            <AuthLayout authentication={false}>
              <HomePage/>
            </AuthLayout>
          }
        />
        <Route path="/search/:query"
          element={
            <AuthLayout authentication={false}>
              <SearchVideo />
            </AuthLayout>
          }
        />
        <Route path="/channel/:username"
          element={
            <AuthLayout authentication={true}>
              <Channel/>
            </AuthLayout>
          }
        >
          <Route path="videos"
            element={
              <AuthLayout authentication={true}>
                <ChannelVideo/>
              </AuthLayout>
            }
          />
          <Route path="playlists"
            element={
              <AuthLayout authentication={true}>
                <ChannelPlaylist/>
              </AuthLayout>
            }
          />
          <Route path="tweets"
            element={
              <AuthLayout authentication={true}>
                <ChannelTweets/>
              </AuthLayout>
            }
          />
          <Route path="subscribed"
            element={
              <AuthLayout authentication={true}>
                <ChannelSubscription/>
              </AuthLayout>
            }
          />
        </Route>
        <Route path="/watch-history"
          element={
            <AuthLayout authentication={true}>
              <WatchHistory/>
            </AuthLayout>
          }
        />
        <Route path="liked-videos"
          element={
            <AuthLayout authentication={true}>
              <LikedVideos/>
            </AuthLayout>
          }
        />
        <Route path="subscriptions"
          element={
            <AuthLayout authentication={true}>
              <MySubscription/>
            </AuthLayout>
          }
        />
        <Route path="/edit"
          element={
            <AuthLayout authentication={true}>
              <EditChaannel/>
            </AuthLayout>
          }
        >
          <Route path="personalInfo"
            element={
              <AuthLayout authentication={true}>
                <EditProfile/>
              </AuthLayout>
            }
          />
          <Route path="change-password"
            element={
              <AuthLayout authentication={true}>
                <Changepassword/>
              </AuthLayout>
            }
          />
        </Route>
      </Route>
    </>
  )
)

  Store.dispatch(getCurrentUser());             //always check user login or not


createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <StrictMode>
      <RouterProvider router={Router}/>
      <ToastContainer position="top-center" autoClose={3000} className="z-100"/>
    </StrictMode>
  </Provider>
)
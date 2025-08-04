/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import {lazy,FC, useEffect, useState} from 'react'
import {Routes, Route, BrowserRouter, Navigate, useLocation} from 'react-router-dom'
import {PrivateRoutes} from './PrivateRoutes'
import {ErrorsPage} from '../modules/errors/ErrorsPage'
import {Logout, AuthPage, useAuth} from '../modules/auth'
import {App} from '../App'
import { ToastContainer } from 'react-toastify'
import LoginPage from 'app/modifiedModules/LoginPage/LoginPage'
import { useSelector } from 'react-redux'
import Authed from 'utils/Authed'
import NotAuthed from 'utils/NotAuthed'
import { useCookies } from 'react-cookie'

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
// const {PUBLIC_URL} = process.env

const StyleRtl = lazy(() => import('./StyleRtl'));
const StyleLtr = lazy(() => import('./StyleLtr'));
const AppRoutes: FC = () => {
  const currentUser:any =useSelector(state=>state)
  useEffect(()=>{
    console.log('currentUsercurrentUsercurrentUser',currentUser?.GlobalReducer?.token)
  },[currentUser])
  
  const [cookies, setCookie, removeCookie] = useCookies<any>(['i18next']);
  
  let z= require('../../_metronic/assets/sass/style.react.scss')
  return (
    <BrowserRouter >
    {
      cookies.i18next=='ar'?
      <StyleRtl/>:
      <StyleLtr/>
    }
    <ToastContainer />
      <Routes>
        <Route element={<App />}>
          <Route path='error/*' element={<ErrorsPage />} />
          <Route path='logout' element={<Logout />} />
          <Route path='/*' element={<Authed><PrivateRoutes /></Authed>} />
          <Route path='login' element={<NotAuthed><LoginPage /></NotAuthed>} />
            {/* <>
              <Route path='/*' element={<PrivateRoutes />} />
              <Route index element={<Navigate to='/dashboard' />} />
            </> */}
          {/* {currentUser?.GlobalReducer?.token ? (
            <>
              <Route path='/*' element={<PrivateRoutes />} />
              <Route index element={<Navigate to='/dashboard' />} />
            </>
          ) : (
            <>
              <Route path='login' element={<LoginPage />} />
              <Route path='*' element={<Navigate to='/login' />} />
            </>
          )} */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export {AppRoutes}

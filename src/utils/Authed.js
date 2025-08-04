import React, { useEffect } from 'react'
import { Children } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function Authed({children}) {
    const isLoggedIn =useSelector(state=>state.GlobalReducer?.token)
    if(!isLoggedIn){
      return <Navigate to='/login'/>
    }
    return children
}

export default Authed
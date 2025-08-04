import React from 'react'
import { Children } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function NotAuthed({children}) {
    const isLoggedIn =useSelector(state=>state.GlobalReducer?.token)
    if(isLoggedIn){
      return <Navigate to='/dashboard'/>
    }
    return children
}

export default NotAuthed
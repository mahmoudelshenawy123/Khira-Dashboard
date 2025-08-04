import { useState } from 'react'
import { useNavigate} from 'react-router-dom'
import { axiosConfig } from 'utils/axiosConfig'
import ReactLoading from "react-loading";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { changeToken } from 'app/reduxStore/Global/GlobalActions';
import { toAbsoluteUrl } from '_metronic/helpers';
 import './LoginPage.css'
import { useTranslation } from 'react-i18next';
const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate =useNavigate()
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [isLoading,setIsLoading]=useState(false)
    const {t} =useTranslation()
    function login(){
        setIsLoading(true)
        axiosConfig.post(`/admin/login`,{email,password}).then(res=>{
            setIsLoading(false)
            localStorage.setItem('token', res.data.data)
            dispatch(changeToken(res.data.data))
            navigate('/dashboard')
        }).catch(err=>{
            setIsLoading(false)
            toast.error(err.response.data.message?err.response.data.message:'Something went Wrong')
        })
    }
  return (
    <div className='d-flex login-wrapper h-100 w-100'>
      <div className='container h-100 d-flex'>
        <div className="card card-custom my-auto w-100 login-card">
        <img
              alt='Logo'
              src={toAbsoluteUrl('/khira-store-logo-removebg.png')}
              className='h-100px app-sidebar-logo-default'
            />
              <h1 className=" mx-auto my-3 login-text">Khira Store</h1>
          <div className="card-header">
              <h3 className="card-title login-text">{t('Login')}</h3>
          </div>
          <div className="card-body">
            <div className="mb-10">
              <label className="form-label login-text">{t('Email')}</label>
              <input
                type="text"
                className="form-control login-input"
                placeholder="name@example.com"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
              />
              </div>
              
              <div className="mb-10">
                <label className="form-label login-text">{t('Password')}</label>
                <input
                  type="password"
                  className="form-control form-control-white login-input"
                  placeholder={`${t('Password')}`}
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value)}}
                />
            </div>
              <div className="mb-10">
                <button
                  type="button"
                  className="btn login-btn w-100 d-flex align-items-center justify-content-center"
                  onClick={login}
                  disabled={isLoading}
                >
                {
                !isLoading?t('Login')
                :<ReactLoading type={"spin"} color={'#000000'} height={20} width={20} />
              }
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default LoginPage

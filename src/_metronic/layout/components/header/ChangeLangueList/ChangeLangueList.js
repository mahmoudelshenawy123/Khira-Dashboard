import React, { useEffect, useState } from 'react'
import i18next from 'i18next'
// import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { changeLanguageAction } from 'app/reduxStore/Global/GlobalActions'
// import stylesNav from '../../Layout/NavBar/NavBar.module.css'
// import { Dropdown } from 'react-bootstrap'
// import CustomDropdownMenu from '../CustomDropdownMenu/CustomDropdownMenu'
// import stylesDropDown from '../CustomDropdownMenu/CustomDropdownMenu.module.css'
import { useTranslation } from 'react-i18next'
// import {ReactComponent as DownArrow} from 'assets/icons/downArrow.svg'
import { useCookies } from 'react-cookie'

function ChangeLangueList() {
    const languages=[
        {
            code:'ar',
            name:'العربية',
            country_code:'sa',
            dir:'rtl'
        },
        {
            code:'en',
            name:'english',
            country_code:'gb',
            dir:'ltr'
        },
        
    ]
    const [cookies, setCookie, removeCookie] = useCookies(['i18next']);
    // if (cookies.i18next=='ar') {
  
    const dispatch= useDispatch()
    const {t} =useTranslation()
    const [isActiveLanguageMenu ,setIsActiveLanguageMenu]=useState(false)
    const currentLanguageCode = cookies.i18next || 'ar'
    const currentLanguage = languages.find(l=> l.code === currentLanguageCode)
    useEffect(()=>{
        document.body.dir=currentLanguage.dir ||'rtl'
        document.dir=currentLanguage.dir ||'rtl'
    },[currentLanguage])
    let changeLanguage=(code)=>{
        i18next.changeLanguage(code)
        changeLanguageAction(dispatch,code)
        setIsActiveLanguageMenu(false)
        window.location.reload()
    }
    function toggleLanguageMenu(){
        setIsActiveLanguageMenu(prevValue=>!prevValue)
    }
    // const LangButton =()=>{
    //     return <button role='button' onClick={toggleLanguageMenu} className={`${stylesNav['navbar-top__contact-item--language']}`}>
    //         {t('lang')}
    //         <DownArrow className={stylesNav['navbar-top__contact-item-icon']}/>
    //     </button>
    // }
    useEffect(()=>{
        window.addEventListener('scroll',()=>{setIsActiveLanguageMenu(false)})
        return ()=>{window.removeEventListener('scroll',()=>{setIsActiveLanguageMenu(false)})}
    },[])
  return (
    <>
    <button className={'btn btn-icon btn-active-color-primary'} onClick={()=>{changeLanguage(cookies.i18next=='ar'?'en':'ar')}}>{t('lang')}</button>
    {/* <CustomDropdownMenu LangButton={LangButton} active={isActiveLanguageMenu} setActive={setIsActiveLanguageMenu}>
        <li className={stylesDropDown["custom-dropdown__item"]}>
            <button className={stylesDropDown["custom-dropdown__link"]} onClick={()=>{changeLanguage('ar')}}>العربية</button>
        </li>
        <li className={stylesDropDown["custom-dropdown__item"]}>
            <button className={stylesDropDown["custom-dropdown__link"]} onClick={()=>{changeLanguage('en')}}>English</button>
        </li> */}
    {/* </CustomDropdownMenu> */}
    </>
  )
}

export default ChangeLangueList
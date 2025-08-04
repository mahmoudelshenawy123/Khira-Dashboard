import {KTCard} from '../../../../../_metronic/helpers'
import { useEffect, useState } from 'react'
import { axiosConfig } from 'utils/axiosConfig'
import GeneralSettingsForm from './GeneralSettingsForm'

const GeneralSettingsList = () => {
  const [settings,setSettings]=useState([])
    function getSettings(){
        axiosConfig.get(`/static-pages/all`,{
          headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
      }).then(res=>{
            setSettings(res.data.data)
        }).catch(err=>{
            console.log(err)
        })
    }
  useEffect(()=>{
    getSettings()
  },[])
  return (
    <>
      <KTCard>
        <GeneralSettingsForm
          data={settings}
        />
      </KTCard>
    </>
  )
}

export {GeneralSettingsList}

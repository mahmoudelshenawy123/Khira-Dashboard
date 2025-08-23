import {KTCard} from '../../../../../_metronic/helpers'
import { useEffect, useState } from 'react'
import { axiosConfig } from 'utils/axiosConfig'
import GeneralSettingsForm from './GeneralSettingsForm'

const GeneralSettingsList = () => {
  const [settings,setSettings]=useState([])
    function getSettings(){
        axiosConfig.get(`/settings`,{
          headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
      }).then(res=>{
        console.log("res.data.data settings", res.data.data)
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

/* eslint-disable jsx-a11y/anchor-is-valid */
import { t } from 'i18next'
import {FC, useEffect, useState} from 'react'
import { useTranslation } from 'react-i18next'
import {useIntl} from 'react-intl'
import { toast } from 'react-toastify'
import { axiosConfig } from 'utils/axiosConfig'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {PageTitle} from '../../../_metronic/layout/core'
import {
  ListsWidget2,
  ListsWidget3,
  ListsWidget4,
  ListsWidget6,
  TablesWidget5,
  TablesWidget10,
  MixedWidget8,
  CardsWidget7,
  CardsWidget17,
  CardsWidget20,
  ListsWidget26,
  EngageWidget10,
} from '../../../_metronic/partials/widgets'

const DashboardPage: FC = () => {
  const {t} =useTranslation()
  const [statistics,setStatistics]=useState<any>({})
  function getStatistics(){
    axiosConfig.get('/admin/statistics',{
      headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
  }).then(res=>{
      console.log(res.data.data)
      setStatistics(res.data.data)
    }).catch(err=>{
      toast.error('Something went Wrong')
    })
  }
  useEffect(()=>{
    getStatistics()
  },[])
  return (
    <>
    {/* begin::Row */}
    <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
      {/* begin::Col */}
      <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10'>
        <CardsWidget20
          className='h-md-100 mb-5 mb-xl-10'
          description={t('All Orders')}
          stats={statistics}
          color='#F1416C'
          img={toAbsoluteUrl('/media/patterns/vector-1.png')}
          t={t}
        />
      </div>
      <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10'>
        
        <CardsWidget7
          className='h-md-100 mb-5 mb-xl-10'
          description={t('Proccessing Orders')}
          icon={false}
          stats={statistics?.active_orders}
          labelColor='dark'
          textColor='gray-300'
        />
      </div>
      <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10'>
        
        <CardsWidget7
          className='h-md-100 mb-5 mb-xl-10'
          description={t('Cancelled Orders')}
          icon={false}
          stats={statistics?.cancelled_orders}
          labelColor='dark'
          textColor='gray-300'
        />
      </div>
      <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10'>
        
        <CardsWidget7
          className='h-md-100 mb-5 mb-xl-10'
          description={t('Completed Orders')}
          icon={false}
          stats={statistics?.complete_orders}
          labelColor='dark'
          textColor='gray-300'
        />
      </div>
      <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10'>
        <CardsWidget7
            className='h-md-100 mb-5 mb-xl-10'
            description={t('Users')}
            icon={false}
            stats={statistics?.user_count}
            labelColor='dark'
            textColor='gray-300'
          />
      </div>
     
      {/* end::Col */}

      {/* begin::Col */}
      
       
        {/* <CardsWidget17 className='h-md-50 mb-5 mb-xl-10' /> */}
        {/* <ListsWidget26 className='h-lg-50' /> */}
      {/* end::Col */}

      {/* begin::Col */}
      {/* <div className='col-xxl-6'> */}
      {/* <CardsWidget7
          className='h-md-50 mb-5 mb-xl-10'
          description='Camel Owners'
          icon={false}
          stats={statistics?.camel_owner_count}
          labelColor='dark'
          textColor='gray-300'
        />
        <CardsWidget7
          className='h-md-50 mb-5 mb-xl-10'
          description='Drivers'
          icon={false}
          stats={statistics?.all_orders}
          labelColor='dark'
          textColor='gray-300'
        /> */}
        {/* <EngageWidget10 className='h-md-100' /> */}
      {/* </div> */}
      {/* end::Col */}
    </div>

  </>
  )
}

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  const {t} =useTranslation()
  
  return (
    <>
      <PageTitle breadcrumbs={[]}>{t('Dashboard')}</PageTitle>
      <DashboardPage/>
    </>
  )
}

export {DashboardWrapper}

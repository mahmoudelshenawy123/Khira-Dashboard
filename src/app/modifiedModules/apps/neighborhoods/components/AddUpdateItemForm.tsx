import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { axiosConfig } from 'utils/axiosConfig'
import { KTSVG } from '_metronic/helpers'
import { toast } from 'react-toastify'
import ReactLoading from "react-loading";
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import GoogleSearchBox from '../../squares/components/GoogleSearchBox'
import { useTranslation } from 'react-i18next'
import GoogleSearchBox from './GoogleSearchBox'

function AddUpdateItemForm(props:any) {
  const {t} =useTranslation()
    const params:any = useParams()    
    const navigate=useNavigate()
    let [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setLoading]=useState(false)
    const [data,setData]=useState<any>(null)
    const [nameEn,setNameEn] =useState('')
    const [nameAr,setNameAr] =useState('')
    const [nameUr,setNameUr] =useState('')
    const [latitude,setLatitude] =useState('')
    const [longitude,setLongitude] =useState('')
    function getItem(id:any){
        axiosConfig.get(`/neighborhood/single-neighborhoods/${id}`,{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res=>{
            setData(res.data.data)
            console.log(res.data.data)
        }).catch(err=>{
            console.log(err)
        })
    }
    useEffect(()=>{
        if(searchParams.get('squareId')){
            getItem(searchParams.get('squareId'))
        }
    },[])
    function validateInputs(){
      let status =true
      if(!nameEn){
        toast.error(t('Neighborhood Enslish Name Is Required'))
        status=false
      }
      if(!nameAr){
        toast.error(t('Neighborhood Arabic Name Is Required'))
        status=false
      }
      // if(!nameUr){
      //   toast.error(t('Neighborhood Urdu Name Is Required'))
      //   status=false
      // }
      if(!latitude||!longitude){
        toast.error(t('Neighborhood Location Is Required'))
        status=false
      }
      // if(!nameUr){
      //   toast.error('Neighborhood Location Is Required')
      //   status=false
      // }
      return status
    }
  
    function addItem(){
      if(!validateInputs()){
        return
      }
      setLoading(true)
      const formData  = new FormData()
      formData.append('name_en',nameEn)
      formData.append('name_ar',nameAr)
      formData.append('name_ur',nameUr)
      formData.append('neighborhood_latitude',latitude)
      formData.append('neighborhood_longitude',longitude)
      formData.append('city_id',params?.id)
  
      if(data){
        axiosConfig.put(`/neighborhood/update-neighborhood/${data?.id}`,formData,{
          headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
      }).then(res=>{
          setLoading(false)
          toast.success(t(`Neighborhood Updated Successfully`))
        //   getData()
        //   handleClose()
          setNameEn('')
          setNameAr('')
          setNameUr('')
          setLatitude('')
          setLongitude('')
            navigate(`/apps/neighborhoods/all/${params.id}`)
        }).catch(err=>{
            setLoading(false)
          toast.error('Something went wrong')
        })
      }else{
        axiosConfig.post(`/neighborhood/create-neighborhood`,formData,{
          headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
      }).then(res=>{
          setLoading(false)
          toast.success(t(`Neighborhood Added Successfully`))
        //   getData()
        //   handleClose()
          setNameEn('')
          setNameAr('')
          setNameUr('')
          setLatitude('')
          setLongitude('')
        navigate(`/apps/neighborhoods/all/${params.id}`)
        }).catch(err=>{
          setLoading(false)
          toast.error('Something went wrong')
        })
      }
    }
    useEffect(()=>{
      setNameEn(data?.name_en)
      setNameAr(data?.name_ar)
      setNameUr(data?.name_ur)
      setLatitude(data?.neighborhood_latitude)
      setLongitude(data?.neighborhood_longitude)
    },[data])
  
  return (
    <div className='p-5 card'>
        <div>
            <label className='fs-5 text-muted mb-0' htmlFor='itemEnglishName'>{t('Neighborhood English Name')}</label>
            <input
                type='text'
                data-kt-user-table-filter='search'
                className='form-control form-control-solid mb-5 ps-14'
                placeholder={`${t('Neighborhood English Name')}`}
                id='itemEnglishName'
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
              />
          </div>
          <div>
            <label className='fs-5 text-muted mb-0' htmlFor='itemArabicName'>{t('Neighborhood Arabic Name')}</label>
            <input
                type='text'
                data-kt-user-table-filter='search'
                className='form-control form-control-solid mb-5 ps-14'
                placeholder={`${t('Neighborhood Arabic Name')}`}
                id='itemArabicName'
                value={nameAr}
                onChange={(e) => setNameAr(e.target.value)}
              />
          </div>
          <div>
            <label className='fs-5 text-muted mb-0' htmlFor='itemUrduName'>{t('Neighborhood Urdu Name')}</label>
            <input
                type='text'
                data-kt-user-table-filter='search'
                className='form-control form-control-solid mb-5 ps-14'
                placeholder={`${t('Neighborhood Urdu Name')}`}
                id='itemUrduName'
                value={nameUr}
                onChange={(e) => setNameUr(e.target.value)}
              />
          </div>
          <div className='position-relative'>
            <label className='fs-5 text-muted mb-0' htmlFor='itemUrduName'>{t('Neighborhood Location')}</label>
            <GoogleSearchBox setLatitude={setLatitude} setLongitude={setLongitude}/>
          </div>
          <button type='button' className='btn btn-primary ms-auto' onClick={addItem} disabled={isLoading}>
            {
              !isLoading?
              <><KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' /> {data?t('Update Neighborhood'):t('Add Neighborhood')} </>
              :<ReactLoading type={"spin"} color={'#ffffff'} height={30} width={30} />
            }
          </button> 
    </div>
  )
}

export default AddUpdateItemForm
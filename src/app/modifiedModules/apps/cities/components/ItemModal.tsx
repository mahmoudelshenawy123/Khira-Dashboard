import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { axiosConfig } from 'utils/axiosConfig';
import { KTSVG } from '_metronic/helpers';
import { toast } from 'react-toastify'
import ReactLoading from "react-loading";
import { useTranslation } from 'react-i18next';

function ItemModal(props:any) {
  const {getData,data}=props  
  const {t} =useTranslation()

  const [isLoading, setLoading]=useState(false)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [nameEn,setNameEn] =useState('')
  const [nameAr,setNameAr] =useState('')
  const [nameUr,setNameUr] =useState('')

  function validateInputs(){
    let status =true
    if(!nameEn){
      toast.error(t('City Enslish Name Is Required'))
      status=false
    }
    if(!nameAr){
      toast.error(t('City Arabic Name Is Required'))
      status=false
    }
    if(!nameUr){
      toast.error(t('City Urdu Name Is Required'))
      status=false
    }
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

    if(data){
      axiosConfig.put(`/city/update-city/${data?.id}`,formData,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    }).then(res=>{
        setLoading(false)
        toast.success(t(`City Updated Successfully`))
        getData()
        handleClose()
      }).catch(err=>{
        setLoading(false)
        toast.error(t('Something went wrong'))
      })
    }else{
      axiosConfig.post(`/city/create-city`,formData,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    }).then(res=>{
        setLoading(false)
        toast.success(t(`City Added Successfully`))
        getData()
        handleClose()
      }).catch(err=>{
        setLoading(false)
        toast.error(t('Something went wrong'))
      })
    }
  }
  useEffect(()=>{
    setNameEn(data?.name_en)
    setNameAr(data?.name_ar)
    setNameUr(data?.name_ur)
  },[data])

  return (
    <>
      <button type='button' className={`btn btn-primary ms-auto ${data?'w-100':''}`} onClick={handleShow}>
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        {data?t('Update'):t('Add City')}
      </button>

      <Modal show={show} onHide={handleClose} size='xl'>
        <Modal.Header closeButton>
          <Modal.Title>{data?t('Update City'):t('Add City')} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label className='fs-5 text-muted mb-0' htmlFor='itemEnglishName'>{t('City English Name')}</label>
            <input
                type='text'
                data-kt-user-table-filter='search'
                className='form-control form-control-solid mb-5 ps-14'
                placeholder={`${t('City English Name')}`}
                id='itemEnglishName'
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
              />
          </div>
          <div>
            <label className='fs-5 text-muted mb-0' htmlFor='itemArabicName'>{t('City Arabic Name')}</label>
            <input
                type='text'
                data-kt-user-table-filter='search'
                className='form-control form-control-solid mb-5 ps-14'
                placeholder={`${t('City Arabic Name')}`}
                id='itemArabicName'
                value={nameAr}
                onChange={(e) => setNameAr(e.target.value)}
              />
          </div>
          <div>
            <label className='fs-5 text-muted mb-0' htmlFor='itemUrduName'>{t('City Urdu Name')}</label>
            <input
                type='text'
                data-kt-user-table-filter='search'
                className='form-control form-control-solid mb-5 ps-14'
                placeholder={`${t('City Urdu Name')}`}
                id='itemUrduName'
                value={nameUr}
                onChange={(e) => setNameUr(e.target.value)}
              />
          </div>
          <button type='button' className='btn btn-primary ms-auto' onClick={addItem} disabled={isLoading}>
            {
              !isLoading?
              <><KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' /> {data?t('Update'):t('Add City')}</>
              :<ReactLoading type={"spin"} color={'#ffffff'} height={30} width={30} />
            }
          </button> 
        </Modal.Body>
      </Modal>
    </>
  );
}
export {ItemModal}
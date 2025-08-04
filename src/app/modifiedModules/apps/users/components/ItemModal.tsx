import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { axiosConfig } from 'utils/axiosConfig';
import { KTSVG } from '_metronic/helpers';
import { toast } from 'react-toastify'
import ReactLoading from "react-loading";
import { useTranslation } from 'react-i18next';

function ItemModal(props:any) {
  const {t} =useTranslation()
  const {getData,data}=props
  const [isLoading, setLoading]=useState(false)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name,setName] =useState('')
  const [email,setEmail] =useState('')
  const [password,setPassword] =useState('')

  function validateInputs(){
    let status =true
    if(!name){
      toast.error(t('Name Is Required'))
      status=false
    }
    if(!email){
      toast.error(t('Email Name Is Required'))
      status=false
    }
    // if(!password){
    //   toast.error('password Name Is Required')
    //   status=false
    // }
    return status
  }

  function addType(){
    if(!validateInputs()){
      return
    }
    setLoading(true)
    const formData  = new FormData()
    formData.append('name',name)
    formData.append('email',email)
    password &&formData.append('password',password)

    if(data){
      axiosConfig.put(`/users/update-user/${data?.id}`,formData,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    }).then(res=>{
        setLoading(false)
        toast.success(`User ${data?'Updated':'Add'} Successfully`)
        getData()
        handleClose()
      }).catch(err=>{
        setLoading(false)
        toast.error(t('Something went wrong'))
      })
    }else{
      axiosConfig.post(`/users/create-user`,formData,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    }).then(res=>{
        setLoading(false)
        toast.success(`User ${data?'Updated':'Add'} Successfully`)
        getData()
        handleClose()
      }).catch(err=>{
        setLoading(false)
        toast.error(t('Something went wrong'))
      })
    }
  }
  useEffect(()=>{
    setName(data?.name)
    setEmail(data?.email)
    setPassword(data?.password)
  },[data])

  return (
    <>
      <button type='button' className={`btn btn-primary ms-auto ${data?'w-100':''}`} onClick={handleShow}>
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        {data?t('Update'):t('Add User')}
      </button>
      
      <Modal show={show} onHide={handleClose} size='xl'>
        <Modal.Header closeButton>
          <Modal.Title>{data?t('Update User'):t('Add User')} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label className='fs-5 text-muted mb-0' htmlFor='UserEnglishName'>{t('User English Name')}</label>
            <input
                type='text'
                data-kt-user-table-filter='search'
                className='form-control form-control-solid mb-5 ps-14'
                placeholder={`${t('User English Name')}`}
                id='UserEnglishName'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
          </div>
          <div>
            <label className='fs-5 text-muted mb-0' htmlFor='UserArabicName'>{t('User Arabic Name')}</label>
            <input
                type='text'
                data-kt-user-table-filter='search'
                className='form-control form-control-solid mb-5 ps-14'
                placeholder={`${t('User Arabic Name')}`}
                id='UserArabicName'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
          </div>
          <div>
            <label className='fs-5 text-muted mb-0' htmlFor='typeArabicName'>{t('User Password')}</label>
            <input
                type='password'
                data-kt-user-table-filter='search'
                className='form-control form-control-solid mb-5 ps-14'
                placeholder={`${t('User Password')}`}
                id='typeArabicName'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
          </div>
          
          <button type='button' className='btn btn-primary ms-auto' onClick={addType} disabled={isLoading}>
            {
              !isLoading?
              <><KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' /> {data?t('Update User'):t('Add User')} </>
              :<ReactLoading type={"spin"} color={'#ffffff'} height={30} width={30} />
            }
          </button> 
        </Modal.Body>
      </Modal>
    </>
  );
}
export {ItemModal}
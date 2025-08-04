import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { axiosConfig } from 'utils/axiosConfig';
import { KTSVG } from '_metronic/helpers';
import { toast } from 'react-toastify'
import ReactLoading from "react-loading";

function ItemModal(props:any) {
  const {getData,data}=props
  const [isLoading, setLoading]=useState(false)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [nameEn,setNameEn] =useState('')
  const [nameAr,setNameAr] =useState('')
  const [icon,setIcon] =useState('')
  const [backgroundImage,setBackgroundImage] =useState('')

  function validateInputs(){
    let status =true
    if(!nameEn){
      toast.error('Car Enslish Name Is Required')
      status=false
    }
    if(!nameAr){
      toast.error('Car Arabic Name Is Required')
      status=false
    }
    if(!icon){
      toast.error('Car Icon Is Required')
      status=false
    }
    if(!backgroundImage){
      toast.error('Car Background image Is Required')
      status=false
    }
    return status
  }

  function addType(){
    if(!validateInputs()){
      return
    }
    setLoading(true)
    const formData  = new FormData()
    formData.append('name_en',nameEn)
    formData.append('name_ar',nameAr)
    formData.append('icon',icon)
    formData.append('background_image',backgroundImage)

    if(data){
      axiosConfig.put(`/cars/update-car/${data?.id}`,formData,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    }).then(res=>{
        setLoading(false)
        toast.success(`Car ${data?'Updated':'Add'} Successfully`)
        getData()
        handleClose()
      }).catch(err=>{
        setLoading(false)
        toast.error('Something went wrong')
      })
    }else{
      axiosConfig.post(`/cars/create-car`,formData,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    }).then(res=>{
        setLoading(false)
        toast.success(`Car ${data?'Updated':'Add'} Successfully`)
        getData()
        handleClose()
      }).catch(err=>{
        setLoading(false)
        toast.error('Something went wrong')
      })
    }
  }
  useEffect(()=>{
    setNameEn(data?.name_en)
    setNameAr(data?.name_ar)
    setIcon(data?.icon)
    setBackgroundImage(data?.background_image)
  },[data])

  return (
    <>
      <button type='button' className={`btn btn-primary ms-auto ${data?'w-100':''}`} onClick={handleShow}>
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        {data?'Update':'Add A Aew Car'}
      </button>

      <Modal show={show} onHide={handleClose} size='xl'>
        <Modal.Header closeButton>
          <Modal.Title>{data?'Update':'Add'} Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label className='fs-5 text-muted mb-0' htmlFor='typeEnglishName'>Car English Name</label>
            <input
                type='text'
                data-kt-user-table-filter='search'
                className='form-control form-control-solid mb-5 ps-14'
                placeholder='Type English Name'
                id='typeEnglishName'
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
              />
          </div>
          <div>
            <label className='fs-5 text-muted mb-0' htmlFor='typeArabicName'>Car Arabic Name</label>
            <input
                type='text'
                data-kt-user-table-filter='search'
                className='form-control form-control-solid mb-5 ps-14'
                placeholder='Type Arabic Name'
                id='typeArabicName'
                value={nameAr}
                onChange={(e) => setNameAr(e.target.value)}
              />
          </div>
          <div>
            <label className='fs-5 text-muted mb-0' htmlFor='typeIconName'>Car Icon</label>
            <input
                type='file'
                data-kt-user-table-filter='search'
                className='form-control form-control-solid mb-5 ps-14'
                placeholder='Type Icon'
                id='typeIconName'
                onChange={(e:any) => setIcon(e.target.files[0])}
              />
          </div>
          <div>
            <label className='fs-5 text-muted mb-0' htmlFor='typeBackGroudnImageName'>Background Image</label>
            <input
                type='file'
                data-kt-user-table-filter='search'
                className='form-control form-control-solid mb-5 ps-14'
                placeholder='Type Background Image'
                id='typeBackGroudnImageName'
                onChange={(e:any) => setBackgroundImage(e.target.files[0])}
              />
          </div>
          
          <button type='button' className='btn btn-primary ms-auto' onClick={addType} disabled={isLoading}>
            {
              !isLoading?
              <><KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' /> {data?'Update':'Add'} Type</>
              :<ReactLoading type={"spin"} color={'#ffffff'} height={30} width={30} />
            }
          </button> 
        </Modal.Body>
      </Modal>
    </>
  );
}
export {ItemModal}
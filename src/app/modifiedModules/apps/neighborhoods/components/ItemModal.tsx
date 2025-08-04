import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { axiosConfig } from 'utils/axiosConfig';
import { KTSVG } from '_metronic/helpers';
import { toast } from 'react-toastify'
import ReactLoading from "react-loading";
import { useParams } from 'react-router-dom';
import Autocomplete from "react-google-autocomplete";
import GoogleSearchBox from './GoogleSearchBox';
function ItemModal(props:any) {
  const params:any = useParams()
  const {getData,data}=props
  const [isLoading, setLoading]=useState(false)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [nameEn,setNameEn] =useState('')
  const [nameAr,setNameAr] =useState('')
  const [nameUr,setNameUr] =useState('')
  const [latitude,setLatitude] =useState('')
  const [longitude,setLongitude] =useState('')

  function validateInputs(){
    let status =true
    if(!nameEn){
      toast.error('Neighborhood Enslish Name Is Required')
      status=false
    }
    if(!nameAr){
      toast.error('Neighborhood Arabic Name Is Required')
      status=false
    }
    if(!nameUr){
      toast.error('Neighborhood Urdu Name Is Required')
      status=false
    }
    if(!latitude||!longitude){
      toast.error('Neighborhood Location Is Required')
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
    formData.append('square_latitude',latitude)
    formData.append('square_longitude',longitude)
    formData.append('city_id',params?.id)

    if(data){
      axiosConfig.put(`/square/update-square/${data?.id}`,formData,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    }).then(res=>{
        setLoading(false)
        toast.success(`Square ${data?'Updated':'Add'} Successfully`)
        getData()
        handleClose()
        setNameEn('')
        setNameAr('')
        setNameUr('')
        setLatitude('')
        setLongitude('')
      }).catch(err=>{
        setLoading(false)
        toast.error('Something went wrong')
      })
    }else{
      axiosConfig.post(`/square/create-square`,formData,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    }).then(res=>{
        setLoading(false)
        toast.success(`Square ${data?'Updated':'Add'} Successfully`)
        getData()
        handleClose()
        setNameEn('')
        setNameAr('')
        setNameUr('')
        setLatitude('')
        setLongitude('')
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
    setLatitude(data?.square_latitude)
    setLongitude(data?.square_longitude)
  },[data])

  return (
    <>
      <button type='button' className={`btn btn-primary ms-auto ${data?'w-100':''}`} onClick={handleShow}>
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        {data?'Update':'Add Square'}
      </button>

      <Modal show={show} onHide={handleClose} size='xl'>
        <Modal.Header closeButton>
          <Modal.Title>{data?'Update':'Add'} Square</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label className='fs-5 text-muted mb-0' htmlFor='itemEnglishName'>Square English Name</label>
            <input
                type='text'
                data-kt-user-table-filter='search'
                className='form-control form-control-solid mb-5 ps-14'
                placeholder='Square English Name'
                id='itemEnglishName'
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
              />
          </div>
          <div>
            <label className='fs-5 text-muted mb-0' htmlFor='itemArabicName'>Square Arabic Name</label>
            <input
                type='text'
                data-kt-user-table-filter='search'
                className='form-control form-control-solid mb-5 ps-14'
                placeholder='Square Arabic Name'
                id='itemArabicName'
                value={nameAr}
                onChange={(e) => setNameAr(e.target.value)}
              />
          </div>
          <div>
            <label className='fs-5 text-muted mb-0' htmlFor='itemUrduName'>Square Urdu Name</label>
            <input
                type='text'
                data-kt-user-table-filter='search'
                className='form-control form-control-solid mb-5 ps-14'
                placeholder='Square Urdu Name'
                id='itemUrduName'
                value={nameUr}
                onChange={(e) => setNameUr(e.target.value)}
              />
          </div>
          <div className='position-relative'>
            <label className='fs-5 text-muted mb-0' htmlFor='itemUrduName'>Square Location</label>
            <GoogleSearchBox setLatitude={setLatitude} setLongitude={setLongitude}/>
              {/* <Autocomplete
                className='form-control form-control-solid mb-5 ps-14'
                apiKey={'AIzaSyB0-rcmuUOQddg47whAPKCYOzUSszxSNHY'}
                onPlaceSelected={(place) => {setLatitude(place?.geometry?.location?.lat());setLongitude(place?.geometry?.location?.lng())}}
              /> */}
          </div>
          <button type='button' className='btn btn-primary ms-auto' onClick={addItem} disabled={isLoading}>
            {
              !isLoading?
              <><KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' /> {data?'Update':'Add'} City</>
              :<ReactLoading type={"spin"} color={'#ffffff'} height={30} width={30} />
            }
          </button> 
        </Modal.Body>
      </Modal>
    </>
  );
}
export {ItemModal}
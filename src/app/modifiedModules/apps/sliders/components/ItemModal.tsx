import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { axiosConfig } from 'utils/axiosConfig';
import { KTSVG } from '_metronic/helpers';
import { toast } from 'react-toastify'
import ReactLoading from "react-loading";
import { useTranslation } from 'react-i18next';

function ItemModal(props:any) {
  const {getData,data,services}=props  
  const {t} =useTranslation()

  const [isLoading, setLoading]=useState(false)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [nameEn,setNameEn] =useState('')
  const [nameAr,setNameAr] =useState('')
  const [descriptionEn,setDescriptionEn] =useState('')
  const [descriptionAr,setDescriptionAr] =useState('')
  const [service,setService] =useState('')
  const [orderNumber,setOrderNumber] =useState('')

  const [image,setImage]=useState<any>([])

  function handleUploadedImage(e:any){
    let files =e.target.files
    files = [...files ].map(file =>
        Object.assign(file, {
            preview: URL.createObjectURL(file),
        })
    )
    setImage(files[0])
  }

  function validateInputs(){
    let status =true
    if(!nameEn){
      toast.error(t('Slider Enslish Name Is Required'))
      status=false
    }
    if(!nameAr){
      toast.error(t('Slider Arabic Name Is Required'))
      status=false
    }
    if(!descriptionEn){
      toast.error(t('Slider Enslish Description Is Required'))
      status=false
    }
    if(!descriptionAr){
      toast.error(t('Slider Arabic Description Is Required'))
      status=false
    }
    if(!image){
      toast.error(t('Slider Image Is Required'))
      status=false
    }
    if(!orderNumber){
      toast.error(t('Slider Order Number Is Required'))
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
    formData.append('title_en',nameEn)
    formData.append('title_ar',nameAr)
    formData.append('description_en',descriptionEn)
    formData.append('description_ar',descriptionAr)
    // formData.append('service_id',service)
    formData.append('image',image)
    formData.append('order_number',orderNumber)

    if(data){
      axiosConfig.put(`/slider/update-slider/${data?.id}`,formData,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    }).then(res=>{
        setLoading(false)
        toast.success(t(`slider Updated Successfully`))
        getData()
        handleClose()
      }).catch(err=>{
        setLoading(false)
        toast.error(t('Something went wrong'))
      })
    }else{
      axiosConfig.post(`/slider/create-slider`,formData,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    }).then(res=>{
        setLoading(false)
        toast.success(t(`slider Added Successfully`))
        getData()
        handleClose()
      }).catch(err=>{
        setLoading(false)
        toast.error(t('Something went wrong'))
      })
    }
  }

  useEffect(()=>{
    setNameEn(data?.title_en)
    setNameAr(data?.title_ar)
    setDescriptionEn(data?.description_en)
    setDescriptionAr(data?.description_ar)
    // setService(data?.service_id)
    setImage(data?.image)
    setOrderNumber(data?.order_number)
  },[data,services])

  return (
    <>
      <button type='button' className={`btn btn-primary ms-auto ${data?'w-100':''}`} onClick={handleShow}>
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        {data?t('Update'):t('Add Slider')}
      </button>

      <Modal show={show} onHide={handleClose} size='xl'>
        <Modal.Header closeButton>
          <Modal.Title>{data?t('Update Slider'):t('Add Slider')} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label className='fs-5 text-muted mb-0' htmlFor='itemEnglishName'>{t('Slider English Name')}</label>
            <input
                type='text'
                data-kt-user-table-filter='search'
                className='form-control form-control-solid mb-5 ps-14'
                placeholder={`${t('Slider English Name')}`}
                id='itemEnglishName'
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
              />
          </div>
          <div>
            <label className='fs-5 text-muted mb-0' htmlFor='itemArabicName'>{t('Slider Arabic Name')}</label>
            <input
                type='text'
                data-kt-user-table-filter='search'
                className='form-control form-control-solid mb-5 ps-14'
                placeholder={`${t('Slider Arabic Name')}`}
                id='itemArabicName'
                value={nameAr}
                onChange={(e) => setNameAr(e.target.value)}
              />
          </div>
          <div>
            <label className='fs-5 text-muted mb-0' htmlFor='orderNumber'>{t('Slider Order Number')}</label>
            <input
                type='text'
                data-kt-user-table-filter='search'
                className='form-control form-control-solid mb-5 ps-14'
                placeholder={`${t('Slider Order Number')}`}
                id='orderNumber'
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
              />
          </div>
          <div>
            <label className='fs-5 text-muted mb-0' htmlFor='itemEnglishDescription'>{t('Slider English Description')}</label>
            <input
                type='text'
                data-kt-user-table-filter='search'
                className='form-control form-control-solid mb-5 ps-14'
                placeholder={`${t('Slider English Description')}`}
                id='itemEnglishDescription'
                value={descriptionEn}
                onChange={(e) => setDescriptionEn(e.target.value)}
              />
          </div>
          <div>
            <label className='fs-5 text-muted mb-0' htmlFor='itemArabicDescription'>{t('Slider Arabic Description')}</label>
            <input
                type='text'
                data-kt-user-table-filter='search'
                className='form-control form-control-solid mb-5 ps-14'
                placeholder={`${t('Slider Arabic Name')}`}
                id='itemArabicDescription'
                value={descriptionAr}
                onChange={(e) => setDescriptionAr(e.target.value)}
              />
          </div>
          {/* <div>
              <label className='fs-5 text-muted mb-0' htmlFor='service'>{t('Service')}</label>
              <select
                  name='timezone'
                  aria-label='Select a Timezone'
                  data-control='select2'
                  data-placeholder='date_period'
                  className='form-select form-select-lg form-select-solid mb-5 ps-14'
                  id='service'
                  value={service}
                  onChange={(e) => setService(e.target.value)}
              >
                  <option value=''>{t('Please Select Service')}</option>
                  {
                    services && services?.map((service:any)=>(
                      <option value={service?.id} key={service?.id}>{service?.title}</option>
                    ))
                  }
                  
              </select>
          </div> */}
          <div>
                <label className='fs-5 text-muted mb-0 mt-5' htmlFor='carImage'>{t('Slider Image')}</label>
                <div>
                <input
                    type='file'
                    data-kt-user-table-filter='search'
                    className='form-control form-control-solid mb-5 ps-14'
                    placeholder='Type Icon'
                    id='carImage'
                    onChange={(e:any) => handleUploadedImage(e)}
                    accept={'.jpg,.png,.gif,.jpeg'}
                />
                </div>
                {
                    image&&(image?.preview||image?.length!=0)&&
                        <div>
                            <div className='mb-5 d-flex align-items-center justify-content-between'>
                                <img src={image?.preview ?image?.preview:image} alt='img' style={{width:'100px',height:'100px'}}/>
                                <button onClick={()=>{setImage(null)}}
                                className='btn btn-danger ms-auto'>{t('Delete')}</button>
                            </div>
                        </div>
                }
            </div>
          <button type='button' className='btn btn-primary ms-auto' onClick={addItem} disabled={isLoading}>
            {
              !isLoading?
              <><KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' /> {data?t('Update'):t('Add Slider')}</>
              :<ReactLoading type={"spin"} color={'#ffffff'} height={30} width={30} />
            }
          </button> 
        </Modal.Body>
      </Modal>
    </>
  );
}
export {ItemModal}
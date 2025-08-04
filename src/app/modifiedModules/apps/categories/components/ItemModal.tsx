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
      toast.error(t('Category Enslish Name Is Required'))
      status=false
    }
    if(!nameAr){
      toast.error(t('Category Arabic Name Is Required'))
      status=false
    }
    if(!nameUr){
      toast.error(t('Category Urdu Name Is Required'))
      status=false
    }
    if(!image){
      toast.error(t('Category Image Is Required'))
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
    formData.append('title_ur',nameUr)
    formData.append('image',image)

    if(data){
      axiosConfig.put(`/category/update-category/${data?.id}`,formData,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    }).then(res=>{
        setLoading(false)
        toast.success(t(`Category Updated Successfully`))
        getData()
        handleClose()
      }).catch(err=>{
        setLoading(false)
        toast.error(t('Something went wrong'))
      })
    }else{
      axiosConfig.post(`/category/create-category`,formData,{
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    }).then(res=>{
        setLoading(false)
        toast.success(t(`Category Added Successfully`))
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
    setNameUr(data?.title_ur)
    setImage(data?.image)
  },[data])

  return (
    <>
      <button type='button' className={`btn btn-primary ms-auto ${data?'w-100':''}`} onClick={handleShow}>
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        {data?t('Update'):t('Add Category')}
      </button>

      <Modal show={show} onHide={handleClose} size='xl'>
        <Modal.Header closeButton>
          <Modal.Title>{data?t('Update Category'):t('Add Category')} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label className='fs-5 text-muted mb-0' htmlFor='itemEnglishName'>{t('Category English Name')}</label>
            <input
                type='text'
                data-kt-user-table-filter='search'
                className='form-control form-control-solid mb-5 ps-14'
                placeholder={`${t('Category English Name')}`}
                id='itemEnglishName'
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
              />
          </div>
          <div>
            <label className='fs-5 text-muted mb-0' htmlFor='itemArabicName'>{t('Category Arabic Name')}</label>
            <input
                type='text'
                data-kt-user-table-filter='search'
                className='form-control form-control-solid mb-5 ps-14'
                placeholder={`${t('Category Arabic Name')}`}
                id='itemArabicName'
                value={nameAr}
                onChange={(e) => setNameAr(e.target.value)}
              />
          </div>
          <div>
            <label className='fs-5 text-muted mb-0' htmlFor='itemUrduName'>{t('Category Urdu Name')}</label>
            <input
                type='text'
                data-kt-user-table-filter='search'
                className='form-control form-control-solid mb-5 ps-14'
                placeholder={`${t('Category Urdu Name')}`}
                id='itemUrduName'
                value={nameUr}
                onChange={(e) => setNameUr(e.target.value)}
              />
          </div>
          <div>
                <label className='fs-5 text-muted mb-0 mt-5' htmlFor='carImage'>{t('Category Image')}</label>
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
              <><KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' /> {data?t('Update'):t('Add Category')}</>
              :<ReactLoading type={"spin"} color={'#ffffff'} height={30} width={30} />
            }
          </button> 
        </Modal.Body>
      </Modal>
    </>
  );
}
export {ItemModal}
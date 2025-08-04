import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { axiosConfig } from 'utils/axiosConfig'
import { KTSVG } from '_metronic/helpers'
import { toast } from 'react-toastify'
import ReactLoading from "react-loading";
import { useNavigate, useParams } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useTranslation } from 'react-i18next'

function AddUpdateItemForm() {
    const {t} =useTranslation()
    const navigate=useNavigate()
    const params = useParams()
    const [item,setItem]=useState<any>(null)
    const [isLoading,setIsLoading]=useState(false)
    const [titleEn,setTitleEn]=useState('')
    const [titleAr,setTitleAr]=useState('')
    const [titleUr,setTitleUr]=useState('')
    const [descEn,setDescEn]=useState('')
    const [descAr,setDescAr]=useState('')
    const [descUr,setDescUr]=useState('')
    const [link,setLink]=useState<any>('')
    const [linkType,setLinkType]=useState<any>('')

    const [image,setImage]=useState<any>([])

    function getItem(){
        axiosConfig.get(`/advertisement/${params.id}`,{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res=>{
            setItem(res.data.data)
            console.log(res.data.data)
        }).catch(err=>{
            console.log(err)
        })
    }
    useEffect(()=>{
        if(params.id){
            getItem()
        }
    },[])

    function handleUploadedImage(e:any){
        let files =e.target.files
        files = [...files ].map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
            })
        )
        setImage(files[0])
    }
    useEffect(()=>{
        setTitleEn(item?.title_en)
        setTitleAr(item?.title_ar)
        setTitleUr(item?.title_ur)
        setDescEn(item?.description_en)
        setDescAr(item?.description_ar)
        setDescUr(item?.description_ur)
        setLink(item?.link)
        setLinkType(item?.type)
        setImage(item?.background_image?item?.background_image:[])

    },[item])
        
    function validateInputs(){
        let status =true
        if(!titleEn){
        toast.error(t('Advertisement title English Name Is Required'))
        status=false
        }
        if(!titleAr){
        toast.error(t('Advertisement title Arabic Name Is Required'))
        status=false
        }
        if(!titleUr){
        toast.error(t('Advertisement title Urdu Is Required'))
        status=false
        }
        if(!descEn){
        toast.error(t('Advertisement Description English Name Is Required'))
        status=false
        }
        if(!descAr){
        toast.error(t('Advertisement Description Arabic Name Is Required'))
        status=false
        }
        if(!descUr){
        toast.error(t('Advertisement Description Urdu Is Required'))
        status=false
        }
        if(image.length==0){
        toast.error(t('Advertisement image Is Required'))
        status=false
        }
        if(!link && linkType==2){
        toast.error(t('Advertisement Link Is Required'))
        status=false
        }
        if(!linkType){
        toast.error(t('Advertisement Link Type Is Required'))
        status=false
        }
        return status
    }

    function addUpdateItem(){
        if(!validateInputs()){
        return
        }
        setIsLoading(true)
        const formData  = new FormData()
        formData.append('title_en',titleEn)
        formData.append('title_ar',titleAr)
        formData.append('title_ur',titleUr)
        formData.append('description_en',descEn)
        formData.append('description_ar',descAr)
        formData.append('description_ur',descUr)
        formData.append('link',link)
        formData.append('type',linkType)

        formData.append('background_image',image)
        if(item){
            axiosConfig.put(`/advertisement/update-advertisment/${params.id}`,formData,{
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res=>{
                setIsLoading(false)
                toast.success(t(`Advertisement Updated Successfully`))
                navigate('/apps/advertisements/all')
            }).catch(err=>{
                setIsLoading(false)
                toast.error(t('Something went wrong'))
            })
        }else{
            axiosConfig.post(`/advertisement/create-advertisment`,formData,{
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res=>{
                setIsLoading(false)
                toast.success(t(`Advertisement Added Successfully`))
                navigate('/apps/advertisements/all')
            }).catch(err=>{
                setIsLoading(false)
                toast.error(err?.response?.data?.message)
            })
        }
    }

  return (
    <div className='p-5 card'>
        <Row>
            <Col sm='12'>
                <div>
                    <label className='fs-5 text-muted mb-0' htmlFor='linkType'>{t('Link Type')}</label>
                    <select
                        name='timezone'
                        aria-label='Select a Timezone'
                        data-control='select2'
                        data-placeholder='date_period'
                        className='form-select form-select-lg form-select-solid mb-5 ps-14'
                        id='linkType'
                        value={linkType}
                        onChange={(e) => setLinkType(e.target.value)}
                    >
                        <option value=''>{t('Please Select Link Type')}</option>
                        <option value='1'>{t('Normal')}</option>
                        <option value='2'>{t('Link')}</option>
                        
                    </select>
                </div>
            </Col>
            {
                linkType==2&&
                    <Col sm='12'>
                        <div>
                            <label className='fs-5 text-muted mb-0' htmlFor='link'>{t('Link')}</label>
                            <input
                                type='text'
                                data-kt-user-table-filter='search'
                                className='form-control form-control-solid mb-5 ps-14'
                                placeholder='Type Link'
                                id='link'
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                            />
                        </div>
                    </Col>
            }
            <Col sm='12' className='my-5'>
                <div>
                    <label className='fs-5 text-muted mb-0' htmlFor='titleEn'>{t('Title English')}</label>
                        <input
                                type='text'
                                data-kt-user-table-filter='search'
                                className='form-control form-control-solid mb-5 ps-14'
                                placeholder={`${t('Type English Title')}`}
                                id='titleEn'
                                value={titleEn}
                                onChange={(e) => setTitleEn(e.target.value)}
                            />
                </div>
            </Col>
            <Col sm='12' className='my-5'>
                <div>
                    <label className='fs-5 text-muted mb-0' htmlFor='titleAr'>{t('Title Arabic')}</label>
                        <input
                                type='text'
                                data-kt-user-table-filter='search'
                                className='form-control form-control-solid mb-5 ps-14'
                                placeholder={`${t('Type Arabic Title')}`}
                                id='titleAr'
                                value={titleAr}
                                onChange={(e) => setTitleAr(e.target.value)}
                            />
                </div>
            </Col>
            <Col sm='12' className='my-5'>
                <div>
                    <label className='fs-5 text-muted mb-0' htmlFor='titleUr'>{t('Title Urdu')}</label>
                        <input
                                type='text'
                                data-kt-user-table-filter='search'
                                className='form-control form-control-solid mb-5 ps-14'
                                placeholder={`${t('Type Urdu Title')}`}
                                id='titleUr'
                                value={titleUr}
                                onChange={(e) => setTitleUr(e.target.value)}
                            />
                </div>
            </Col>

            <Col sm='12' className='my-5'>
                <div>
                    <label className='fs-5 text-muted mb-0' htmlFor='contentEn'>{t('Description English')}</label>
                        <textarea
                            className={'form-control form-control-solid mb-5 '}
                            onChange={(e)=>setDescEn(e.target.value)}
                            id='contentEn'
                            value={descEn}
                            style={{height:'300px'}}
                        ></textarea>
                </div>
            </Col>
            <Col sm='12' className='my-5'>
                <div>
                    <label className='fs-5 text-muted mb-0' htmlFor='contentAr'>{t('Description Arabic')}</label>
                        <textarea
                            className={'form-control form-control-solid mb-5 '}
                            onChange={(e)=>setDescAr(e.target.value)}
                            id='contentAr'
                            value={descAr}
                            style={{height:'300px'}}
                        ></textarea>
                </div>
            </Col>
            <Col sm='12' className='my-5'>
                <div>
                    <label className='fs-5 text-muted mb-0' htmlFor='contentUr'>{t('Description Urdu')}</label>
                        <textarea
                            className={'form-control form-control-solid mb-5 '}
                            onChange={(e)=>setDescUr(e.target.value)}
                            id='contentUr'
                            value={descUr}
                            style={{height:'300px'}}
                        ></textarea>
                </div>
            </Col>

            <Col sm='12'>
                <div>
                    <label className='fs-5 text-muted mb-0 mt-5' htmlFor='carImage'>{t('Background Image')}</label>
                    <div>
                    <input
                        type='file'
                        data-kt-user-table-filter='search'
                        className='form-control form-control-solid mb-5 ps-14'
                        placeholder='Type Icon'
                        id='carImage'
                        onChange={(e:any) => handleUploadedImage(e)}
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
            </Col>
            <div className='d-flex'>
                <button type='button' className='btn btn-primary ms-auto d-flex align-items-center justify-content-center w-100' onClick={addUpdateItem} disabled={isLoading}>
                    {
                    !isLoading?
                    <><KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />{item?t('Update'):t('Add Advertisement')} </>
                    :<ReactLoading type={"spin"} color={'#ffffff'} height={30} width={30} />
                }
                </button> 
            </div>

        </Row>
    </div>
  )
}

export default AddUpdateItemForm
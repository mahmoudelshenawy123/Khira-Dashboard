import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { axiosConfig } from 'utils/axiosConfig'
import { KTSVG } from '_metronic/helpers'
import { toast } from 'react-toastify'
import ReactLoading from "react-loading";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useTranslation } from 'react-i18next'

function GeneralSettingsForm(props:any) {
    const {data}=props
    const {t} =useTranslation()
    const [isLoading,setIsLoading]=useState(false)
    const [termsEn,setTermsEn]=useState('')
    const [termsAr,setTermsAr]=useState('')
    const [termsUr,setTermsUr]=useState('')
    const [aboutUsEn,setAboutUsEn]=useState('')
    const [aboutUsAr,setAboutUsAr]=useState('')
    const [aboutUsUr,setAboutUsUr]=useState('')
    const [isProjectInFactoryMode,setIsProjectInFactoryMode]=useState('')

    useEffect(()=>{
        setTermsEn(data?.terms_and_conditionds_en)
        setTermsAr(data?.terms_and_conditionds_ar)
        // setTermsUr(data?.terms_and_conditionds_ur)
        setAboutUsEn(data?.privacy_en)
        setAboutUsAr(data?.privacy_ar)
        // setAboutUsUr(data?.about_us_ur)
        // setIsProjectInFactoryMode(data?.is_project_In_factory_mode)
    },[data])
    
    function validateInputs(){
        let status =true
        if(!termsEn){
            toast.error(t('Terms English Conetnt Is Required'))
            status=false
        }
        if(!termsAr){
            toast.error(t('Terms Arabic Conetnt Is Required'))
            status=false
        }
        // if(!termsUr){
        //     toast.error(t('Terms Urdu Conetnt Is Required'))
        //     status=false
        // }
        if(!aboutUsEn){
            toast.error(t('Privacy English Conetnt Is Required'))
            status=false
        }
        if(!aboutUsAr){
            toast.error(t('Privacy Arabic Conetnt Is Required'))
            status=false
        }
        // if(!aboutUsUr){
        //     toast.error(t('About Us Urdu Conetnt Is Required'))
        //     status=false
        // }
        // if(!isProjectInFactoryMode){
        //     toast.error(t('Is Project In Factory Mode Is Required'))
        //     status=false
        // }
        return status
    }

    function updateSettings(){
        if(!validateInputs()) {return}

        setIsLoading(true)
        const formData  = new FormData()
        formData.append('terms_and_conditionds_en',termsEn)
        formData.append('terms_and_conditionds_ar',termsAr)
        // formData.append('terms_and_conditionds_ur',termsUr)
        formData.append('privacy_en',aboutUsEn)
        formData.append('privacy_ar',aboutUsAr)
        // formData.append('about_us_ur',aboutUsUr)
        formData.append('is_project_In_factory_mode',isProjectInFactoryMode)
        axiosConfig.put(`/static-pages/update-static-pages`,formData,{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res=>{
            setIsLoading(false)
            toast.success(t(`Privacy Settings Updated Successfully`))
        }).catch(err=>{
            setIsLoading(false)
            toast.error(t('Something went wrong'))
        })
    }
  return (
    <div className='p-5'>
        <Row>
            {/* <Col sm='12' className='my-5'>
                <div>
                    <label className='fs-5 text-muted mb-0' htmlFor='additionalMilage'>{t('Is Project In Factory Mode')} </label>
                    <select
                        name='timezone'
                        aria-label='Select a Timezone'
                        data-control='select2'
                        data-placeholder='date_period'
                        className='form-select form-select-lg form-select-solid mb-5 ps-14'
                        id='linkType'
                        value={isProjectInFactoryMode}
                        onChange={(e) => setIsProjectInFactoryMode(e.target.value)}
                    >
                        <option value=''>{t('Please Select Project In Factory Mode')}</option>
                        <option value='1'>{t('Projct Run Normal')}</option>
                        <option value='2'>{t('Project In Factory Mode')}</option>
                        
                    </select>
                </div>
            </Col> */}
            <Col sm='12' className='my-5 py-5 py-5'>
                <div>
                    <label className='fs-5 text-muted mb-0' htmlFor='additionalMilage'>{t('Terms English Content')}</label>
                    <ReactQuill
                        className={' mb-5 '}
                        onChange={(data)=>setTermsEn(data)}
                        value={termsEn}
                        style={{height:'300px'}}
                        theme="snow" 
                        />
                </div>
            </Col>
            <Col sm='12' className='my-5 py-5'>
                <div>
                    <label className='fs-5 text-muted mb-0' htmlFor='additionalMilage'>{t('Terms Arabic Content')}</label>
                    <ReactQuill
                        className={' mb-5 '}
                        onChange={(data)=>setTermsAr(data)}
                        value={termsAr}
                        style={{height:'300px'}}
                        theme="snow" 
                        />
                </div>
            </Col>
            {/* <Col sm='12' className='my-5 py-5'>
                <div>
                    <label className='fs-5 text-muted mb-0' htmlFor='additionalMilage'>{t('Terms Urdu Content')}</label>
                    <ReactQuill
                        className={' mb-5 '}
                        onChange={(data)=>setTermsUr(data)}
                        value={termsUr}
                        style={{height:'300px'}}
                        theme="snow" 
                        />
                </div>
            </Col> */}
            <Col sm='12' className='my-5 py-5'>
                <div>
                    <label className='fs-5 text-muted mb-0' htmlFor='additionalMilage'>{t('Privacy English Content')}</label>
                    <ReactQuill
                        className={' mb-5 '}
                        onChange={(data)=>setAboutUsEn(data)}
                        value={aboutUsEn}
                        style={{height:'300px'}}
                        theme="snow" 
                        />
                </div>
            </Col>
            <Col sm='12' className='my-5 py-5'>
                <div>
                    <label className='fs-5 text-muted mb-0' htmlFor='additionalMilage'>{t('Privacy Arabic Content')}</label>
                    <ReactQuill
                        className={' mb-5 '}
                        onChange={(data)=>setAboutUsAr(data)}
                        value={aboutUsAr}
                        style={{height:'300px'}}
                        theme="snow" 
                        />
                </div>
            </Col>
            {/* <Col sm='12' className='my-5'>
                <div>
                    <label className='fs-5 text-muted mb-0' htmlFor='additionalMilage'>{t('Privacy Urdu Content')}</label>
                    <ReactQuill
                        className={' mb-5 '}
                        onChange={(data)=>setAboutUsUr(data)}
                        value={aboutUsUr}
                        style={{height:'300px'}}
                        theme="snow" 
                        />
                </div>
            </Col> */}
            
                <button type='button' className='btn btn-primary ms-auto d-flex align-items-ceter justify-content-center mt-6' onClick={updateSettings} disabled={isLoading}>
                    {
                    !isLoading?
                    <><KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />{t('Update Settings')}</>
                    :<ReactLoading type={"spin"} color={'#ffffff'} height={30} width={30} />
                    }
                </button> 

        </Row>
    </div>
  )
}

export default GeneralSettingsForm
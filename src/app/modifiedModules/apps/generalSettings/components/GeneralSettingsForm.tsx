import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { axiosConfig } from 'utils/axiosConfig'
import { KTSVG } from '_metronic/helpers'
import { toast } from 'react-toastify'
import ReactLoading from "react-loading";
import { useTranslation } from 'react-i18next'

function GeneralSettingsForm(props:any) {
    const {data}=props
    const {t} = useTranslation()
    const [isLoading,setIsLoading]=useState(false)
    const [mainBgColor,setMainBgColor]=useState('')
    const [mainTextColor,setMainTextColor]=useState('')
    const [contactEmail,setContactEmail]=useState('')
    const [contactPhone,setContactPhone]=useState('')
    const [contactWhatsAppPhone,setContactWhatsappPhone]=useState('')
    const [facebookLink,setFacebookLink]=useState('')
    const [twitterLink,setTwitterLink]=useState('')
    const [instagramLink,setInstagramLink]=useState('')
    const [shippingCharges,setShippingCharges]=useState('')
    const [vatValue,setVatValue]=useState('')
    const [tiktokLink,setTiktokLink]=useState('')
    const [isProjectInFactoryMode,setIsProjectInFactoryMode]=useState('')
    const [isOnlinePaymentActive,setIsOnlinePaymentActive]=useState('')
    const [isCashPaymentActive,setIsCashPaymentActive]=useState('')
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
    useEffect(()=>{
        setMainBgColor(data?.project_main_background_color)
        setMainTextColor(data?.project_main_text_color)
        setContactEmail(data?.project_email_address)
        setContactPhone(data?.project_phone_number)
        setContactWhatsappPhone(data?.project_whats_app_number)
        setFacebookLink(data?.project_facebook_link)
        setTwitterLink(data?.project_twitter_link)
        setInstagramLink(data?.project_instagram_link)
        setShippingCharges(data?.shipping_chargers)
        setVatValue(data?.vat_value)
        setTiktokLink(data?.tiktok_link)
        setIsProjectInFactoryMode(data?.is_project_In_factory_mode)
        setIsOnlinePaymentActive(data?.is_online_payment_active)
        setIsCashPaymentActive(data?.is_cash_payment_active)
        setImage(data?.project_logo)
    },[data])
    
    function validateInputs(){
        let status =true
        // if(!mainBgColor){
        // toast.error('Main Background Color Is Required')
        // status=false
        // }
        // if(!mainTextColor){
        // toast.error('Main Text Color Is Required')
        // status=false
        // }
        // if(!contactEmail){
        // toast.error('Contact Email Is Required')
        // status=false
        // }
        // if(!contactPhone){
        // toast.error('Contact Phone Is Required')
        // status=false
        // }
        return status
    }

    function updateSettings(){
        if(!validateInputs()) {return}

        setIsLoading(true)
        const formData  = new FormData()
        // formData.append('project_logo',image)
        formData.append('project_main_background_color',mainBgColor)
        formData.append('project_main_text_color',mainTextColor)
        formData.append('project_email_address',contactEmail)
        formData.append('project_phone_number',contactPhone)
        formData.append('project_whats_app_number',contactWhatsAppPhone)
        formData.append('project_facebook_link',facebookLink)
        formData.append('project_twitter_link',twitterLink)
        formData.append('project_instagram_link',instagramLink)
        formData.append('shipping_chargers',shippingCharges)
        // formData.append('vat_value',vatValue)
        // formData.append('tiktok_link',tiktokLink)
        // formData.append('is_project_In_factory_mode',isProjectInFactoryMode)
        formData.append('is_online_payment_active',isOnlinePaymentActive)
        formData.append('is_cash_payment_active',isCashPaymentActive)
        
        axiosConfig.put(`/settings/update-settings`,formData,{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res=>{
            setIsLoading(false)
            toast.success(`General Settings Updated Successfully`)
        }).catch(err=>{
            setIsLoading(false)
            toast.error('Something went wrong')
        })
    }
  return (
    <div className='p-5'>
        <Row>
            {/* <Col lg='12'>
                <div>
                    <label className='fs-5 text-muted mb-0 ' htmlFor='carImage'>{t('Category Image')}</label>
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
            </Col> */}
            {/* <Col sm='6'>
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
            <Col sm='6'>
                <div>
                    <label className='fs-5 text-muted mb-0' htmlFor='additionalMilage'>{t('Is Online Payment Active')} </label>
                    <select
                        name='timezone'
                        aria-label='Select a Timezone'
                        data-control='select2'
                        data-placeholder='date_period'
                        className='form-select form-select-lg form-select-solid mb-5 ps-14'
                        id='linkType'
                        value={isOnlinePaymentActive}
                        onChange={(e) => setIsOnlinePaymentActive(e.target.value)}
                    >
                        <option value='1'>{t('Active')}</option>
                        <option value='2'>{t('Deactive')}</option>
                        
                    </select>
                </div>
            </Col>
            <Col sm='6'>
                <div>
                    <label className='fs-5 text-muted mb-0' htmlFor='additionalMilage'>{t('Is Cash Payment Active')} </label>
                    <select
                        name='timezone'
                        aria-label='Select a Timezone'
                        data-control='select2'
                        data-placeholder='date_period'
                        className='form-select form-select-lg form-select-solid mb-5 ps-14'
                        id='linkType'
                        value={isCashPaymentActive}
                        onChange={(e) => setIsCashPaymentActive(e.target.value)}
                    >
                    <option value='1'>{t('Active')}</option>
                    <option value='2'>{t('Deactive')}</option>
                    </select>
                </div>
            </Col>
            {/* <Col sm='6'>
                <div>
                    <label className='fs-5 text-muted mb-0' htmlFor='locationEn'>Main Background Color</label>
                    <input
                        type='color'
                        data-kt-user-table-filter='search'
                        className='form-control form-control-solid mb-5 ps-14'
                        placeholder='Type Main Background Color'
                        id='locationEn'
                        value={mainBgColor}
                        onChange={(e) => setMainBgColor(e.target.value)}
                    />
                </div>
            </Col>
            <Col sm='6'>
                <div>
                    <label className='fs-5 text-muted mb-0' htmlFor='locationar'>Main Text Color</label>
                    <input
                        type='color'
                        data-kt-user-table-filter='search'
                        className='form-control form-control-solid mb-5 ps-14'
                        placeholder='Type Main Text Color'
                        id='locationar'
                        value={mainTextColor}
                        onChange={(e) => setMainTextColor(e.target.value)}
                    />
                </div>
            </Col> */}
            <Col sm='6'>
                <div>
                    <label className='fs-5 text-muted mb-0' htmlFor='contactEmail'>{t('Contact Email')}</label>
                    <input
                        type='text'
                        data-kt-user-table-filter='search'
                        className='form-control form-control-solid mb-5 ps-14'
                        placeholder={`${t('Type Contact Email')}`}
                        id='contactEmail'
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                    />
                </div>
            </Col>
            {/* <Col sm='6'>
                <div>
                    <label className='fs-5 text-muted mb-0' htmlFor='contactPhone'>{t('Contact Phone')}</label>
                    <input
                        type='text'
                        data-kt-user-table-filter='search'
                        className='form-control form-control-solid mb-5 ps-14'
                        placeholder={`${t('Type Contact Phone')}`}
                        id='contactPhone'
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                    />
                </div>
            </Col> */}
            <Col sm='6'>
                <div>
                    <label className='fs-5 text-muted mb-0' htmlFor='contactWhatsAppPhone'>{t('Contact Whatsapp Number')}</label>
                    <input
                        type='text'
                        data-kt-user-table-filter='search'
                        className='form-control form-control-solid mb-5 ps-14'
                        placeholder={`${t('Type Contact  Whatsapp Phone')}`}
                        id='contactWhatsAppPhone'
                        value={contactWhatsAppPhone}
                        onChange={(e) => setContactWhatsappPhone(e.target.value)}
                    />
                </div>
            </Col>
            {/* <Col sm='6'>
                <div>
                    <label className='fs-5 text-muted mb-0' htmlFor='facebookLink'>{t('Facebook Link')}</label>
                    <input
                        type='text'
                        data-kt-user-table-filter='search'
                        className='form-control form-control-solid mb-5 ps-14'
                        placeholder={`${t('Type Facebook Link')}`}
                        id='facebookLink'
                        value={facebookLink}
                        onChange={(e) => setFacebookLink(e.target.value)}
                    />
                </div>
            </Col> */}
            {/* <Col sm='6'>
                <div>
                    <label className='fs-5 text-muted mb-0' htmlFor='twitterLink'>{t('Twitter Link')}</label>
                    <input
                        type='text'
                        data-kt-user-table-filter='search'
                        className='form-control form-control-solid mb-5 ps-14'
                        placeholder={`${t('Type Twitter Link')}`}
                        id='twitterLink'
                        value={twitterLink}
                        onChange={(e) => setTwitterLink(e.target.value)}
                    />
                </div>
            </Col> */}
            <Col sm='6'>
                <div>
                    <label className='fs-5 text-muted mb-0' htmlFor='instagramLink'>{t('Instagram Link')}</label>
                    <input
                        type='text'
                        data-kt-user-table-filter='search'
                        className='form-control form-control-solid mb-5 ps-14'
                        placeholder={`${t('Type Instagram Link')}`}
                        id='instagramLink'
                        value={instagramLink}
                        onChange={(e) => setInstagramLink(e.target.value)}
                    />
                </div>
            </Col>
            <Col sm='6'>
                <div>
                    <label className='fs-5 text-muted mb-0' htmlFor='shippingCharges'>{t('Shipping Charges')}</label>
                    <input
                        type='number'
                        data-kt-user-table-filter='search'
                        className='form-control form-control-solid mb-5 ps-14'
                        placeholder={`${t('Type Shipping Charges')}`}
                        id='shippingCharges'
                        value={shippingCharges}
                        onChange={(e) => setShippingCharges(e.target.value)}
                    />
                </div>
            </Col>
            {/* <Col sm='6'>
                <div>
                    <label className='fs-5 text-muted mb-0' htmlFor='vatValue'>{t('Vat Value')}</label>
                    <input
                        type='number'
                        data-kt-user-table-filter='search'
                        className='form-control form-control-solid mb-5 ps-14'
                        placeholder={`${t('Type LinkedIn Link')}`}
                        id='vatValue'
                        value={vatValue}
                        onChange={(e) => setVatValue(e.target.value)}
                    />
                </div>
            </Col> */}
            {/* <Col sm='6'>
                <div>
                    <label className='fs-5 text-muted mb-0' htmlFor='tiktoklink'>Tiktok Link</label>
                    <input
                        type='text'
                        data-kt-user-table-filter='search'
                        className='form-control form-control-solid mb-5 ps-14'
                        placeholder='Type Tiktok Link'
                        id='tiktoklink'
                        value={tiktokLink}
                        onChange={(e) => setTiktokLink(e.target.value)}
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
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { axiosConfig } from 'utils/axiosConfig'
import { KTSVG } from '_metronic/helpers'
import { toast } from 'react-toastify'
import ReactLoading from "react-loading"
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useTranslation } from 'react-i18next'

function GeneralSettingsForm(props: any) {
  const { data } = props
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)

  // Terms
  const [termsEn, setTermsEn] = useState('')
  const [termsAr, setTermsAr] = useState('')

  // Privacy
  const [privacyEn, setPrivacyEn] = useState('')
  const [privacyAr, setPrivacyAr] = useState('')

  // About Us
  const [aboutUsEn, setAboutUsEn] = useState('')
  const [aboutUsAr, setAboutUsAr] = useState('')

  useEffect(() => {
    if (data) {
      setTermsEn(data?.terms_and_conditionds_en || '')
      setTermsAr(data?.terms_and_conditionds_ar || '')

      setPrivacyEn(data?.privacy_en || '')
      setPrivacyAr(data?.privacy_ar || '')

      setAboutUsEn(data?.about_us_en || '')
      setAboutUsAr(data?.about_us_ar || '')
    }
  }, [data])

  function validateInputs() {
    let status = true

    if (!termsEn) {
      toast.error(t('Terms English Content is required'))
      status = false
    }
    if (!termsAr) {
      toast.error(t('Terms Arabic Content is required'))
      status = false
    }

    if (!privacyEn) {
      toast.error(t('Privacy English Content is required'))
      status = false
    }
    if (!privacyAr) {
      toast.error(t('Privacy Arabic Content is required'))
      status = false
    }

    if (!aboutUsEn) {
      toast.error(t('About Us English Content is required'))
      status = false
    }
    if (!aboutUsAr) {
      toast.error(t('About Us Arabic Content is required'))
      status = false
    }

    return status
  }

  function updateSettings() {
    if (!validateInputs()) {
      return
    }

    setIsLoading(true)
    const formData = new FormData()

    // Terms
    formData.append('terms_and_conditionds_en', termsEn)
    formData.append('terms_and_conditionds_ar', termsAr)

    // Privacy
    formData.append('privacy_en', privacyEn)
    formData.append('privacy_ar', privacyAr)

    // About Us
    formData.append('about_us_en', aboutUsEn)
    formData.append('about_us_ar', aboutUsAr)

    axiosConfig
      .put('/static-pages/update-static-pages', formData)
      .then(() => {
        toast.success(t('Settings updated successfully'))
      })
      .catch((err) => {
        console.error(err)
        toast.error(t('Failed to update settings'))
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div>
      <Row>
        <Col md={6}>
          <label>{t('Terms & Conditions (English)')}</label>
          <ReactQuill value={termsEn} onChange={setTermsEn} />
        </Col>
        <Col md={6}>
          <label>{t('Terms & Conditions (Arabic)')}</label>
          <ReactQuill value={termsAr} onChange={setTermsAr} />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6}>
          <label>{t('Privacy Policy (English)')}</label>
          <ReactQuill value={privacyEn} onChange={setPrivacyEn} />
        </Col>
        <Col md={6}>
          <label>{t('Privacy Policy (Arabic)')}</label>
          <ReactQuill value={privacyAr} onChange={setPrivacyAr} />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6}>
          <label>{t('About Us (English)')}</label>
          <ReactQuill value={aboutUsEn} onChange={setAboutUsEn} />
        </Col>
        <Col md={6}>
          <label>{t('About Us (Arabic)')}</label>
          <ReactQuill value={aboutUsAr} onChange={setAboutUsAr} />
        </Col>
      </Row>

      <div className="mt-5">
        <button
          className="btn btn-primary"
          disabled={isLoading}
          onClick={updateSettings}
        >
          {isLoading ? (
            <ReactLoading type="spin" height={20} width={20} />
          ) : (
            t('Save Changes')
          )}
        </button>
      </div>
    </div>
  )
}

export default GeneralSettingsForm

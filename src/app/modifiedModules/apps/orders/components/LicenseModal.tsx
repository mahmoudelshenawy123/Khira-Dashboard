import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { axiosConfig } from 'utils/axiosConfig';
import { KTSVG } from '_metronic/helpers';
import { toast } from 'react-toastify'
import ReactLoading from "react-loading";
import { Col, Row } from 'react-bootstrap';

function LicenseModal(props:any) {
  const {data}=props
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button type='button' className={`btn btn-secondary ms-auto`} onClick={handleShow}>
        Driver Licenses
      </button>
      
      <Modal show={show} onHide={handleClose} size='xl'>
        <Modal.Header closeButton>
          <Modal.Title>Driver Licenses</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md='6'>
              <div className='d-flex gap-5 align-items-center justify-content-between mb-4 h-100'>
                <label className='fs-5 text-muted mb-0' htmlFor='UserEnglishName'>Driving License Front</label>
                {
                  data?.driving_license_front_photo?
                  <img src={data?.driving_license_front_photo} style={{width:'300px',height:'300px'}} />
                  : <label className='fs-5 text-muted mb-0' htmlFor='UserEnglishName'>Not Added Yet</label>
                }
              </div>
            </Col>
            <Col md='6'>
              <div className='d-flex gap-5 align-items-center justify-content-between mb-4 h-100'>
                <label className='fs-5 text-muted mb-0' htmlFor='UserEnglishName'>Driving License Back</label>
                {
                  data?.driving_license_back_photo?
                  <img src={data?.driving_license_back_photo} style={{width:'300px',height:'300px'}} />
                  : <label className='fs-5 text-muted mb-0' htmlFor='UserEnglishName'>Not Added Yet</label>
                }
              </div>
            </Col>
            <Col md='6'>
              <div className='d-flex gap-5 align-items-center justify-content-between mb-4 h-100'>
                <label className='fs-5 text-muted mb-0' htmlFor='UserEnglishName'>Car License Front</label>
                {
                  data?.car_license_front_photo?
                  <img src={data?.car_license_front_photo} style={{width:'300px',height:'300px'}} />
                  : <label className='fs-5 text-muted mb-0' htmlFor='UserEnglishName'>Not Added Yet</label>
                }
              </div>
            </Col>
            <Col md='6'>
              <div className='d-flex gap-5 align-items-center justify-content-between mb-4 h-100'>
                <label className='fs-5 text-muted mb-0' htmlFor='UserEnglishName'>Car License Back</label>
                {
                  data?.car_license_back_photo?
                  <img src={data?.car_license_back_photo} style={{width:'300px',height:'300px'}} />
                  : <label className='fs-5 text-muted mb-0' htmlFor='UserEnglishName'>Not Added Yet</label>
                }
              </div>
            </Col>
            <Col md='6'>
              <div className='d-flex gap-5 align-items-center justify-content-between mb-4 h-100'>
                <label className='fs-5 text-muted mb-0' htmlFor='UserEnglishName'>Personal Photo</label>
                {
                  data?.car_license_back_photo?
                  <img src={data?.car_license_back_photo} style={{width:'300px',height:'300px'}} />
                  : <label className='fs-5 text-muted mb-0' htmlFor='UserEnglishName'>Not Added Yet</label>
                }
              </div>
            </Col>
          </Row>
          
        </Modal.Body>
      </Modal>
    </>
  );
}
export {LicenseModal}
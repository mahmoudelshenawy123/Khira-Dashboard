import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { axiosConfig } from 'utils/axiosConfig'
import { KTSVG } from '_metronic/helpers'
import { toast } from 'react-toastify'
import ReactLoading from "react-loading";
import { useNavigate, useParams } from 'react-router-dom'
import Resizer from "react-image-file-resizer";
import { v4 as uuidv4 } from 'uuid';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useTranslation } from 'react-i18next'
const SIEZE_MODAL = (id:any)=>{
    return{
        id:id,
        title_en:'',
        title_ar:'',
        price:'',
    }
}
function OrderDetails() {
    const {t} =useTranslation()
    const navigate=useNavigate()
    const params = useParams()
    const [order,setOrder]=useState<any>(null)
    const [orderStatus ,setOrderStatus] = useState('1')
    const [isLoading,setIsLoading]=useState(false)
    function getOrder(){
        axiosConfig.get(`/orders/single-order/${params.id}`).then(res=>{
            setOrder(res?.data?.data)
            setOrderStatus(res?.data?.data?.status)
            console.log(res?.data?.data)
        }).catch(err=>{
            console.log(err)
        })
    }
    function updateOrderStatus(value:any){
        console.log('e.target.value',value)
        setOrderStatus(value)
        let data = {
            status:value,
            order_id:params?.id
        }
        axiosConfig.post(`/orders/update-order-status`,data).then(res=>{
            toast.success('Order Status Changed Successfully')
        }).catch(err=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        getOrder()
    },[])

    return (
    <div className='p-5 card'>
        <div className='d-flex flex-column  mb-5'>
            <label className='fs-1'>{t('Status')}</label>
            <select
                name='timezone'
                aria-label='Select a Timezone'
                data-control='select2'
                data-placeholder='date_period'
                className='form-select form-select-lg form-select-solid mb-5 ps-14'
                id='linkType'
                value={orderStatus}
                onChange={(e) => updateOrderStatus(e.target.value)}
            >
                <option value=''>{t('Please Select Order Status')}</option>
                <option value='1'>{t('Processing')}</option>
                <option value='2'>{t('Out Of Delivery')}</option>
                <option value='3'>{t('Completed')}</option>
                <option value='4'>{t('Failed')}</option>
                <option value='5'>{t('Cancelled')}</option>
                
            </select>
        </div>
        <div className='d-flex flex-column  mb-5'>
            <label className='fs-1'>{t('Products')}</label>
            {
                order?.products && order?.products?.map((product:any,index:any)=>(
                    <div key={index}>
                        <hr/>
                        <div className='d-flex align-items-center gap-5'>
                            <img src={product?.image} alt='product image' style={{width:'150px',height:'150px'}}/>
                            <div >
                                <p className='fs-4'>{product?.title_en} X {product?.ordered_quantity}</p>
                                {product?.selected_size&&<p className='fs-4'>{t('Size')} :{product?.selected_size?.title?.en}</p>}
                                {/* {product?.is_gift&&<p className='fs-4'>{t('Wrap As Gift')} : {product?.is_gift_value} {t('AED')}</p>} */}
                                {product?.send_receipt&&<p className='fs-4'>{t("Don't Send Receipt")}</p>}
                                {product?.send_greeting_card&&<p className='fs-4'>{t("Send Greeting Card Message")} : {product?.send_greeting_card_message}</p>}
                            </div>
                        </div>
                        <hr/>
                    </div>
                ))
            }
        </div>
        <div className='d-flex align-items-center justify-content-between mb-5'>
            <label className='fs-1'>{t('SubTotal')} :</label>
            <span className='fs-1'>{order?.sub_total_price} {t('AED')}</span>
        </div>
        <hr/>
        <hr/>
        <div className='d-flex align-items-center justify-content-between mb-5'>
            <label className='fs-1'>{t('Total')} :</label>
            <span className='fs-1'>{order?.total_price} {t('AED')}</span>
        </div>
        <hr/>
        <hr/>
        <div className='mb-5'>
            <h2 className='fs-1'>{t('Billing Address')} :</h2>
            <ul>
                <li className='fs-3'>{t("Name")} : {order?.billing_address?.name}</li>
                <li className='fs-3'>{t("City")} : {order?.billing_address?.city}</li>
                <li className='fs-3'>{t("Street Address")}  : {order?.billing_address?.street_address}</li>
                <li className='fs-3'>{t("Phone")} : {order?.billing_address?.phone}</li>
                <li className='fs-3'>{t("Email")} : {order?.billing_address?.email}</li>
            </ul>
        </div>
        <hr/>
        <hr/>
        <div>
            <h2 className='fs-1'>{t('Shipping Address')} :</h2>
            <ul>
                <li className='fs-3'>{t("Name")} : {order?.shipping_address?.name}</li>
                <li className='fs-3'>{t("City")} : {order?.shipping_address?.city}</li>
                <li className='fs-3'>{t("Street Address")} : {order?.shipping_address?.street_address}</li>
                <li className='fs-3'>{t("State")} : {order?.shipping_address?.state}</li>
            </ul>
        </div>
    </div>
    )
}

export default OrderDetails
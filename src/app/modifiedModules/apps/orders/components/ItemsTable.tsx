import { ItemModal } from './ItemModal'
import { ItemsListPagination } from './ItemsListPagination'
import ReactLoading from "react-loading";
import { LicenseModal } from './LicenseModal';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { whtsAppConnect } from 'utils/features';

function ItemsTable(props:any) {
  const {t} =useTranslation()
  const {items,deleteItem,pages,currentPage,setCurrentPage,isLoading,changeActiveStatus,isActivating,isDeleting}=props
  return (
    <div className='row p-5'>
        <div className='table-responsive'>
        <table
            id='kt_table_users'
            className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
        >
        <thead>
        <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
            <th>#</th>
            <th>{t('Name')}</th>
            <th>{t('Phone Number')}</th>
            <th>{t('Price')}</th>
            <th>{t('Payment Method')}</th>
            <th>{t('Status')}</th>
            <th>{t('Invoice')}</th>
            <th>{t('Details')}</th>
        </tr>
        </thead>
            <tbody className='text-gray-600 fw-bold' >
                {items?.length > 0 ?(
                    items?.map((item:any,index:any)=>(
                    <tr key={index}>
                        <td>{item?.item_number}</td>
                        <td>{item?.billing_address?item?.billing_address?.name:'---'}</td>
                        <td>{item?.billing_address?item?.billing_address?.phone:'---'}</td>
                        <td>{item?.total_price?item?.total_price:'---'}</td>
                        {/* <td>
                            <Link to={`/apps/orders/requests/${item?.id}`}
                            className='btn btn-flex btn-secondary btn-text-light-700 btn-active-color-light bg-state-light flex-center text-nowrap w-100'>
                                {t('Requests')}
                            </Link>
                        </td> */}
                        <td>
                            {/* {
                                item?.payment_method=='cash'? <label className='fs-5 text-danger mb-0' htmlFor='typeArabicName'>{t('Cash')}</label>:
                                item?.payment_method=='online'? <label className='fs-5 text-success mb-0' htmlFor='typeArabicName'>{t('Online')}</label>:
                                item?.payment_method=='online'? <label className='fs-5 text-success mb-0' htmlFor='typeArabicName'>{t('Online')}</label>:
                                ''
                            } */}
                            {
                                item?.payment_method=='cash'? <label className='text-warning mb-0' htmlFor='typeArabicName'>{t('Cash')}</label>:
                                item?.payment_method=='online'? <label className='text-danger mb-0' htmlFor='typeArabicName'>{t('Online Not Paid Yet')}</label>:
                                item?.payment_method=='online_success'? <label className='text-success mb-0' htmlFor='typeArabicName'>{t('Online Paid')}</label>:
                                ''
                            }
                        </td>
                        <td>
                            {
                                item?.status==1? <label className='fs-5 text-warning mb-0' htmlFor='typeArabicName'>{t('Processing')}</label>:
                                item?.status==2? <label className='fs-5 text-danger mb-0' htmlFor='typeArabicName'>{t('Out Of Delivery')}</label>:
                                item?.status==3? <label className='fs-5 text-success mb-0' htmlFor='typeArabicName'>{t('Completed')}</label>:
                                item?.status==4? <label className='fs-5 text-danger mb-0' htmlFor='typeArabicName'>{t('Failed')}</label>:
                                item?.status==5? <label className='fs-5 text-info mb-0' htmlFor='typeArabicName'>{t('Cancelled')}</label>:
                                ''
                            }
                        </td>
                        
                        <td>
                            {
                                item?.invoice_file&&
                                    <div className='d-flex gap-4'>
                                        <a href={`${item?.invoice_file}`} target="_blank" download type='button' className={`btn btn-secondary ms-auto `} >
                                            {t('Download')}
                                        </a>
                                        <a href={whtsAppConnect(item?.billing_address?.phone,`${item?.invoice_file}`)} target='_blank' type='button' className={`btn btn-secondary ms-auto `} >
                                            {t('Send Invoice')}
                                        </a>
                                    </div>
                            }
                        </td>
                        <td>
                            <div className='d-flex gap-4'>
                                <Link to={`/apps/orders/order-details/${item.id}`} type='button' className={`btn btn-primary ms-auto `} >
                                    {/* <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' /> */}
                                    {t('Details')}
                                </Link>
                            </div>
                        </td>
                        <td>
                            <div className='d-flex gap-4'>
                                {/* <ItemModal data={item} getData={getData}/> */}
                                <button onClick={()=>{deleteItem(item?.id,index)}} disabled={isDeleting[index]}
                                className='btn btn-flex btn-danger btn-text-light-700 btn-active-color-light bg-state-light flex-center text-nowrap w-100'>
                                    {
                                        !isDeleting[index]?t('Delete')
                                        :<ReactLoading type={"spin"} color={'#ffffff'} height={20} width={20} />
                                    }
                                </button>
                            </div>
                        </td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan={7}>
                    <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                        {t('No matching records found')}
                    </div>
                    </td>
                </tr>
            )}
            </tbody>
            </table>
        </div>
        <ItemsListPagination 
            pages={pages} 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage} 
            isLoading={isLoading} />
        </div>
  )
}

export default ItemsTable
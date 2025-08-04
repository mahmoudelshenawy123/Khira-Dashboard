import { ItemModal } from './ItemModal'
import { ItemsListPagination } from './ItemsListPagination'
import ReactLoading from "react-loading";
import { LicenseModal } from './LicenseModal';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

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
            <th>{t('WhatsApp Number')}</th>
            <th>{t('Id Number')}</th>
            <th>{t('Commercial Registeration Number')}</th>
            <th>{t('Has Special Request')}</th>
            <th>{t('Total Rate')}</th>
            <th>{t('Status')}</th>
            <th>{t('Products')}</th>
            {/* <th>{t('Driver Licenses')}</th> */}
            <th>{t('Actions')}</th>
        </tr>
        </thead>
            <tbody className='text-gray-600 fw-bold' >
                {items?.length > 0 ?(
                    items?.map((item:any,index:any)=>(
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{item?.store_name?item?.store_name:'---'}</td>
                        <td>{item?.phone_number?item?.phone_number:'---'}</td>
                        <td>{item?.whatsapp_number?item?.whatsapp_number:'---'}</td>
                        <td>{item?.id_number?item?.id_number:'---'}</td>
                        <td>{item?.commercial_registeration_number?item?.commercial_registeration_number:'---'}</td>
                        <td>{item?.has_special_requests==1?'Has':"Doesn\'t Have"}</td>
                        <td>{!isNaN(item?.total_rate)?item?.total_rate:'---'}</td>
                        <td>
                            {
                            item?.status==2?
                                <label className='fs-5 text-success mb-0' htmlFor='UserEnglishName'>{t('Active')}</label>
                            :
                                item?.status==3?
                                <label className='fs-5 text-danger mb-0' htmlFor='UserEnglishName'>{t('Blocked')}</label>
                            :
                                <label className='fs-5 text-secondary mb-0' htmlFor='UserEnglishName'>{t('Not Completed Yet')}</label>
                            }
                        </td>
                        <td>
                            <Link to={`/apps/products/all/${item?.id}`}
                            className='btn btn-flex btn-secondary btn-text-light-700 btn-active-color-light bg-state-light flex-center text-nowrap w-100'>
                                {t('Products')}
                            </Link>
                        </td>
                            {/* <td>
                            {item?.user_type==1? <LicenseModal data={item}/>:""}
                            </td> */}
                        <td>
                            <div className='d-flex gap-4'>
                                {/* <ItemModal data={item} getData={getData}/> */}
                                {
                                    item?.status==2?
                                    <button onClick={()=>{changeActiveStatus(item?.id,index)}} disabled={isActivating[index]}
                                    className='btn btn-flex btn-danger btn-text-light-700 btn-active-color-light bg-state-light flex-center text-nowrap w-100'>
                                        
                                        {
                                            !isActivating[index]?t('DeActivate')
                                            :<ReactLoading type={"spin"} color={'#ffffff'} height={20} width={20} />
                                        }
                                    </button>
                                    :
                                    item?.status==3?
                                    <button onClick={()=>{changeActiveStatus(item?.id,index)}} disabled={isActivating[index]}
                                    className='btn btn-flex btn-success btn-text-light-700 btn-active-color-light bg-state-light flex-center text-nowrap w-100'>
                                        
                                        {
                                            !isActivating[index]?t('Activate')
                                            :<ReactLoading type={"spin"} color={'#ffffff'} height={20} width={20} />
                                        }
                                    </button>
                                    :
                                        ''
                                }
                                
                                {/* <button onClick={()=>{deleteItem(item?.id,index)}} disabled={isDeleting[index]}
                                className='btn btn-flex btn-danger btn-text-light-700 btn-active-color-light bg-state-light flex-center text-nowrap w-100'>
                                    
                                    {
                                        !isDeleting[index]?'Delete'
                                        :<ReactLoading type={"spin"} color={'#ffffff'} height={20} width={20} />
                                    }
                                </button> */}
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
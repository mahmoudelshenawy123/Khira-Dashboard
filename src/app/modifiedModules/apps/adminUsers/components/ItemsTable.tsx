import { ItemModal } from './ItemModal'
import { ItemsListPagination } from './ItemsListPagination'
import ReactLoading from "react-loading";
import { LicenseModal } from './LicenseModal';
import { useTranslation } from 'react-i18next';

function ItemsTable(props:any) {
    const {t} =useTranslation()
    const {items,deleteItem,pages,currentPage,setCurrentPage,isLoading,changeActiveStatus,isActivating,isDeleting,getData}=props
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
            <th>{t('Email')}</th>
            <th>{t('Status')}</th>
            <th>{t('Actions')}</th>
        </tr>
        </thead>
            <tbody className='text-gray-600 fw-bold' >
                {items?.length > 0 ?(
                    items?.map((item:any,index:any)=>(
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{item?.name?item?.name:'---'}</td>
                        <td>{item?.email?item?.email:'---'}</td>
                        <td>
                            {
                            item?.status==1?
                                <label className='fs-5 text-success mb-0' htmlFor='UserEnglishName'>{t('Active')}</label>
                            :
                                <label className='fs-5 text-Danger mb-0' htmlFor='UserEnglishName'>{t('Blocked')}</label>
                            }
                        </td>
                        <td>
                        {
                            item?.status==1?
                            <button onClick={()=>{changeActiveStatus(item?.id,index)}} disabled={isActivating[index]}
                            className='btn btn-flex btn-danger btn-text-light-700 btn-active-color-light bg-state-light flex-center text-nowrap w-100'>
                                
                                {
                                    !isActivating[index]?t('DeActivate')
                                    :<ReactLoading type={"spin"} color={'#ffffff'} height={20} width={20} />
                                }
                            </button>
                            :
                            item?.status==2?
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
                        </td>
                        <td>
                            <div className='d-flex gap-4'>
                                <ItemModal data={item} getData={getData}/>
                                
                                
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
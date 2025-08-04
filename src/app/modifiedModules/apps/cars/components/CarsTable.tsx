import { ItemsListPagination } from './ItemsListPagination'
import ReactLoading from "react-loading";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function CarsTable(props:any) {
    const {items,deleteItem,pages,currentPage,setCurrentPage,isLoading,getData,isDeleting}=props
    const {t} =useTranslation()
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
            <th>{t('Image')}</th>
            <th>{t('Name')}</th>
            <th>{t('Price')}</th>
            <th>{t('Category')}</th>
            <th>{t('Actions')}</th>
        </tr>
        </thead>
            <tbody className='text-gray-600 fw-bold' >
                {items?.length > 0 ?(
                    items.map((item:any,index:any)=>(
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>
                            <img src={item?.image} style={{width:'80px',height:'80px',objectFit:'contain'}} />
                        </td>
                        <td>{item?.title}</td>
                        <td>{item?.price}</td>
                        <td>{item?.category?.title}</td>
                        <td>
                            <div className='d-flex gap-4'>
                                <Link to={`/apps/products/update-product/${item.slug}`} type='button' className={`btn btn-primary ms-auto `} >
                                    {/* <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' /> */}
                                    {t("Update")}
                                </Link>
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
                        {t("No matching records found")}
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

export default CarsTable
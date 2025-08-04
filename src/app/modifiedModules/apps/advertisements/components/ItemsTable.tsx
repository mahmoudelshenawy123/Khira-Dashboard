import React, { useEffect, useState } from 'react'
import { axiosConfig } from 'utils/axiosConfig'
import { ItemModal } from './ItemModal'
import { ItemsListPagination } from './ItemsListPagination'
import ReactLoading from "react-loading";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function ItemsTable(props:any) {
  const {t} =useTranslation()
  const {items,deleteItem,pages,currentPage,setCurrentPage,isLoading,getData,isDeleting}=props
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
            <th>{t('Title English')}</th>
            <th>{t('Description English')}</th>
            <th>{t('Link')}</th>
            <th>{t('type')}</th>
            <th>{t('Actions')}</th>
        </tr>
        </thead>
            <tbody className='text-gray-600 fw-bold' >
                {items?.length > 0 ?(
                    items.map((item:any,index:any)=>(
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>
                            <img src={item?.background_image} style={{width:'80px',height:'80px'}} />
                        </td>
                        <td>{item?.title_en}</td>
                        <td>{item?.description_en}</td>
                        <td>{item?.link}</td>
                        <td>
                            {
                                item?.type==1?t('Normal'):
                                item?.type==2?t('Link'):''
                            }
                        </td>
                        <td>
                            <div className='d-flex gap-4'>
                            <Link to={`/apps/advertisements/update-advertisement/${item.id}`} type='button' className={`btn btn-primary ms-auto `} >
                                {t('Update')}
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
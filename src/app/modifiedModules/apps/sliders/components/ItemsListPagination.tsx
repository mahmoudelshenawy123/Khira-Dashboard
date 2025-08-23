/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import { useEffect } from 'react'
// import {useQueryResponseLoading, useQueryResponsePagination} from '../../core/QueryResponseProvider'
// import {useQueryRequest} from '../../core/QueryRequestProvider'

// const mappedLabel = (label: string): string => {
//   if (label === '&laquo; Previous') {
//     return 'Previous'
//   }

//   if (label === 'Next &raquo;') {
//     return 'Next'
//   }

//   return label
// }

const ItemsListPagination = (props:any) => {
  const {pages ,setCurrentPage,isLoading,currentPage} = props
//   const pagination = useQueryResponsePagination()
//   const isLoading = useQueryResponseLoading()
//   const {updateState} = useQueryRequest()
//   const updatePage = (page: number | null) => {
//     if (!page || isLoading || pagination.page === page) {
//       return
//     }

//     updateState({page, items_per_page: pagination.items_per_page || 10})
//   }
useEffect(()=>{
  console.log('pagespagespagespages',pages)
},[])
  return (
    <div className='row'>
      <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'></div>
      <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
        <div id='kt_table_users_paginate'>
          <ul className='pagination'>
            {
              pages &&[...Array(pages)].map((page:any,index)=>(
                <li
                key={index+1}
                  className={clsx('page-item', {
                        active: currentPage === index+1,
                        disabled: isLoading,
                        // previous: link.label === 'Previous',
                        // next: link.label === 'Next',
                      })}
                    >
                    <a
                      className='page-link'
                      onClick={() => setCurrentPage(index+1)}
                      style={{cursor: 'pointer'}}
                    >{index+1}</a>
                  </li>
                ))
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export {ItemsListPagination}

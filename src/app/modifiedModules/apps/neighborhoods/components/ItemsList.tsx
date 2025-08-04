import {KTCard} from '../../../../../_metronic/helpers'
import ItemsTable from './ItemsTable'
import { ItemsListHeader } from './ItemsListHeader'
import { useEffect, useState } from 'react'
import { axiosConfig } from 'utils/axiosConfig'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const ItemsList = () => {
  const {t} =useTranslation()
  const params= useParams()
  const [searchTerm,setSearchTerm]=useState('')
  const [items,setItems]=useState([])
  const [currentPage,setCurrentPage]=useState(1)
  const [pages,setPages]=useState(null)
  const [isLoading,setIsLoading]=useState(false)
  const [isDeleting,setIsDeleting] =useState<[Boolean]>([false])
    function getAllItems(){
        setIsLoading(true)
        axiosConfig.get(`/neighborhood/all-neighborhoods-with-pagination/${params?.id}?page=${currentPage}&name=${searchTerm}`,{
          headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
      }).then(res=>{
            setIsLoading(false)
            setItems(res.data?.data?.data)
            setPages(res.data?.data?.pages)
            let deletedNumber:any = [...Array(res.data.data.count)]
            setIsDeleting(deletedNumber)
        }).catch(err=>{
            setIsLoading(false)
            console.log(err)
        })
    }

    function deleteItem(deltedId:String ,index:any){
      let modifiedDelete:[Boolean]=[...isDeleting]
      modifiedDelete[index]=true
      setIsDeleting(modifiedDelete)
        axiosConfig.delete(`/neighborhood/delete-neighborhood/${deltedId}`,{
          headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
      }).then(res=>{
          let modifiedDelete:[Boolean]=[...isDeleting]
          modifiedDelete[index]=false
          setIsDeleting(modifiedDelete)
          toast.success(t('Item Deleted Successfully'))
          getAllItems()
        }).catch(err=>{
          let modifiedDelete:[Boolean]=[...isDeleting]
          modifiedDelete[index]=false
          setIsDeleting(modifiedDelete)
          toast.error(t('Something went wrong'))
          console.log(err)
        })
    }
  useEffect(()=>{
    getAllItems()
  },[currentPage,searchTerm])
  return (
    <>
      <KTCard>
        <ItemsListHeader 
          setSearchTerm={setSearchTerm} 
          searchTerm={searchTerm}
          getData={getAllItems}
          cityId={params?.id}
        />
        <ItemsTable  
          isLoading={isLoading}
          deleteItem={deleteItem}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          items={items}
          pages={pages}
          getData={getAllItems}
          isDeleting={isDeleting}
          cityId={params?.id}
        />
      </KTCard>
    </>
  )
}

export {ItemsList}

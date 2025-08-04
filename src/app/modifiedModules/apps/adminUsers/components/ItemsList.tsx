import {KTCard} from '../../../../../_metronic/helpers'
import ItemsTable from './ItemsTable'
import { ItemsListHeader } from './ItemsListHeader'
import { useEffect, useState } from 'react'
import { axiosConfig } from 'utils/axiosConfig'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const ItemsList = () => {
  const [searchTerm,setSearchTerm]=useState('')
  const [items,setItems]=useState([])
  const [currentPage,setCurrentPage]=useState(1)
  const [pages,setPages]=useState(null)
  const [isLoading,setIsLoading]=useState(false)
  const [isDeleting,setIsDeleting] =useState<[Boolean]>([false])
  const [isActivating,setIsActivating] =useState<[Boolean]>([false])
  const {t} =useTranslation()

    function getAllItems(){
        setIsLoading(true)
        axiosConfig.get(`/admin/all-users?page=${currentPage}&name=${searchTerm}`,{
          headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
      }).then(res=>{
            setIsLoading(false)
            setItems(res.data.data.data)
            setPages(res.data.data.pages)
            let deletedNumber:any = [...Array(res.data.data.count)]
            setIsDeleting(deletedNumber)
            setIsActivating(deletedNumber)
        }).catch(err=>{
            setIsLoading(false)
            console.log(err)
        })
    }

    function deleteItem(deltedId:String ,index:any){
      const modifiedDelete:[Boolean]=[...isDeleting]
      modifiedDelete[index]=true
      setIsDeleting(modifiedDelete)
        axiosConfig.delete(`/admin/delete-user/${deltedId}`,{
          headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
      }).then((res)=>{
            let modifiedDelete:[Boolean]=[...isDeleting]
            modifiedDelete[index]=false
            setIsDeleting(modifiedDelete)
            toast.success(t('Item Deleted Successfully'))
            getAllItems()
        }).catch(err=>{
            console.log(err)
            let modifiedDelete:[Boolean]=[...isDeleting]
            modifiedDelete[index]=false
            setIsDeleting(modifiedDelete)
            toast.error(err.response.data.message)
        })
    }

    function changeActiveStatus(userId:String ,index:any){
      let modifiedItems:[Boolean]=[...isActivating]
      modifiedItems[index]=true
      setIsActivating(modifiedItems)
        axiosConfig.delete(`/admin/change-user-status/${userId}`,{
          headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
      }).then((res)=>{
            let modifiedItems:[Boolean]=[...isActivating]
            modifiedItems[index]=false
            setIsActivating(modifiedItems)
            toast.success(t('Item Status Changed Successfully'))
            getAllItems()
        }).catch(err=>{
            let modifiedItems:[Boolean]=[...isActivating]
            modifiedItems[index]=false
            setIsActivating(modifiedItems)
            toast.error(err.response.data.message)
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
        />
        <ItemsTable  
          isLoading={isLoading}
          isActivating={isActivating}
          deleteItem={deleteItem}
          changeActiveStatus={changeActiveStatus}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          items={items}
          pages={pages}
          getData={getAllItems}
          isDeleting={isDeleting}
        />
      </KTCard>
    </>
  )
}

export {ItemsList}

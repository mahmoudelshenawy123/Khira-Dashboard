import {KTCard} from '../../../../../_metronic/helpers'
import ItemsTable from './ItemsTable'
import { ItemsListHeader } from './ItemsListHeader'
import { useEffect, useState } from 'react'
import { axiosConfig } from 'utils/axiosConfig'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useCookies } from 'react-cookie'

const ItemsList = () => {
  const {t} =useTranslation()
  const [searchTerm,setSearchTerm]=useState('')
  const [items,setItems]=useState([])
  const [currentPage,setCurrentPage]=useState(1)
  const [pages,setPages]=useState(null)
  const [services,setServices]=useState(null)
  const [isLoading,setIsLoading]=useState(false)
  const [isDeleting,setIsDeleting] =useState<[Boolean]>([false])
  const [cookies, setCookie, removeCookie] = useCookies<any>(['i18next']);
  const currentLanguageCode = cookies.i18next || 'en'
  function getAllItems(){
    setIsLoading(true)
    axiosConfig.get(`/slider/all-sliders-with-pagination?page=${currentPage}`,{
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
    axiosConfig.delete(`/slider/delete-slider/${deltedId}`,{
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
      toast.error(err?.response?.data?.message)
      console.log(err)
    })
  }
  useEffect(()=>{
    getAllItems()
  },[currentPage,searchTerm])
  useEffect(()=>{
    getAllItems()
  },[])
  return (
    <>
      <KTCard>
        <ItemsListHeader 
          setSearchTerm={setSearchTerm} 
          searchTerm={searchTerm}
          getData={getAllItems}
          services={services}
        />
        <ItemsTable  
          isLoading={isLoading}
          deleteItem={deleteItem}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          items={items}
          services={services}
          pages={pages}
          getData={getAllItems}
          isDeleting={isDeleting}
        />
      </KTCard>
    </>
  )
}

export {ItemsList}

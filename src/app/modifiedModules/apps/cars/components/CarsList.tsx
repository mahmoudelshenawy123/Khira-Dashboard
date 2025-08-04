import {KTCard} from '../../../../../_metronic/helpers'
import CarsTable from './CarsTable'
import { CarsListHeader } from './CarsListHeader'
import { useEffect, useState } from 'react'
import { axiosConfig } from 'utils/axiosConfig'
import { toast } from 'react-toastify'

const CarsList = () => {
  const [searchTerm,setSearchTerm]=useState('')
  const [cars,setCars]=useState([])
  const [currentPage,setCurrentPage]=useState(1)
  const [pages,setPages]=useState(null)
  const [isLoading,setIsLoading]=useState(false)
  const [isDeleting,setIsDeleting] =useState<[Boolean]>([false])
  
    function getAllCars(){
        setIsLoading(true)
        axiosConfig.get(`/product/all-products-with-pagination?page=${currentPage}&name=${searchTerm}`,{
          headers: {
              "accept-language": `en`,
          }
      }).then(res=>{
            setIsLoading(false)
            setCars(res.data.data.data)
            setPages(res.data.data.pages)
            console.log(res.data.data.data)
            let deletedNumber:any = [...Array(res.data.data.count)]
            setIsDeleting(deletedNumber)
        }).catch(err=>{
            setIsLoading(false)
            console.log(err)
        })
    }
    function deleteItem(deltedId:String ,index:any){
      const modifiedDelete:[Boolean]=[...isDeleting]
      modifiedDelete[index]=true
      setIsDeleting(modifiedDelete)
        axiosConfig.delete(`/product/delete-product/${deltedId}`,{
          headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`,
          }
      }).then(res=>{
            modifiedDelete[index]=false
            setIsDeleting(modifiedDelete)
            toast.success('Item Deleted Successfully')
            getAllCars()
        }).catch(err=>{
            modifiedDelete[index]=false
            setIsDeleting(modifiedDelete)
            toast.error('Something went wrong')
            console.log(err)
        })
    }
  useEffect(()=>{
    getAllCars()
  },[currentPage,searchTerm])
  return (
    <>
      <KTCard>
        <CarsListHeader 
          setSearchTerm={setSearchTerm} 
          searchTerm={searchTerm}
          getData={getAllCars}
        />
        <CarsTable  
          isLoading={isLoading}
          deleteItem={deleteItem}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          items={cars}
          pages={pages}
          getData={getAllCars}
          isDeleting={isDeleting}
        />
      </KTCard>
    </>
  )
}

export {CarsList}

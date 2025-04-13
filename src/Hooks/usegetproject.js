import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getprojectApi } from '../api/api_url'

export const usegetproject = () => {

       const [project,setPrject] = useState([])

    useEffect(()=>{
      const fetchData = async()=>{
           const {data}  =  await axios.get(getprojectApi)
           if(data.success){
               setPrject(data?.projectData)
           }
    }
    fetchData();
    },[])
return project

  
}

 
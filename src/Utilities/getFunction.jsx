
import { useEffect, useState } from "react";
import { vitelWirelessSageMetrics } from "./axios";



const useFetchData = (url) => {

    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
  
  useEffect(() => {
      setIsPending(true)
      vitelWirelessSageMetrics.get(url)
        .then(response => {
  
          if (!response.statusText === "OK") {
            throw Error("Could not fetch data")
          }else{
            setIsPending(false)
          }
          setIsPending(false)
          setData(response.data)
  
          setError(null)
          // console.log("data>>>>>>>>>",data)

        })
        .catch(error => {
          setError(error.message)
          setIsPending(false)
          console.log(error)
        })
    }, [url]);
    
  
    return { data, isPending, error }
  }

  
  export default useFetchData;
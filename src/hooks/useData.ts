import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";


const useData = <T>(endpoint: string ) => {
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);

    apiClient
      .get(endpoint, {signal: controller.signal})
      .then((res) => {
        setData(res.data);
        setLoading(false);
        })
      .catch((err) => {
        // return because of double render in strict mode
        if (err instanceof CanceledError) return;
        setError(err.message)
        setLoading(false);
    });

    return () => controller.abort();  
  }, []);

  return { data, error, isLoading };

};

export default useData;
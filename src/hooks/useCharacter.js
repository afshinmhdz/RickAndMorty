import axios from "axios";
import { useState,useEffect } from "react";
import toast from "react-hot-toast";

export default function useCharacter(query) {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchData(params) {
      try {
        setIsLoading(true);
        {
          /** until data not complete loading setIsloading true */
        }
        const res = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`,
          { signal }
        );

        console.log(res);

        setCharacters(res.data.results);
        {
          /**whene data loading is done setIsLoading false  */
        }
      } catch (error) {
        if (!axios.isCancel()) {
          setCharacters([]);
          toast.error(error.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();

    return function () {
      controller.abort();
    };
  }, [query]);

  return {isLoading,characters}
}

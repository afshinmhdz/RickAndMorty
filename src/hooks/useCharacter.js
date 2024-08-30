import axios from "axios";
import { useState,useEffect } from "react";
import toast from "react-hot-toast";

export default function useCharacter(query) {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchData() {
      try {
        setIsLoading(true);
        {
          /** until data not complete loading setIsloading true */
        }
        const {data} = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${query}`,
          { signal }
        );

        setCharacters(data.results);
        {
          /**whene data loading is done setIsLoading false  */
        }
      } catch (err) {
        if (!axios.isCancel()) {
          setCharacters([]);
          toast.error(err.response.data.error);
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

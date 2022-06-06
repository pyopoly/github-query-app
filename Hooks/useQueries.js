import { useState, useEffect } from 'react';
import axios from 'axios';

const useQueries = (q, type, limit, cursorRef, loadMoreTrigger) => {
    const [queries, setQueries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [hasMore, setHasMore] = useState(true);


    useEffect(() => {
        setQueries([])
    }, [q, type])


    useEffect(() => {
        if (!q || !type) return;

        setIsLoading(true);
        setIsError(false);

        const url = `api/search-github?q=${q}&type=${type}&limit=${limit}${cursorRef.current ? `&cursor=${cursorRef.current}` : ""}`;
        let cancel;

        axios.get(url,{
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            const { nodes, pageInfo: { endCursor, hasNextPage } } = res.data;
            setQueries(prevQueries => [ ...prevQueries, ...nodes.filter(element=> element.id) ]);
            setHasMore(hasNextPage);
            setIsLoading(false);
            cursorRef.current = endCursor;
        }).catch(e => {
            if (axios.isCancel(e)) return;
            setIsError(true);
            console.log("error", e);
        })

        return () => cancel();
    }, [q, type, loadMoreTrigger])

    return { queries, isLoading, isError, hasMore }
}

export default useQueries
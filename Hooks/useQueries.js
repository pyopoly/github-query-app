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

        axios.get(url).then(res => {
            const { nodes, pageInfo: { endCursor, hasNextPage } } = res.data;
            setQueries(prevQueries => [ ...prevQueries, ...nodes ]);
            setHasMore(hasNextPage);
            setIsLoading(false);
            cursorRef.current = endCursor;
        }).catch(e => {
            setIsError(true);
            console.log("error", e);
        })

    }, [q, type, loadMoreTrigger])

    return { queries, isLoading, isError, hasMore }
}

export default useQueries
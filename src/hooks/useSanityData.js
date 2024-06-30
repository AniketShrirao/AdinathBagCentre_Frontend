// useSanityData.js
import { useState, useEffect } from 'react';
import sanityClient from '@sanity/client';
import client from '../sanityClient';

export const useSanityData = (query) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        client
            .fetch(query)
            .then((result) => {
                setData(result);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, [query]);

    return { data, loading, error };
};

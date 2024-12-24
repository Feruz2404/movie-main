import { request } from '@/api';
import Carousel from '@/components/carousel/Carousel';
import Movies from '@/components/movies/Movies';
import React, { memo, useEffect, useState } from 'react';

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    request("/discover/movie")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load data');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Carousel data={data} />
      <Movies data={data} />
    </>
  );
};

export default memo(Home);

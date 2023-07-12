import { Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getAds } from '../../../redux/adsRedux';
import Ads from '../Ads/Ads';
import { useEffect, useCallback, useState } from 'react';
import { fetchAds } from '../../../redux/adsRedux';
import Spinner from 'react-bootstrap/Spinner';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const ads = useSelector(getAds);

  const dispatch = useDispatch();

  const memoizedFetchAds = useCallback(() => {
    dispatch(fetchAds());
  }, [dispatch]);

  useEffect(() => {
    memoizedFetchAds();
  }, [memoizedFetchAds]);

  useEffect(() => {
    if (ads.length) {
      setLoading(false);
    }
  }, [ads]);

  if (loading) {
    return (
      <Container className='mt-4 mb-4 px-0'>
        <div className='d-flex align-items-center'>
          <span className='ms-4'>Loading...</span>
          <Spinner animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        </div>
      </Container>
    );
  }

  return (
    <Container className='mt-4 mb-4 px-0'>
      <h2 className='col-12 col-sm-3 mx-auto'>ANNOUNCEMENTS</h2>
      {ads.map((ad) => (
        <Ads key={ad._id} {...ad} />
      ))}
    </Container>
  );
};

export default Home;

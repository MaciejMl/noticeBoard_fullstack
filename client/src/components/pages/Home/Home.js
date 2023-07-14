import { Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getAds } from '../../../redux/adsRedux';
import Ads from '../Ads/Ads';
import { useEffect, useCallback, useState } from 'react';
import { fetchAds } from '../../../redux/adsRedux';
import Spinner from 'react-bootstrap/Spinner';
import SearchInput from '../../features/Search/SearchInput';
import clsx from 'clsx';
import styles from './Home.module.scss';

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
    setLoading(false);
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
      <h2 className={clsx('col-12 col-sm-3 mx-auto', styles.header)}>
        ANNOUNCEMENTS
      </h2>
      <SearchInput {...ads} />

      {ads.length === 0 && (
        <Container className='mt-4 mb-4 px-0'>
          <div className='alert alert-warning'>
            No ads found in the database.
          </div>
        </Container>
      )}

      {ads.map((ad) => (
        <Ads key={ad._id} {...ad} />
      ))}
    </Container>
  );
};

export default Home;

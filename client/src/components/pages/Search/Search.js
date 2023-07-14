import { Container } from 'react-bootstrap';
import Ads from '../Ads/Ads';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchAdd } from '../../../redux/adsRedux';
import { getAds } from '../../../redux/adsRedux';
import { useEffect, useState } from 'react';
import SearchInput from '../../features/Search/SearchInput';

const Search = () => {
  const { searchPhrase } = useParams();
  const dispatch = useDispatch();
  const ads = useSelector(getAds);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchAds = async () => {
      try {
        const res = await fetch(`/api/ads/search/${searchPhrase}`);
        const data = await res.json();
        dispatch(searchAdd(data));
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    searchAds();
  }, [searchPhrase, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container className='mt-4 mb-4 px-0'>
      <h3 className='col-12 col-sm-3 mx-auto'>SEARCH RESULTS</h3>
      <SearchInput {...ads} />
      {ads.map((ad) => (
        <Ads key={ad._id} {...ad} />
      ))}
    </Container>
  );
};

export default Search;

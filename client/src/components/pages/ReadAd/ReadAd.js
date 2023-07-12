import styles from './ReadAd.module.scss';
import { Container, Stack } from 'react-bootstrap';
import clsx from 'clsx';
import { IMGS_URL } from '../../../config';
import { getAds } from '../../../redux/adsRedux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ReadAd = () => {
  const { id } = useParams();
  const allAds = useSelector(getAds);
  const ads = allAds.find((ad) => ad._id === id);

  return (
    <Container className={clsx('px-0 pb-4 mt-4', styles.root)}>
      <Stack
        direction='horizontal'
        gap={4}
        className={clsx('align-items-center', styles.box)}
      >
        <div className={styles.image}>
          <img src={`${IMGS_URL}${ads?.image}`} alt='announcement_image' />
        </div>
        <div className={styles.text}>
          <h3 className='m-0'>{ads?.title}</h3>
          <p className='m-0'>
            <span>Title: </span>
            {ads?.content}
          </p>

          <p className='m-0'>
            <span>Location: </span>
            {ads?.location}
          </p>

          <p className='m-0'>
            <span>Price: $ </span>
            {ads?.price}
          </p>

          <p className='m-0'>
            <span>Published: </span>
            {ads?.date}
          </p>

          <p className='m-0'>
            <span>Details: </span>
            {ads?.info}
          </p>
        </div>
      </Stack>
    </Container>
  );
};

export default ReadAd;

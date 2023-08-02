import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import styles from './Ads.module.scss';
import Stack from 'react-bootstrap/Stack';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, logIn } from '../../../redux/usersRedux';
import { fetchAds, removeAdRequest } from '../../../redux/adsRedux';
import { IMGS_URL } from '../../../config';

const Ads = ({ title, location, image, _id, user }) => {
  const navigate = useNavigate();
  const loggedUser = useSelector(getUser);
  const adOwnerLogin = user?.login;

  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeAdRequest(_id)).then(() => {
      dispatch(fetchAds());
    });
  };

  const handleReadMore = () => {
    navigate(`/ad/${_id}`);
  };

  const handleEdit = () => {
    navigate(`/ad/edit/${_id}`);
  };

  const adOwner = loggedUser && loggedUser.login === adOwnerLogin;

  return (
    <Container className={clsx('px-0 pb-4 mt-4', styles.root)}>
      <div className={styles.cont}>
        <div className={styles.image}>
          <img src={`${IMGS_URL}${image}`} alt='announcement_image' />
        </div>
        <div className={styles.info}>
          <Stack
            direction='horizontal'
            gap={3}
            className={clsx('align-items-center', styles.stack)}
          >
            <h3 className='m-0'>{title}</h3>
            <p className='m-0'>
              <span>Location: </span>
              {location}
            </p>
            <div className={styles.buttons}>
              <Button
                onClick={handleReadMore}
                className='ms-auto'
                variant='primary'
              >
                Read more
              </Button>
              {adOwner && (
                <Button onClick={handleEdit} variant='primary'>
                  Edit Ad
                </Button>
              )}
              {adOwner && (
                <Button onClick={handleRemove} variant='danger'>
                  Delete Ad
                </Button>
              )}
            </div>
          </Stack>
        </div>
      </div>
    </Container>
  );
};

Ads.propTypes = {
  title: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Ads;

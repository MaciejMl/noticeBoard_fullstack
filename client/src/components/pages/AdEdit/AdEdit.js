import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import styles from './AdEdit.module.scss';
import clsx from 'clsx';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import InputForm from '../../common/InputForm/InputForm';
import { useState } from 'react';
import { API_URL } from '../../../config';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';
import { useParams } from 'react-router-dom';
import { getAdById, editAd } from '../../../redux/adsRedux';

const AdEdit = () => {
  const { id } = useParams();
  const user = useSelector(getUser);
  const ad = useSelector((state) => getAdById(state, id));

  const [title, setTitle] = useState(ad?.title || '');
  const [content, setContent] = useState(ad?.content || '');
  const [location, setLocation] = useState(ad?.location || '');
  const [price, setPrice] = useState(ad?.price || '');
  const [date, setDate] = useState(ad?.date || '');
  const [info, setInfo] = useState(ad?.info || '');
  const [image, setImage] = useState(ad?.image || '');
  const [status, setStatus] = useState('');

  console.log(id);
  console.log('zalogowany: ', user);
  console.log('image: ', image);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTitleChange = (adTitle) => {
    setTitle(adTitle);
  };

  const handleContentChange = (text) => {
    setContent(text);
  };

  const handleLocationChange = (location) => {
    setLocation(location);
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handlePriceChange = (value) => {
    setPrice(value);
  };

  const handleInfoChange = (text) => {
    setInfo(text);
  };

  const handleImageChange = (value, e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user && user.login) {
      const fd = new FormData();
      fd.append('title', title);
      fd.append('content', content);
      fd.append('location', location);
      fd.append('price', price);
      fd.append('date', date);
      fd.append('info', info);
      fd.append('image', image);
      fd.append('user', user.login);

      const options = {
        method: 'PUT',
        body: fd,
        credentials: 'include',
      };

      setStatus('loading');

      fetch(`${API_URL}/api/ads/${id}`, options)
        .then((res) => {
          if (res.status === 201) {
            dispatch(editAd(fd));
            navigate('/');
          } else if (res.status === 400) {
            setStatus('clientError');
          } else {
            setStatus('serverError');
          }
        })
        .catch((err) => {
          console.log(err);
          setStatus('serverError');
        });
    }
  };
  return (
    <Container className={clsx('my-4', styles.root)}>
      <Form onSubmit={handleSubmit} className={styles.form}>
        {status === 'serverError' && (
          <Alert variant='danger'>
            <Alert.Heading>Something went wrong...!</Alert.Heading>
            <p>Unexpected error... Try again!</p>
          </Alert>
        )}

        {status === 'clientError' && (
          <Alert variant='danger'>
            <Alert.Heading>Not enough data!</Alert.Heading>
            <p>You have to fill all the fields.</p>
          </Alert>
        )}

        {status === 'loading' && (
          <Spinner animation='border' role='status' className='block mx-auto'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        )}

        <h1>
          <span className={styles.name}>Name: </span>
          <InputForm
            className={styles.nameInput}
            fieldValue={title}
            handleChange={handleTitleChange}
            placeholder={'Ad name here'}
            type={'text'}
          />
        </h1>

        <p>
          <span className={styles.title}>Title: </span>
          <InputForm
            className={styles.title}
            fieldValue={content}
            handleChange={handleContentChange}
            placeholder={'Ad title here'}
            type={'text'}
          />
        </p>

        <p>
          <span className={styles.location}>Location: </span>
          <InputForm
            className={styles.location}
            fieldValue={location}
            handleChange={handleLocationChange}
            placeholder={'Ad location here'}
            type={'text'}
          />
        </p>

        <p>
          <span className={styles.price}>Price: </span>$
          <InputForm
            className={styles.pricewidth}
            fieldValue={price.toString()}
            type='text'
            handleChange={handlePriceChange}
          />
        </p>

        <p>
          <span className={styles.date}>Published: </span>
          <InputForm
            className={styles.date}
            fieldValue={date}
            handleChange={handleDateChange}
            placeholder={'Ad date here'}
            type={'text'}
          />
        </p>

        <p>
          <span className={styles.image}>Image: </span>
          <InputForm
            className={styles.image}
            fieldValue={image}
            handleChange={handleImageChange}
            type={'file'}
          />
        </p>

        <p>
          <span className={styles.details}>Details: </span>
          <InputForm
            className={styles.details}
            fieldValue={info}
            handleChange={handleInfoChange}
            placeholder={'Ad more information here'}
            type={'textarea'}
            rows={3}
          />
        </p>

        <Button type='submit' variant='primary'>
          Update
        </Button>
      </Form>
    </Container>
  );
};

export default AdEdit;

import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import clsx from 'clsx';
import Button from 'react-bootstrap/Button';
import styles from './SearchInput.module.scss';
import { useState } from 'react';
import InputForm from '../../common/InputForm/InputForm';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) {
      setStatus('emptyInput');
    } else {
      navigate(`/search/${search}`);
    }
  };

  const handleSearchChange = (text) => {
    setSearch(text);
  };

  return (
    <Container className={clsx('my-4', styles.root)}>
      <Form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.searchCont}>
          <span className={styles.search}>Search: </span>
          <div className={styles.inputCont}>
            <InputForm
              className={styles.nameInput}
              fieldValue={search}
              handleChange={handleSearchChange}
              placeholder={'Search title...'}
              type={'text'}
            />

            <Button type='submit' variant='primary'>
              Search
            </Button>
          </div>
        </div>
        {status === 'emptyInput' && <p>Enter phrase...</p>}
      </Form>
    </Container>
  );
};

export default SearchInput;

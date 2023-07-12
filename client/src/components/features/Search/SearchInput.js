import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import clsx from 'clsx';
import Button from 'react-bootstrap/Button';
import styles from './SearchInput.scss';
import { useState } from 'react';
import InputForm from '../../common/InputForm/InputForm';

const SearchInput = () => {
  const [search, setSearch] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleSearchChange = (text) => {
    setSearch(text);
  };

  return (
    <Container className={clsx('my-4', styles.root)}>
      <Form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <span className={styles.search}>Search: </span>
          <InputForm
            className={styles.nameInput}
            fieldValue={search}
            handleChange={handleSearchChange}
            placeholder={'Search title...'}
            type={'text'}
          />
        </div>

        <Button type='submit' variant='primary'>
          Search
        </Button>
      </Form>
    </Container>
  );
};

export default SearchInput;

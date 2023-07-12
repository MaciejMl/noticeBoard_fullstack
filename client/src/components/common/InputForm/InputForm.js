import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './InputForm.module.scss';

const InputForm = ({
  fieldValue,
  handleChange,
  placeholder,
  className,
  type,
  rows,
}) => {
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (typeof handleChange === 'function') {
      handleChange(inputValue, e);
    }
  };

  if (type === 'textarea') {
    return (
      <textarea
        className={clsx(styles.root, className)}
        id='value'
        aria-describedby='value field'
        placeholder={placeholder}
        value={fieldValue}
        onChange={handleInputChange}
        rows={rows}
      />
    );
  }

  if (type === 'file') {
    return (
      <>
        <label htmlFor='inputValues'></label>
        <div className={styles.fileInput}>
          <input
            type='text'
            inputMode='text'
            id='value'
            aria-describedby='value field'
            placeholder={placeholder}
            value={fieldValue ? fieldValue.name : ''}
            readOnly
          />
          <input
            type='file'
            id='inputValues'
            accept='image/*'
            onChange={handleInputChange}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <label htmlFor='inputValues'></label>
      <input
        className={clsx(styles.root, className)}
        type={type}
        inputMode={type === 'text' ? 'text' : 'numeric'}
        id='value'
        aria-describedby='value field'
        placeholder={placeholder}
        value={fieldValue}
        onChange={handleInputChange}
      />
    </>
  );
};

InputForm.propTypes = {
  fieldValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  handleChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.oneOf(['text', 'textarea', 'file']),
  rows: PropTypes.number,
};

InputForm.defaultProps = {
  fieldValue: '',
  type: 'text',
  rows: 3,
};

export default InputForm;

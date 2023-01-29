import React from 'react';

import styles from '../Button/Button.module.css';

const Button = ({ onLoadMore, text }) => {
  return (
    <button
      onClick={() => onLoadMore()}
      type="button"
      className={styles.load_more}
    >
      {text}
    </button>
  );
};

export default Button;

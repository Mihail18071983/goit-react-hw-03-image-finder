import React from 'react';

import { Grid } from 'react-loader-spinner';

import styles from '../Loader/Loader.module.css'

const Loader = () => {
    return (
      <div className={styles.load_wrapper}>
     <Grid
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="grid-loading"
      radius="12.5"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />       
      </div>
    
  );
};
export default Loader;

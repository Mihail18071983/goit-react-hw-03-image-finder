import React from "react";

import styles from '../components/Button.module.css'

const Button = ({loadMore}) => {
    <button onClick={loadMore} type="button" className={styles.load_more}>Load more</button>
}

export default Button
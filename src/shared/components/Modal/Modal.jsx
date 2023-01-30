import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import styles from '../Modal/Modal.module.css';


const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
  }

  closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      this.props.close();
    }
  };

  render() {
    const { children, close } = this.props;
    const { closeModal } = this;

    return createPortal(
      <div className={styles.Overlay} onClick={closeModal}>
        <div className={styles.Modal}>
          <button type='button' className={styles.close} onClick={close}>
          X
          </button>
          {children}
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;


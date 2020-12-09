import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    console.log('Modal componentDidMount');
    window.addEventListener('keydown', this.toggleModal);
  }

  componentWillUnmount() {
    console.log('Modal componentWillUnmount');
    window.removeEventListener('keydown', this.toggleModal);
  }

  toggleModal = event => {
    if (event.code === 'Escape') {
      console.log(event.code);
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className="Modal__backdrop" onClick={this.handleBackdropClick}>
        <div className="Modal__content">{this.props.children}</div>
      </div>,
      modalRoot,
    );
  }
}

/*
  В индексе под <div id="root"></div> прописую <div id="modal-root"></div>
  В компоненте модалки const modalRoot = document.querySelector('#modal-root')
  И import { createPortal } from 'react-dom'
  и делаю возврат результата работы createPortal который принимает разметку и modalRoot
*/

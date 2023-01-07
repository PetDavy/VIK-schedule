import { FC, PropsWithChildren, useState, useEffect } from 'react';
import { closeModal } from './Modal.slice';
import { useStore } from '../../state/storeHooks';
import classNames from 'classnames';

import '../../assets/styles/components/modal.scss';

const MODAL_ANIMATION_DURATION = 200;


const Modal: FC<PropsWithChildren> = ({ children }) => {
  const [{ isOpenModal }, dispatch] = useStore(({ modal }) => modal);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpenModal) {
      setIsVisible(true);
    } else {
      setTimeout(() => {
        setIsVisible(false);
      }, MODAL_ANIMATION_DURATION);
    }
  }, [isOpenModal])

  function handleClose() {
    setIsVisible(false);
    setTimeout(() => {
      dispatch(closeModal());
    }, MODAL_ANIMATION_DURATION)
  }
  
  return isOpenModal ? (
    <div className={classNames('modal', {
      'modal--open': isVisible
    })}>
      <div className="modal__overlay" onClick={handleClose} />
      <div className="modal__content">
        <button className="modal__close" onClick={handleClose} />
        {children} 
      </div>
    </div>
  ) : null;
}

export default Modal;
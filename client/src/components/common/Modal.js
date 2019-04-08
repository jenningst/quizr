import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import PropTypes from "prop-types"; 

const Portal = ({ children }) => {  
  const modalRoot = document.getElementById("modal-root");
  const el = document.createElement("div");
  // append our child to the DOM
  useEffect(() => {
    modalRoot.appendChild(el);
  }, []);
  // remove our child from the DOM
  useEffect(() => {
    return () => modalRoot.removeChild(el); 
  });
  return createPortal(children, el);
};

const Modal = ({ children, toggle, open }) => (
  <Portal>
    {open && (
      <ModalWrapper>
        <ModalCard>
          <CloseButton onClick={toggle}>
            <img src="https:icon.now.sh/x/ff0000" alt="close" />
            {children}
          </CloseButton>
        </ModalCard>
      </ModalWrapper>
    )}
  </Portal>
);

export default Modal;

Modal.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggle: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalCard = styled.div`
  position: relative;
  min-width: 320px;
  z-index: 10;
  margin-bottom: 100px;
  background: white;
  border-radius: 5px;
  padding: 15px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
`; 

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background: transparent;
  padding: 10px;
  &:hover {
    cursor: pointer;
  }`; 

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: black;
  opacity: 0.5;
`;
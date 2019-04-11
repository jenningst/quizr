import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import PropTypes from "prop-types"; 

const Portal = ({ id, children }) => {
  const el = 
    useRef(document.getElementById(id) || 
    document.createElement("div"));

  const [dynamic] = useState(!el.current.parentElement);

  useEffect(() => {
    if (dynamic) {
      el.current.id = id;
      document.body.appendChild(el.current);
    }
    return () => {
      if (dynamic && el.current.parentElement) {
        el.current.parentElement.removeChild(el.current);
      }
    }
  }, [id]);

  return createPortal(children, el.current);
};

const Modal = ({ id, children, toggle, open }) => (
  <Portal id={id}>
    {open && (
      <ModalWrapper>
        <ModalCard>
          <CloseButton onClick={toggle}>
            <img src="https:icon.now.sh/x/ff0000" alt="close" />
          </CloseButton>
          {children}
        </ModalCard>
        <Background onClick={toggle} />
      </ModalWrapper>
    )}
  </Portal>
);

export default Modal;

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggle: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalCard = styled.div`
  position: fixed;
  height: auto;
  width: 80%;
  z-index: 10;
  background: white;
  border: 2px solid red;
  padding: 1em;
  margin: 0;
`; 

const CloseButton = styled.button`
  position: absolute;
  top: 1em;
  right: 1em;
  border: none;
  background: transparent;
  padding: 1em;
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
import React, { useState } from 'react';
import Modal from "./common/Modal";

const Dashboard = () => {
  const [modalOpen, setIsModalOpen] = useState(false);

  const toggleModalOpen = () => {
    setIsModalOpen(!modalOpen);
  }

  const composeQuestion = () => {
    alert('You clicked me!');
  }
  
  return (
    <div>
      <h1>Let's create a question</h1>
      <button type="button" onClick={composeQuestion}>Compose</button>
      <button type="button" onClick={toggleModalOpen}>Open Modal</button>
      {modalOpen && (
        <Modal open={modalOpen} toggle={toggleModalOpen}>
          There is no spoon...
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
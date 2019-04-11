import React, { useState } from 'react';
import Modal from './common/Modal';
import Form from './common/Form';
import InputField from './common/InputField';
import Button from './common/Button';

const Dashboard = () => {
  const [modalOpen, setIsModalOpen] = useState(false);
  const [questionInfo] = useState([]);
  const [problemText, setProblemText] = useState("");
  const [answer, setAnswer] = useState({});

  const toggleModalOpen = () => {
    setIsModalOpen(!modalOpen);
  }

  const handleInputChange = (e) => {
    setProblemText(e.target.value);
  }

  const addChoice = (e) => {
    alert(e.target.value);
    // TODO: Adds a new choice item to a list
  }

  const composeQuestion = (e) => {
    e.preventDefault();
    alert('You saved a problem!');
    // TODO: clear modal inputs
    setIsModalOpen(false);
    // TODO: Implement graphql mutation here.
  }
  
  return (
    <div>
      <h1>Let's create a question</h1>
      <Button type="button" onClick={toggleModalOpen}>Open Modal</Button>
      {modalOpen && (
        <Modal
          id="modal-root"
          open={modalOpen}
          toggle={toggleModalOpen}>
          <>
            <header>Compose a Question</header>
            <Form className="compose-question-form">
              {
                <>
                <div classname="question-input-group">
                  <InputField 
                    type="text"
                    name="problem-statement-input"
                    placeholder="Type your question here..."
                    value={problemText}
                    onChange={handleInputChange}
                  >
                    Problem Statement
                  </InputField>
                </div>
                <Button
                  type="submit"
                  onClick={composeQuestion}
                >
                  Save
                </Button>
                <Button
                  type="button"
                  onClick={addChoice}
                >
                  + Add Choice
                </Button>
                </>
              }
            </Form>
          </>
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
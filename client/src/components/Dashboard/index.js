import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from '../Home'
import QuizContainer from '../../containers/QuizContainer';
import ComposerContainer from '../../containers/ComposerContainer';

const Dashboard = () => {
  return (
    <Router>
      <PageWrapper>
        <Topbar className='topbar'>Topbar content</Topbar>
        <Sidebar className='sidebar'>
          {
            <>
              <Logo />
              <SidbarNavItem>
                <Link to='/'>Home</Link>
              </SidbarNavItem>
              <SidbarNavItem>
                <Link to='/take-a-quiz'>Quiz</Link>
              </SidbarNavItem>
              <SidbarNavItem>
                <Link to='/question-composer'>Composer</Link>
              </SidbarNavItem>
            </>
          }
        </Sidebar>
        <Main className='main'>
          <Route exact path='/' component={Home} />
          <Route path='/take-a-quiz' component={QuizContainer} />
          <Route path='/question-composer' component={ComposerContainer} />
        </Main>
      </PageWrapper>
    </Router>
  );
};

export default Dashboard;

const PageWrapper = styled.div`
  display: grid;
  grid-template-columns: 4em 1fr;
  grid-template-rows: 4em 1fr;
  grid-template-areas:
    'sidebar topbar'
    'sidebar main';
  height: 100vh;
`;

const Sidebar = styled.section`
  grid-area: sidebar;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;

  background: #FFFFFF;
  box-shadow: 7px 3px 17px 0px rgba(227,225,234,1);
`;

const Logo = styled.div`
  height: 4em;
`;

const SidbarNavItem = styled.div`
  width: 100%;
  height: 4em;
  border: 1px solid #FFFFFF;
  text-align: center;
`;

const Topbar = styled.section`
  grid-area: topbar;
  background: #FFFFFF;
`;

const Main = styled.section`
  box-sizing: border-box;
  grid-area: main;
`;

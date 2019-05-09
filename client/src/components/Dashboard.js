import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from './Home';
import Quiz from './quiz/Quiz';
import ComposerContainer from '../containers/ComposerContainer';

const Dashboard = () => {
  return (
    <Router>
      <PageWrapper>
        <Topbar className='topbar' />
        <Sidebar className='sidebar'>
          {
            <>
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
          <Route path='/take-a-quiz' component={Quiz} />
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
  grid-template-rows: 3em 1fr;
  grid-template-areas:
    'logo topbar'
    'sidebar main';
  height: 100vh;
`;

const Sidebar = styled.section`
  grid-area: sidebar;
  background: #61437A;
`;

const SidbarNavItem = styled.div`
  width: 100%;
  height: 4em;
  border: 1px solid #FFFFFF;
  text-align: center;
`;

const Topbar = styled.section`
  grid-area: topbar;
  background: #9A93C4;
`;

const Main = styled.section`
  grid-area: main;
  background: #FFFFFF;
`;

import './App.css';
import Header from './common/header';
import Dashboard from './components/dashboard';
import styled from 'styled-components';
import { Fragment } from 'react';

const Main = styled.main`
  padding: 20px 40px;
`;

function App() {
  return (
    <Fragment>
       <Header/>
       <Main>
         <Dashboard/>
       </Main>
    </Fragment>
  );
}


export default App;

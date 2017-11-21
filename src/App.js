import React from 'react';
import SignUp from './Componentes/SignUp.js';
import SignIn from './Componentes/SignIn.js';
import { Boards, BoardDetail } from './Componentes/Boards';
import Header from './Componentes/Header';
import { connect } from 'redux-zero/react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

const App = ({ login, boards, user, password, loading }) => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path='/signin' render={() => <SignIn user={user} login={login} />} />
          <Route path='/signup' render={() => <SignUp user={user} passwordError={password} />} />
          <Route exact path="/boards" render={() => (
            <div>
              <Header user={user} />
              <Boards array={boards} loading={loading} />
            </div>
          )} />
          {
            boards && boards.map((item, index) => {
              const path = "/boards/" + (index + 1) + '-' + item.name;
              return <Route path={path} render={() => (
                <div>
                  <Header user={user} />
                  <BoardDetail board={boards[index]} />
                </div>
              )}
              />
            })
          }
          <Route render={() => <Redirect to={user ? "/boards" : "/signin"} />} />
        </Switch>

      </div>
    </BrowserRouter>
  )
}

const mapToProps = ({ login, boards, user, password, loading }) => ({ login, boards, user, password, loading });
export default connect(mapToProps)(App);

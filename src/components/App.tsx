import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { LogIn } from './LogIn/LogIn';
import { SignUp } from './SignUp';
import { UserPage } from './UserPage';

const App = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp/>}  />
      </Routes>
    </Router>
  );
}

export default App;

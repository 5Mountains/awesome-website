import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { AuthProvider } from "./../context/AuthContext";
import { LogIn } from './LogIn';
import { SignUp } from './SignUp';
import { Profile } from './Profile';

const App = (): JSX.Element => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp/>}  />
          <Route path="/" element={<Profile />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

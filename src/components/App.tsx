import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { AuthProvider } from "./../context/AuthContext";
import { LogIn } from './LogIn';
import { SignUp } from './SignUp';
import { Profile } from './Profile';
import { PrivateRoute } from "./PrivateRoute";

const App = (): JSX.Element => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp/>}  />
          <Route 
            path="/" 
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

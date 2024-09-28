import './App.css'
import Homepage from './pages/homepage'
import Login from './pages/login'
import AuthContext, { AuthProvider } from './context/Authcontext';
import { useContext } from "react";
import RegistrationForm from './pages/register';
import Bookshelf from './pages/bookshelf';
import Present from './pages/present';
import FutureBooks from './pages/future';
import Past from './pages/past'
import BookRecommendations from './pages/recomend';
import PasswordResetComponent from './pages/forgot';



import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate 
} from "react-router-dom";


function PrivateRoute({ children, redirectTo = "/login" }) {
  // implement your own authentication logic here
  let{user} = useContext(AuthContext)

  return user ? children : <Navigate to={redirectTo} />;

}



function App() {
  return (
    <div className="App">
         
      
        <Routes>
          
          <Route
              path="/bookshelf"
              element={                                  
                  <PrivateRoute>
                  <Bookshelf />
                  </PrivateRoute>                                                 
              }
          />
          <Route
              path="/present"
              element={                                  
                  <PrivateRoute>
                  <Present />
                  </PrivateRoute>                                                 
              }
          />
          <Route
              path="/future"
              element={                                  
                  <PrivateRoute>
                  <FutureBooks />
                  </PrivateRoute>                                                 
              }
          />

          <Route
              path="/past"
              element={                                  
                  <PrivateRoute>
                  <Past />
                  </PrivateRoute>                                                 
              }
          />
          
          <Route
              path="/recommend"
              element={                                  
                  <PrivateRoute>
                  <BookRecommendations />
                  </PrivateRoute>                                                 
              }
          />
            <Route Component={Login} path="/login" />
            <Route Component={PasswordResetComponent} path="/reset" />
            <Route Component={RegistrationForm} path="/register" />

            <Route Component={Homepage} path="/" />
            
        </Routes>
       
    </div>
  );
}

export default App;



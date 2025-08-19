import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages & Components
import Landing from './components/LandingPage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import ForgetPassword from './components/ForgetPassword';
import ResetPasswordForm from './components/ResetPasswordForm';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import CreateAdmin from './components/CreateAdmin';
import NotFound from './components/NotFound';
import AccountCreated from './components/AccountCreated';
import Dashboard from './Dashboard/Dashboard';
import Transfer from './Dashboard/Transfer';
import  Pin  from './Dashboard/Pin';
import Airtime from './Dashboard/Airtime';
import Data from './Dashboard/Data';
import Betting from './Dashboard/Betting';
import Tv from './Dashboard/Tv';
import SafeBox from './Dashboard/Safebox';
import Loan from './Dashboard/Loan';
import Invitation from './Dashboard/Invitation';
import Notification from './Dashboard/Notification';
import NotificationForm from './Dashboard/NotificationForm';
// import Others from './Dashboard/Others';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/open" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget" element={<ForgetPassword />} />
        <Route path="/reset" element={<ResetPasswordForm />} />
        <Route path="/Dashboard" element={<Dashboard/>} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/user" element={<AdminDashboard />} />
        <Route path="/account/create" element={<AccountCreated/>}/>
        <Route path="/create" element={<CreateAdmin />} />
        <Route path="/terms" element={<Terms />} />
        <Route path='/pin' element={<Pin/>}/>
        <Route path='/transfer' element={<Transfer />}/>
        <Route path="/airtime" element={<Airtime/>} />
        <Route path='/data' element={<Data/>} />
        <Route path='/betting' element={<Betting />} />
        <Route path="/tv" element={<Tv />} />
        <Route path='/safe/box' element={<SafeBox />} />
        <Route path='/loan' element={<Loan />} />
        <Route path='/invitation' element={<Invitation/>}/>
        <Route path='/notifications' element={<Notification/>}/>
        <Route path='/NotificationForm' element={<NotificationForm/>}/>
        {/* <Route path='/otherBank' element={<Others/>}/> */}
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

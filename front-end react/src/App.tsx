import React from "react"
import './App.scss';
import AdminGifts from './components/AdminGifts/AdminGifts';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import ThemeDisplay from './components/adminThemes/ThemeDisplay';
import HomeComponent from './components/HomeComponent/HomeComponent';
import NavBarComp from './components/NavBar/NavBar';
import PaymentSuccess from "./components/Payments/PaymentSuccess";
import PaymentInfo from "./components/Payments/PaymentInfo";
import SingleClickEditing from "./components/Orders/Order";
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app/*" element={<AppComponent />} />
      </Routes>
    </BrowserRouter>
  );
}


const AppComponent: React.FC = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <div className="App">
        <NavBarComp />
        <div className="main-content">
          <Routes >
            <Route path="/home" element={<HomeComponent />} />
            <Route path="/theme" element={<ThemeDisplay />} />
            <Route path="/gifts" element={<AdminGifts />} />
            <Route path="/payment" element={<PaymentInfo />} />
            <Route path="/paymentsuccess" element={<PaymentSuccess />} />
            <Route path="/order" element={<SingleClickEditing />} />
          </Routes>
        </div>
      </div>
    </SnackbarProvider>
  )
}

export default App;


import React from 'react';
import { Route} from 'react-router-dom'
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from 'zmp-ui'; 
import { RecoilRoot } from 'recoil';
import HomePage from '../pages';
import About from '../pages/about';
import Form from '../pages/form';
import User from '../pages/user';
import ChatPage from "../pages/ChatPage";


const MyApp = () => {
  return (  
    <RecoilRoot>
      <App > 
      <SnackbarProvider>
        <ZMPRouter>
          <AnimationRoutes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/about" element={<About></About>}></Route>
          <Route path="/form" element={<Form></Form>}></Route>
          <Route path="/user" element={<User></User>}></Route>
          </AnimationRoutes>
        </ZMPRouter>
      </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
  const root = createRoot(document.getElementById("app"));

const MyApp = () => {
  return (
    <RecoilRoot>
      <App>
        <SnackbarProvider>
          <ZMPRouter>
            <AnimationRoutes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/form" element={<Form />} />
              <Route path="/user" element={<User />} />
              <Route path="/chat" element={<Chat />} /> {/* Thêm route này */}
            </AnimationRoutes>
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
};
function App() {
  return <ChatPage />;
}
}
export default MyApp;
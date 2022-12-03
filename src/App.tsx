import { Toaster } from 'react-hot-toast';
import { authorizationProvider } from './lib/api/auth-api';
import useAuthStore from './store/useAuth';
import Navigation from './navigation';

const App = () => {
  const { token } = useAuthStore((state) => state);

  if (token) {
    authorizationProvider(token);
    console.log('authProvider is running');
  }

  return (
    <>
      <Navigation />
      <Toaster position='bottom-center' reverseOrder={false} />
    </>
  );
};

export default App;

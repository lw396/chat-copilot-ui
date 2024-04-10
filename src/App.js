// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';

// auth provider
import { JWTProvider as AuthProvider } from './contexts/JWTContext';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
  <ThemeCustomization>
    <ScrollTop>
      <AuthProvider>
        <>
          <Routes />
        </>
      </AuthProvider>
    </ScrollTop>
  </ThemeCustomization>
);

export default App;

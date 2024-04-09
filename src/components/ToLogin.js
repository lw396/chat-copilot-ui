import { redirect } from 'react-router-dom';
import { isLoggedOn } from 'api/headers-helper';

const toLogin = async () => {
  if (!isLoggedOn) {
    return redirect('/login');
  }
  return null;
};

export default toLogin;

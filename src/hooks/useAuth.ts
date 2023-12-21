import {selectAuth, authenticate, clearAuth, selectUser} from '../store/auth';
import {useAppDispatch, useAppSelector} from '../store';
import {User} from '../types/auth';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectAuth);
  const user = useAppSelector(selectUser);

  function authenticateUser(token: string) {
    dispatch(authenticate({token}));
  }

  function removeAuth() {
    dispatch(clearAuth());
  }
  return {token, user, authenticateUser, removeAuth};
};

export default useAuth;

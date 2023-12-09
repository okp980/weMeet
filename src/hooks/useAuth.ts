import {
  selectAuth,
  authenticate,
  clearAuth,
  selectOboardStatus,
} from '../store/auth';
import {useAppDispatch, useAppSelector} from '../store';
import {OnboardStatus} from '../types/auth';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectAuth);
  const onboard_status = useAppSelector(selectOboardStatus);

  function authenticateUser(token: string, onboard_status: OnboardStatus) {
    dispatch(authenticate({token, onboard_status}));
  }

  function removeAuth() {
    dispatch(clearAuth());
  }
  return {token, onboard_status, authenticateUser, removeAuth};
};

export default useAuth;

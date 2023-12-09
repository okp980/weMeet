import {
  selectAuth,
  addToken,
  clearToken,
  selectOboardStatus,
} from '../store/auth';
import {useAppDispatch, useAppSelector} from '../store';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectAuth);
  const onboard_status = useAppSelector(selectOboardStatus);

  function getToken(token: string) {
    dispatch(addToken({token}));
  }

  function removeToken() {
    dispatch(clearToken());
  }
  return {token, onboard_status, getToken, removeToken};
};

export default useAuth;

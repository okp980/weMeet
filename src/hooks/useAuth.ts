import {
  selectAuth,
  authenticate,
  clearAuth,
  selectUser,
  selectHasOnboardedProfile,
  setHasOnboardedProfile,
} from '../store/auth';
import {useAppDispatch, useAppSelector} from '../store';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectAuth);
  const user = useAppSelector(selectUser);
  const hasOnboardedProfile = useAppSelector(selectHasOnboardedProfile);

  function authenticateUser(token: string) {
    dispatch(authenticate({token}));
  }

  function compeleteProfileOnboarding() {
    dispatch(setHasOnboardedProfile({onboarded: true}));
  }

  function removeAuth() {
    dispatch(clearAuth());
  }
  return {
    token,
    user,
    hasOnboardedProfile,
    compeleteProfileOnboarding,
    authenticateUser,
    removeAuth,
  };
};

export default useAuth;

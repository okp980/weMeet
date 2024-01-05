import {
  selectAuth,
  authenticate,
  clearAuth,
  selectUser,
  selectHasOnboardedProfile,
  setHasOnboardedProfile,
  setFcmToken,
  clearFcmToken,
  selectFcmToken,
} from '../store/auth';
import {useAppDispatch, useAppSelector} from '../store';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectAuth);
  const fcmToken = useAppSelector(selectFcmToken);
  const user = useAppSelector(selectUser);
  const hasOnboardedProfile = useAppSelector(selectHasOnboardedProfile);

  function authenticateUser(token: string) {
    dispatch(authenticate({token}));
  }

  function compeleteProfileOnboarding() {
    dispatch(setHasOnboardedProfile({onboarded: true}));
  }

  function addFcmToken(token: string) {
    dispatch(setFcmToken({fcmToken: token}));
  }

  function removeAuth() {
    dispatch(clearAuth());
  }
  function removeFcmToken() {
    dispatch(clearFcmToken());
  }
  return {
    token,
    fcmToken,
    user,
    hasOnboardedProfile,
    compeleteProfileOnboarding,
    authenticateUser,
    removeAuth,
    addFcmToken,
    removeFcmToken,
  };
};

export default useAuth;

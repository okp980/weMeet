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
  selectHasBeenWelcome,
  setHasBeenWelcome,
} from '../store/auth';
import {useAppDispatch, useAppSelector} from '../store';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectAuth);
  const fcmToken = useAppSelector(selectFcmToken);
  const user = useAppSelector(selectUser);
  const hasOnboardedProfile = useAppSelector(selectHasOnboardedProfile);
  const hasBeenWelcome = useAppSelector(selectHasBeenWelcome);

  function authenticateUser(token: string) {
    dispatch(authenticate({token}));
  }

  function compeleteProfileOnboarding() {
    dispatch(setHasOnboardedProfile({onboarded: true}));
  }

  function addFcmToken(token: string) {
    dispatch(setFcmToken({fcmToken: token}));
  }

  function welcome() {
    dispatch(setHasBeenWelcome());
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
    hasBeenWelcome,
    compeleteProfileOnboarding,
    authenticateUser,
    removeAuth,
    addFcmToken,
    removeFcmToken,
    welcome,
  };
};

export default useAuth;

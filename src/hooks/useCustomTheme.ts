import {useColorScheme} from 'react-native';
import {useAppDispatch, useAppSelector} from '../store';
import {selectTheme, updateTheme} from '../store/theme';
import {Color} from '../constants';
import {Theme} from '@react-navigation/native';

const useCustomTheme = () => {
  const scheme = useColorScheme();
  const dispatch = useAppDispatch();

  let color: Theme = Color.dark;
  const theme = useAppSelector(selectTheme);
  if (theme === 'system') {
    if (scheme === 'light') {
      color = Color.light;
    }
    if (scheme === 'dark') {
      color = Color.dark;
    }
  }
  if (theme === 'light') {
    color = Color.light;
  }
  if (theme === 'dark') {
    color = Color.dark;
  }

  const changeTheme = (themeState: 'light' | 'dark' | 'system') => {
    dispatch(updateTheme({theme: themeState}));
  };
  return {theme, color, changeTheme};
};

export default useCustomTheme;

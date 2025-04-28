import {useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {DarkTheme, LightTheme} from '../../themes/themes';

const useAppTheme = () => {
  const isDark = useSelector(
    (state: RootState) => state.theme?.isDarkMode ?? false,
  ); // safe access
  const theme = isDark ? DarkTheme : LightTheme;
  return {theme, colors: theme.colors, isDark};
};

export default useAppTheme;

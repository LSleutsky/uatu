import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

import { useTheme } from '~/context/ThemeContext';

const ThemeToggleSwitch = styled(Switch)(() => ({
  width: 62,
  height: 34,
  padding: 7,
  '&.MuiSwitch-root': {
    margin: 0
  },
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: `translateX(6px)`,
    '&.Mui-checked': {
      color: `#fff`,
      transform: `translateX(22px)`,
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 21 21"><path fill="${encodeURIComponent(
          `#fff`
        )}" d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1"/></svg>')`,
        transform: `translate(-1px, -1px)`
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: `#c0c0c0`
      }
    }
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: useTheme().theme === `dark` ? `#da70d6` : `#191970`,
    width: 32,
    height: 32,
    '&::before': {
      content: `''`,
      position: `absolute`,
      width: `100%`,
      height: `100%`,
      left: 0,
      top: 0,
      backgroundRepeat: `no-repeat`,
      backgroundPosition: `center`,
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        `#fff`
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`
    }
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: `#c0c0c0`,
    borderRadius: 20 / 2
  }
}));

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return <ThemeToggleSwitch checked={theme === `dark`} onChange={toggleTheme} />;
}

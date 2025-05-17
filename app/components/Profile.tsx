import { useState } from 'react';
import { useAuth } from '~/lib/auth';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';

export default function Profile() {
  const user = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    user && (
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Tooltip title="Account settings">
            <IconButton
              aria-controls={open ? 'account-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              size="small"
              sx={{ ml: 2 }}
              onClick={handleClick}
            >
              <Avatar />
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          id="account-menu"
          open={open}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: 'visible',
                // filter: 'drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1
                }
              }
            }
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          onClick={handleClose}
          onClose={handleClose}
        >
          <div>{user?.displayName}</div>
          <Divider />
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </>
    )
  );
}

import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  Home as HomeIcon,
  User as UsersIcon,
} from 'react-feather';
import { useAuth } from 'src/context/AuthContext';
import { GiCow, GiMedicines } from 'react-icons/gi';
import { FaSyringe, FaTruck, FaMoneyCheckAlt } from 'react-icons/fa';
import { FiUserPlus, FiCalendar } from "react-icons/fi";
import NavItem from './NavItem';

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard',
    availableOnFirstLogin: true
  },
  {
    href: '/app/fazendas',
    icon: HomeIcon,
    title: 'Fazendas',
    availableOnFirstLogin: true
  },
  {
    href: '/app/funcionarios',
    icon: UsersIcon,
    title: 'Funcionarios',
    availableOnFirstLogin: false
  },
  {
    href: '/app/animais',
    icon: GiCow,
    title: 'Animais',
    availableOnFirstLogin: false
  },
  {
    href: '/app/medicamentos',
    icon: GiMedicines,
    title: 'Medicamentos',
    availableOnFirstLogin: false
  },
  {
    href: '/app/vacinacao',
    icon: FaSyringe,
    title: 'Vacinação',
    availableOnFirstLogin: false
  },
  {
    href: '/app/transferencia-animais',
    icon: FaTruck,
    title: 'Transferir animais',
    availableOnFirstLogin: false
  },
  {
    href: '/app/agendamento-veterinario',
    icon: FiCalendar,
    title: 'Agendar veterinario',
    availableOnFirstLogin: false
  },
  {
    href: '/app/comercializacao',
    icon: FaMoneyCheckAlt,
    title: 'Comercialização',
    availableOnFirstLogin: false
  },
  {
    href: '/app/meus-usuarios',
    icon: FiUserPlus,
    title: 'Gerenciar usuarios',
    availableOnFirstLogin: true
  },
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const { user: userReal } = useAuth();
  const [navItems, setNavItems] = useState([])

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    console.log(userReal.jaTemFazendas)
    if (userReal.jaTemFazendas) {
      setNavItems(items)
    } else {
      setNavItems(items.filter(i => i.availableOnFirstLogin))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, userReal]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={userReal.user.imagePerfilUrl || '/static/images/avatars/logo.jpeg'}
          to="/app/account"
        />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          Bem vindo
          {' '}
          {userReal.user.username}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        />
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {navItems.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default NavBar;

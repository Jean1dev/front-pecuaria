import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import DashboardView from 'src/pages/dashboard';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import RegisterView from 'src/views/auth/RegisterView';
import ChangePassword from 'src/views/auth/ChangePassword';
import SettingsView from 'src/views/settings/SettingsView';
import ReportsView from 'src/views/reports/DashboardView';

import FazendaListView from 'src/pages/fazendas';
import CadastroFazenda from 'src/pages/fazendas/CadastroFazenda';

import FuncionarioListView from 'src/pages/funcionarios';
import CadastroFuncionario from 'src/pages/funcionarios/CadastroFuncionario';

import AnimaisListView from 'src/pages/animais';
import CadastroAnimal from 'src/pages/animais/CadastroAnimal';

import MedicamentosListView from 'src/pages/medicamentos';
import CadastroMedicamento from 'src/pages/medicamentos/CadastroMedicamento';

import VacinacaoListView from 'src/pages/vacinacao';
import ProcessoVacinacao from 'src/pages/vacinacao/ProcessoVacinacao';

import TransferenciaAnimais from 'src/pages/transferencia-animais';

import UsuariosListView from 'src/pages/usuarios';
import CadastroUsuario from 'src/pages/usuarios/CadastroUsuario';

import AgendamentosListView from 'src/pages/agendamento-veterinario';
import CadastroAgendamento from 'src/pages/agendamento-veterinario/CadastroAgendamento';

import Comercializacao from 'src/pages/comercializacao';

const routes = (isLoggedIn) => [
  {
    path: 'app',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'fazendas', element: <FazendaListView /> },
      { path: 'fazendas/:id', element: <CadastroFazenda /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'dashboard-view', element: <ReportsView /> },
      { path: 'animais', element: <AnimaisListView /> },
      { path: 'animais/:id', element: <CadastroAnimal /> },
      { path: 'funcionarios', element: <FuncionarioListView /> },
      { path: 'funcionarios/:id', element: <CadastroFuncionario /> },
      { path: 'meus-usuarios', element: <UsuariosListView /> },
      { path: 'cadastro-usuario', element: <CadastroUsuario /> },
      { path: 'medicamentos', element: <MedicamentosListView /> },
      { path: 'cadastro-medicamento', element: <CadastroMedicamento /> },
      { path: 'vacinacao', element: <VacinacaoListView /> },
      { path: 'vacinacao/novo-processo', element: <ProcessoVacinacao /> },
      { path: 'transferencia-animais', element: <TransferenciaAnimais /> },
      { path: 'agendamento-veterinario', element: <AgendamentosListView /> },
      { path: 'cadastro-agendamento', element: <CadastroAgendamento /> },
      { path: 'comercializacao', element: <Comercializacao /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: !isLoggedIn ? <MainLayout /> : <Navigate to="/app/dashboard" />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: 'alterar-senha/:id', element: <ChangePassword /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;

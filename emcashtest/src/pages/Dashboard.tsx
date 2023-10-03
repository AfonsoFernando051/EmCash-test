import React from 'react';
import Header from '../components/dashboard/Header';
import NavFuncionarios from "../components/dashboard/NavFuncionarios";
import WorkersTable from '../components/dashboard/WorkersTable';
import styled from "styled-components";

export default function Dashboard() {
  return (
    <>
    <WholePage>
      <Header/>
      <DashboardComponents>
        <NavFuncionarios />
        <WorkersList>
          <WorkersTable />
        </WorkersList>
      </DashboardComponents>
      </WholePage>
    </>
  );
}
const WholePage = styled.div`
  background: var(--dark-200, #E8E8E8);
  height: 100vh;

`
const DashboardComponents = styled.div`
  padding: 2% 10%
`
const WorkersList = styled.div`

`
import React from 'react';
import Header from '../components/dashboard/Header';
import WorkersTable from '../components/dashboard/WorkersTable';
import styled from "styled-components";

export default function Dashboard() {
  

  return (
    <>
    <WholePage>
      <Header/>
      <DashboardComponents>
        <div>
          <WorkersTable />
        </div>
      </DashboardComponents>
      </WholePage>
    </>
  );
}
const WholePage = styled.div`
  background: #E8E8E8;

`
const DashboardComponents = styled.div`
  padding: 1% 10%;
  height: 100vh;
`
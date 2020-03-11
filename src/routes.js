import React from 'react';
import { Scene, Router, Stack } from 'react-native-router-flux';

import ListOfClimates from "./pages/ListOfClimates"
import DetailClimates from "./pages/DetailClimates"

const Routes = () => (
  <Router>
    <Stack key="root">
      <Scene key="list" component={ListOfClimates} title={"Climagora"} initial />
      <Scene key="detail" component={DetailClimates} hideNavBar={true} title={"Climate"} />
    </Stack>
  </Router>
);

export default Routes;
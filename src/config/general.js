import styled from 'styled-components/native';
import colors from './colors'
import metrics from './metrics'

export const Container = styled.View`
    flex:1;
    background-color: ${colors.background}
`;

export const Center = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Row = styled.View`
  flex-direction: row
`;
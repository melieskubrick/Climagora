import styled from 'styled-components/native';
import colors from '../../config/colors';
import metrics from '../../config/metrics';
import fonts from '../../config/fonts';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

export const Card = styled.TouchableOpacity``;

export const CardView = styled.View`
  background-color: ${colors.white};
  padding: 15px;
  margin: 5px 10px 5px 10px;
  border-radius: ${metrics.baseRadius}px;
  justify-content: center;
`;
export const Place = styled.Text`
  margin-left: 10px;
  font-family: ${fonts.medium}
  color: ${colors.blueDark};
  font-size: 16px;
`;

const shaddow = color => ({
  shadowColor: color,
  shadowOffset: {
    width: 0,
    height: 12,
  },
  shadowOpacity: 0.2,
  shadowRadius: 16.0,
  elevation: 24,
});

CardView.defaultProps = {
  ...shaddow(colors.blueDefault),
};

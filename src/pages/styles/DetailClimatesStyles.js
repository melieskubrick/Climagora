import styled from 'styled-components/native';
import colors from '../../config/colors';
import fonts from '../../config/fonts';

export const PlaceName = styled.Text`
    color: ${colors.white}
    font-size: ${fonts.textTitle}px;
    margin-top: 20px;
    font-family: ${fonts.medium};
    text-align: center
`
export const WeatherState = styled.Text`
    color: ${colors.white};
    font-size: ${fonts.subtitle}px;
    font-family: ${fonts.light};
    text-align: center
`
export const Temp = styled.Text`
    color: ${colors.white};
    font-size: ${fonts.big}px;
    font-family: ${fonts.medium};
    text-align: left;

`
export const TempMinMax = styled.Text`
    color: ${colors.white};
    font-size: ${fonts.ultraSmall}px;
    font-family: ${fonts.light};
    text-align: left;
    margin-top: -5px
`
export const Info = styled.Text`
    color: ${colors.white};
    font-size: ${fonts.ultraSmall}px;
    font-family: ${fonts.light};
    margin-left: 10px
`
export const Container = styled.View`
flex:1;
`;

export const SmallIcon = styled.Image`
    height: 25px;
    width: 25px;
`


export const WeatherIcon = styled.Image`
    height: 100px;
    width: 100px;
`

import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

// API
import api from '../services/api';
import { Actions } from 'react-native-router-flux';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Elements
import { Center, Row } from '../config/general';
import colors from '../config/colors';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from 'react-native-underline-tabbar';

import moment from 'moment';

import {
  Container,
  WeatherIcon,
  PlaceName,
  WeatherState,
  Temp,
  TempMinMax,
  SmallIcon,
  Info,
} from '../pages/styles/DetailClimatesStyles';

export default function Weather(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [dataClimate, setDateClimate] = useState('');
  const [currentDay, setDay] = useState(0);

  const LoadingActivity = () =>
    loading == true ? (
      <Center style={styles.loadingActivity}>
        <ActivityIndicator size="large" color={colors.white} />
      </Center>
    ) : null;

  async function dataOfPlace(woeid) {
    const response = await api.get(`/${woeid}`).catch(err => {
      console.log('erro' + err);
      setLoading(false);
    });
    setLoading(false);

    dispatch({ type: 'SELECT_CLIMATE', dataClimate: dataClimate });
    setDateClimate(response.data['consolidated_weather']);
    datesApplicable();
  }

  useEffect(() => {
    setLoading(true);
    dataOfPlace(props.woeid);
  }, []);

  const datas =
    dataClimate != ''
      ? {
        title: props.title,
        the_temp: dataClimate[currentDay]['the_temp'],
        max_temp: dataClimate[currentDay]['max_temp'],
        min_temp: dataClimate[currentDay]['min_temp'],
        the_temp: dataClimate[currentDay]['the_temp'],
        weather_state: dataClimate[currentDay]['weather_state_name'],
        icon: dataClimate[currentDay]['weather_state_abbr'],
        wind_speed: dataClimate[currentDay]['wind_speed'],
        predictability: dataClimate[currentDay]['predictability'],
        humidity: dataClimate[currentDay]['humidity'],
      }
      : null;

  const imagesWeather = [
    {
      lc: require('../assets/images/weather/cloudy_s_sunny.png'),
      c: require('../assets/images/weather/sunny.png'),
      s: require('../assets/images/weather/rain_s_sunny.png'),
      hc: require('../assets/images/weather/cloudy.png'),
      lr: require('../assets/images/weather/rain_light.png'),
      h: require('../assets/images/weather/rain_light.png'),
      t: require('../assets/images/weather/thunderstorms.png'),
      hr: require('../assets/images/weather/rain.png'),
    },
  ];

  const Page = ({ index }) => {

    return (<View>{setDay(index)}</View>)


  };

  const [datesClimate, setDatesClimate] = useState([]);
  datesApplicable = () => {
    const arrayDates = [];
    for (let i = 0; i < dataClimate.length; i++) {
      if (i == 0) {
        arrayDates.push('Today');
      } else if (i == 1) {
        arrayDates.push('Tomorrow');
      } else {
        arrayDates.push(moment(dataClimate[i]['applicable_date']).format('L'));
      }
    }
    setDatesClimate(arrayDates);
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor={colors.blueDark} />
      <LinearGradient
        colors={[colors.blueDark, colors.blueDefault, colors.blueDefault]}
        style={styles.linearGradient}>
        {dataClimate != '' ? (
          <SafeAreaView style={styles.safeAreaView}>
            <Row style={styles.header}>
              <TouchableOpacity
                style={styles.backIcon}
                onPress={() => Actions.pop()}>
                <Icon name="arrow-left" size={20} color={colors.white} />
              </TouchableOpacity>

              <View>
                <PlaceName>{datas.title}</PlaceName>
                <WeatherState>{datas.weather_state}</WeatherState>
              </View>

              <TouchableOpacity style={styles.favoriteIcon}>
                <Icon name="heart" size={20} color={colors.white} />
              </TouchableOpacity>
            </Row>

            <Row style={styles.row}>
              {imagesWeather.map((item, i) => {
                return <WeatherIcon key={i} source={item[datas.icon]} />;
              })}
              <View>
                <Temp>{datas.the_temp.toFixed(0)}°C</Temp>
                <TempMinMax>
                  {datas.min_temp.toFixed(0)}°C - {datas.max_temp.toFixed(0)}°C
                </TempMinMax>
              </View>
            </Row>

            <Row style={styles.infos}>
              <Row style={styles.row}>
                <SmallIcon source={require('../assets/images/wind.png')} />
                <Info>{datas.wind_speed.toFixed(0) + ' MPH'}</Info>
              </Row>

              <Info>{datas.predictability}% Confidence</Info>

              <Row style={styles.row}>
                <SmallIcon source={require('../assets/images/water.png')} />
                <Info>{datas.humidity}%</Info>
              </Row>
            </Row>
          </SafeAreaView>
        ) : null}
      </LinearGradient>

      <ScrollableTabView
        tabBarActiveTextColor="#53ac49"
        renderTabBar={() => <TabBar underlineColor="#53ac49" />}>

        {datesClimate.map((date, i) => (
          <Page key={i} tabLabel={{ label: date }} index={i} />
        ))}
      </ScrollableTabView>

      <LoadingActivity />
    </Container>
  );
}

const styles = StyleSheet.create({
  search: {
    height: 200,
    width: 200,
  },
  header: { justifyContent: 'center' },
  loadingActivity: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: Dimensions.get('window').height / 2,
  },
  linearGradient: {
    height: 300,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
  },
  infos: {
    justifyContent: 'space-between',
    width: Dimensions.get('window').width,
    padding: 10,
    alignItems: 'center',
  },
  row: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    position: 'absolute',
    left: 20,
    top: 20,
  },
  favoriteIcon: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  safeAreaView: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

import React, { useState, useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  FlatList,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Detail from './DetailClimates';

import { Actions } from 'react-native-router-flux';

// Elements
import { SearchBar } from 'react-native-elements';
import { Center, Row } from '../config/general';
import { Container, Card, CardView, Place } from './styles/ListOfClimatesStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';

// API
import api from '../services/api';

// Lottie Animation
import LottieView from 'lottie-react-native';
import colors from '../config/colors';

export default function ListOfClimates() {
  // Local States
  const [search, setSearch] = useState('');
  const [responseData, setResponse] = useState('');
  const animation = useRef(null);
  const [loading, setLoading] = useState(false);

  // SearchBar Text
  updateSearch = search => {
    setSearch(search);
    console.log(search);
    searchPlace(search);
    setLoading(true);
  };

  // HTTP Request
  async function searchPlace(text) {
    const response = await api.get(`/search/?query=${text}`).catch(err => {
      // console.log('erro' + err);
      setLoading(false);
    });

    if (!text == '') {
      setResponse(response.data);
    } else {
      setResponse(null);
    }
    setLoading(false);
  }

  useEffect(() => {
    return () => {
      // animation.current.play();
    };
  }, []);

  const LoadingActivity = () =>
    loading == true ? (
      <Center style={styles.loadingActivity}>
        <ActivityIndicator size="large" color={colors.blueDark} />
      </Center>
    ) : null;

  // Animation No Data
  const NoData = visible => (
    <Center>
      <LottieView
        style={styles.search}
        ref={animation}
        source={require('../assets/animations/search.json')}
        autoPlay
        loop
      />
    </Center>
  );

  openDetail = (data, title) => {
    Actions.detail({ title: title, woeid: data['woeid'] });
  };

  renderList = (item, index) => {
    return (
      <Card onPress={() => openDetail(responseData[index], item.title)}>
        <CardView>
          <Row>
            <Icon name="map-marker-alt" size={16} color={colors.blueDark} />
            <Place>{item.title}</Place>
          </Row>
        </CardView>
      </Card>
    );
  };

  return (
    <Container>
      <SearchBar
        placeholder="Choose a city..."
        onChangeText={this.updateSearch}
        value={search}
        lightTheme
      />

      <FlatList
        data={responseData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => renderList(item, index)}
        ListEmptyComponent={() => <NoData />}
      />

      <LoadingActivity />
    </Container>
  );
}

const styles = StyleSheet.create({
  search: {
    height: 200,
    width: 200,
  },
  loadingActivity: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: Dimensions.get('window').height / 3,
  },
});

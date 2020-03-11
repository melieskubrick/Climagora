import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga'
import {climateReducer} from '../reducers/climate';

import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(climateReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga)

export default store;

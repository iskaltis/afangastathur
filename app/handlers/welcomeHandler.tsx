import React from 'react';
import Welcome from '../screens/Welcome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useModal} from 'react-native-modal-provider';

const APP_OPENED_KEY = 'appOpened12aa4';

const useWelcomeHandler = () => {
  const {openModal} = useModal();

  return () => {
    AsyncStorage.getItem(APP_OPENED_KEY)
      .then(result => {
        console.log('[LOG] Value retrieved from AsyncStorage:', result);
        if (!result) {
          openModal({
            node: <Welcome />,
          });
          AsyncStorage.setItem(APP_OPENED_KEY, 'true').catch(setErr => {
            console.error('[ERROR] Could not set AsyncStorage:', setErr);
          });
        }
      })
      .catch(err => {
        console.error('[ERROR] Could not read AsyncStorage', err);
      });
  };
};

export default useWelcomeHandler;

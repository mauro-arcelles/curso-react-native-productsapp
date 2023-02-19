import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { AuthContext } from '../context/AuthContext';
import LoadingScreen from '../screens/LoadingScreen';
import ProductsNavigator from './ProductsNavigator';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const { status } = useContext(AuthContext);

  if (status === 'checking') {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: 'white'
        }
      }}
    >
      {
        status !== 'authenticated'
          ?
          (
            <>
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            </>
          )
          :
          (
            <Stack.Screen name="ProductsNavigator" component={ProductsNavigator} />
            // <Stack.Screen name="ProtectedScreen" component={ProtectedScreen} />
          )
      }


    </Stack.Navigator>
  );
};

export default Navigator;

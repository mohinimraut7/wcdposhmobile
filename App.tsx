import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import PoshSurveyScreen from './src/screens/PoshSurveyScreen';
import CompanyLoginScreen from './src/screens/CompanyLoginScreen';
import InspectionOfficerSurveyScreen from './src/screens/InspectionOfficerSurveyScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CompanyLogin"
        screenOptions={{headerShown: false}}>
        {/* Admin/Officer Login */}
        <Stack.Screen name="Login" component={LoginScreen} />

        {/* Inspection Officer → Surveys Dashboard */}
        <Stack.Screen name="OfficerSurveys" component={InspectionOfficerSurveyScreen} />

        {/* Company Flow */}
        <Stack.Screen name="CompanyLogin" component={CompanyLoginScreen} />
        <Stack.Screen name="Register"     component={RegisterScreen} />
        <Stack.Screen name="Survey"       component={PoshSurveyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
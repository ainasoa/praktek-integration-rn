
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Feather, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import SwiperPage from './pages/SwiperPage';
import { createContext, useContext, useState } from 'react';
import LikeScreen from './pages/LikeScreen';
import SomeScreen from './pages/SomeScreen';

const Tab = createBottomTabNavigator();

const EmotionContext = createContext({ like: [], dislike: [], })

export const useEmotion = () => useContext(EmotionContext)

function App() {
  const emotionsState = useState({ like: [], dislike: [], })

  const tabs = useState([
    {
      name: 'Users',
      component: SwiperPage,
      icon: ({ color }) => <Feather name="copy" size={24} color={color} />
    },
    {
      name: 'Likes',
      component: LikeScreen,
      icon: ({ color }) => <AntDesign name="heart" size={24} color={color} />
    },
    {
      name: 'Message',
      component: SomeScreen,
      icon: ({ color }) => <AntDesign name="message1" size={24} color={color} />
    },
    {
      name: 'User',
      component: SomeScreen,
      icon: ({ color }) => <FontAwesome5 name="user-alt" size={24} color={color} />
    },
  ])[0]

  const renderTabItem = (tabProps, index) =>
    <Tab.Screen
      key={index}
      name={tabProps.name}
      component={tabProps.component}
      options={{
        tabBarShowLabel: false,
        tabBarIcon: tabProps.icon,
      }}
    />

  return (
    <EmotionContext.Provider value={emotionsState}>
      <NavigationContainer>
        <Tab.Navigator
          sceneContainerStyle={{ backgroundColor: 'white' }}
          screenOptions={{
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'grey',
          }}>
          {tabs.map(renderTabItem)}
        </Tab.Navigator>
      </NavigationContainer>
    </EmotionContext.Provider>
  );
}




export default App
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from '../screens/Home'
import SavedScreen from '../screens/Saved'

type TabStackParams = {
    Home: undefined,
    Saved: undefined
}

const Tab = createBottomTabNavigator<TabStackParams>()

const RootNavigation = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName='Home' screenOptions={{headerShown:false, tabBarActiveTintColor:'#8D9CF4'}}>
                <Tab.Screen name='Home' component={HomeScreen}/>
                <Tab.Screen name='Saved' component={SavedScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigation
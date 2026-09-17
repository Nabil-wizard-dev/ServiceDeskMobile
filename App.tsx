/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import ChargingScreen from './src/presentation/screens/ChargingScreen';
import LoginScreen from './src/presentation/screens/auth/LoginScreen';
import { NavigationContainer, NavigatorScreenParams, useNavigation } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import RegisterScreen from './src/presentation/screens/auth/RegisterScreen';
import ProfileScreen from './src/presentation/screens/Home/ProfileScreen';
import TicketListScreen from './src/presentation/screens/Home/TicketListScreen';
import NewTicketScreen from './src/presentation/screens/Home/NewTicketScreen';
import CommentsScreen from './src/presentation/screens/Home/CommentsScreen';
import HomeScreen from './src/presentation/screens/Home/HomeScreen';
import ScreenHeader from './src/presentation/components/layout/ScreenHeader';
import Avatar from './src/presentation/components/dataDisplay/Avatar';
import IconButton from './src/presentation/components/buttons/IconButton';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from './src/constants/constantColors';
import TicketDetailsScreen from './src/presentation/screens/Home/TicketDetailsScreen';

import {
  createBottomTabNavigator,
  BottomTabBarProps as NavigationTabBarProps,
} from '@react-navigation/bottom-tabs';

import BottomTabBar from './src/presentation/components/layout/BottomTabBar';

export type MainTabsParamList = {
  TicketList: undefined;
  Profile: undefined;
  Home: undefined; // Déplacez ici les écrans qui sont réellement des onglets
};

export type RootStackParamList = {
  Form: { todoId?: string } | undefined;
  MainTabs: NavigatorScreenParams<MainTabsParamList>; 
  Login: undefined;
  Details: {ticketId?:string}|undefined;
  NewTicket: undefined;
  Charging: undefined;
  Comments:{ticketId?:string}|undefined;
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function CustomTabBar({ state, navigation }: NavigationTabBarProps) {
  const tabs = [
    {
      key: 'Home',
      label: 'Accueil',
      icon: (color: string) => <Feather name="home" size={20} color={color} />,
    },
    {
      key: 'TicketList',
      label: 'Tickets',
      icon: (color: string) => (
        <Feather name="file-text" size={20} color={color} />
      ),
    },
    {
      key: 'Notifications',
      label: 'Notifications',
      icon: (color: string) => <Feather name="bell" size={20} color={color} />,
    },
    {
      key: 'Profile',
      label: 'Profil',
      icon: (color: string) => <Feather name="user" size={20} color={color} />,
    },
  ];

  return (
    <BottomTabBar
      tabs={tabs}
      activeKey={state.routes[state.index].name}
      onTabPress={key => navigation.navigate(key)}
      onFabPress={() => {
        navigation.getParent()?.navigate('NewTicket' as never);
      }}
    />
  );
}

function MainTabs() {
  // const navigation =
  //   useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
      }}
      tabBar={props => <CustomTabBar {...props} />}
    >
      {/* page d'acceuil */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: () => (
            <ScreenHeader
              leftComponent={<Avatar name="Afi Kossi" size={38} />}
              rightComponent={
                <IconButton
                  variant="plain"
                  icon={
                    <Feather name="bell" size={20} color={COLORS.textPrimary} />
                  }
                  onPress={() => {}}
                />
              }
            />
          ),
        }}
      />
      {/* profile */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          header: () => (
            <ScreenHeader
              title="Mon profil"
              rightComponent={
                <IconButton
                  icon={
                    <Feather
                      name="settings"
                      size={18}
                      color={COLORS.textPrimary}
                    />
                  }
                  onPress={() => {}}
                />
              }
            />
          ),
        }}
      />
      {/* liste de Ticket */}
      <Tab.Screen
        name="TicketList"
        component={TicketListScreen}
        options={({ navigation }) => ({
          header: () => (
            <ScreenHeader
              title="Mes tickets"
              showBackButton
              onBackPress={() => navigation.goBack()}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  // const navigation =
  //   useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainTabs">
          <Stack.Screen name="Charging" component={ChargingScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />

          {/* Groupe qui possède la BottomNavBar */}
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />

          {/* creer un ticket */}
          <Stack.Screen
            name="NewTicket"
            component={NewTicketScreen}
            options={({ navigation})=>({
              header: () => (
                <ScreenHeader
                  title="Nouveau Ticket"
                  showBackButton
                  onBackPress={() => navigation.goBack()}
                />
              ),
            })}
          />
          {/* les commentaires */}
          <Stack.Screen
            name="Comments"
            component={CommentsScreen}
            options={({ navigation})=>({
              header: () => (
                <ScreenHeader
                  title="Commentaires"
                  showBackButton
                  onBackPress={() => navigation.goBack()}
                />
              ),
            })}
          />
          {/* details ticket */}
          <Stack.Screen
            name="Details"
            component={TicketDetailsScreen}
            options={({navigation})=>({
              header: () => (
                // Retour + titre + kebab menu
                <ScreenHeader
                  title="Détails du ticket"
                  showBackButton
                  onBackPress={() => navigation.goBack()}
                  rightComponent={
                    <IconButton
                      variant="plain"
                      icon={
                        <Feather
                          name="more-vertical"
                          size={20}
                          color={COLORS.textPrimary}
                        />
                      }
                      onPress={() => {}}
                    />
                  }
                />
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

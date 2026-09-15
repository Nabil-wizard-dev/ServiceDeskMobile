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
import { NavigationContainer, useNavigation } from '@react-navigation/native';
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

export type RootStackParamList = {
  Home: undefined;
  Form: { todoId?: string } | undefined;
};

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

  const Stack = createNativeStackNavigator();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      

      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Charging" component={ChargingScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          {/* page d'acceuil */}
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              header: () => (
                <ScreenHeader
                  leftComponent={<Avatar name="Afi Kossi" size={32} />}
                  rightComponent={
                    <IconButton
                      variant="plain"
                      icon={
                        <Feather
                          name="bell"
                          size={20}
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
          {/* profile */}
          <Stack.Screen
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
          <Stack.Screen
            name="Ticket Liste"
            component={TicketListScreen}
            options={{
              header: () => (
                <ScreenHeader
                  title="Mes tickets"
                  showBackButton
                  onBackPress={() => navigation.goBack()}
                />
              ),
            }}
          />
          {/* creer un ticket */}
          <Stack.Screen
            name="New Ticket"
            component={NewTicketScreen}
            options={{
              header: () => (
                <ScreenHeader
                  title="Nouveau Ticket"
                  showBackButton
                  onBackPress={() => navigation.goBack()}
                />
              ),
            }}
          />
          {/* les commentaires */}
          <Stack.Screen
            name="Comments"
            component={CommentsScreen}
            options={{
              header: () => (
                <ScreenHeader
                  title="Commentaires"
                  showBackButton
                  onBackPress={() => navigation.goBack()}
                />
              ),
            }}
          />
          {/* details ticket */}
          <Stack.Screen
            name="Details"
            component={TicketDetailsScreen}
            options={{
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
                      onPress={()=>{}}
                    />
                  }
                />
              ),
            }}
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

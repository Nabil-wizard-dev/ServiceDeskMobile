import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import TextInputField from '../../components/inputs/TextInputField';
import CheckBoxItem from '../../components/inputs/CheckBoxItem';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../../constants/constantColors';
import OutlinedButton from '../../components/buttons/OutlinedButton';
import SeparatorWithText from '../../components/layout/SeparatorWithText';
import TextLink from '../../components/buttons/TextLink';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../App';

const LoginScreen = () => {


  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleLogin = () => {
    console.log('login process');
  };

  const handleBiometricLogin = () => {
    console.log('login process');
  };

  const handleForgottenPassword = () => {
    console.log('login process');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{width:'100%'}} >
        {/* Section Logo */}
        <View style={styles.logoContainer} >
          <Image
            
            source={require('../../../constants/logo/ServiceDeskLogo_forWhiteFont.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Texte d'indicaton */}
        <Text style={styles.instructionText}>Connectez-vous a votre compte</Text>

        {/* zone du formulaire */}
        <View style={styles.formContainer}>
          {/* email */}
          <TextInputField
            leftIcon="mail"
            placeholder="Email"
            //  keyboardType="email-adress"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          ></TextInputField>

          {/* pass */}
          <TextInputField
            leftIcon="lock"
            placeholder="Mot de passe"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          ></TextInputField>
          {/* se souvnir de moi */}
          <CheckBoxItem 
            style={{marginBottom:'35'}}
            label="Se Souvenir de moi"
            checked={false}
            onChange={setRememberMe}
          ></CheckBoxItem>

          <PrimaryButton
            title="Se connecter"
            onPress={()=>navigation.navigate('MainTabs',{screen:'Home'})}
          ></PrimaryButton>

          <SeparatorWithText></SeparatorWithText>

          {/* button de biometrie */}
          <OutlinedButton
            title="Connexion avec empreinte"
            icon={<Icon name="fingerprint" size={20} color={COLORS.primary} />}
            onPress={handleBiometricLogin}
            
          />

         
          <TextLink
          style={{marginVertical:30}}
            title="Mot de pass oublie ?"
            onPress={handleForgottenPassword}
          ></TextLink>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
    marginTop:60
  },
  logo: {
     width: 280, 
    height: 125,
  },
  instructionText: {
    fontSize: 16,
    // Gris moyen pour le texte d'instruction
    color: '#808080',
    textAlign: 'center',
   //  marginBottom: 25,
    fontFamily: 'System', // Utilise la police système par défaut
  },
  formContainer: {
    width: '100%',
    marginTop:40,
    alignItems: 'stretch', // Pour que les boutons occupent toute la largeur
  },
  
});

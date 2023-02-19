import React, { useContext, useEffect } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { loginStyles } from '../theme/loginTheme';
import WhiteLogo from '../components/WhiteLogo';
import { useForm } from '../hooks/useForm';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';


interface Props extends NativeStackScreenProps<any, any> {
}

const RegisterScreen = ({ navigation }: Props) => {

  const { signUp, errorMessage, removeError } = useContext(AuthContext);

  useEffect(() => {
    if (errorMessage.length === 0) return;

    Alert.alert('Registro incorrecto', errorMessage, [
      {
        text: 'Ok',
        onPress: removeError
      }
    ]);


  }, [errorMessage]);

  const { email, password, name, onChange } = useForm({
    name: '',
    email: '',
    password: ''
  });

  const onRegister = () => {
    Keyboard.dismiss();

    signUp({ correo: email, password, nombre: name });
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: '#5856D6'
        }}
        behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
      >
        <View style={loginStyles.formContainer}>

          <WhiteLogo />

          <Text style={loginStyles.title}>Registro</Text>

          <Text style={loginStyles.label}>Nombre:</Text>
          <TextInput
            placeholder="Ingrese su nombre"
            placeholderTextColor="rgba(255,255,255,0.4)"
            underlineColorAndroid="white"
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIOS
            ]}
            selectionColor="white"
            onChangeText={(value) => onChange(value, 'name')}
            value={name}
            autoCapitalize="none"
            autoCorrect={false}
            onSubmitEditing={onRegister}
          />

          <Text style={loginStyles.label}>Email:</Text>
          <TextInput
            placeholder="Ingrese su email"
            placeholderTextColor="rgba(255,255,255,0.4)"
            keyboardType="email-address"
            underlineColorAndroid="white"
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIOS
            ]}
            selectionColor="white"
            onChangeText={(value) => onChange(value, 'email')}
            value={email}
            autoCapitalize="none"
            autoCorrect={false}
            onSubmitEditing={onRegister}
          />

          <Text style={loginStyles.label}>Contraseña:</Text>
          <TextInput
            placeholder="*******"
            placeholderTextColor="rgba(255,255,255,0.4)"
            underlineColorAndroid="white"
            secureTextEntry
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIOS
            ]}
            selectionColor="white"
            onChangeText={(value) => onChange(value, 'password')}
            value={password}
            onSubmitEditing={onRegister}
          />

          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={loginStyles.button}
              onPress={onRegister}
            >
              <Text style={loginStyles.buttonText}>Crear cuenta</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => navigation.replace('LoginScreen')}
            activeOpacity={0.8}
            style={loginStyles.buttonReturn}
          >
            <Text style={loginStyles.buttonText}>{'<'} Login</Text>

          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </>
  );
};

export default RegisterScreen;

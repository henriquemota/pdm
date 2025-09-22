import { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import axios from 'axios'

export default function App() {
	const [login, setLogin] = useState('valor')
	const [senha, setSenha] = useState('valor')
	const [resultado, setResultado] = useState('')

	useEffect(() => {}, [])

	function _handleLogin() {
		if (login === 'admin' && senha === 'senha') {
			setResultado('Login bem-sucedido')
		} else {
			setResultado('Login falhou')
		}
	}

	return (
		<View style={styles.container}>
			<Text>Informe seu login</Text>
			<TextInput onChangeText={setLogin} style={styles.textinput} placeholder='Login' />
			<TextInput onChangeText={setSenha} style={styles.textinput} placeholder='Senha' secureTextEntry />
			<Button title='Enviar' onPress={_handleLogin} />
			<Text>{resultado}</Text>
			<StatusBar style='auto' />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
		padding: 16,
		gap: 16,
	},
	textinput: {
		borderWidth: 1,
		borderColor: '#000',
	},
})

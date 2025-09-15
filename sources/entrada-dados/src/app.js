import { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Text, View, TextInput, Button } from 'react-native'

import styles from './styles'

export default function App() {
	const [usuario, setUsuario] = useState('')
	const [senha, setSenha] = useState('')
	const [resultado, setResultado] = useState('')

	useEffect(() => {
		if (usuario === '' && senha === '') {
			setResultado('')
		}
	}, [usuario, senha])

	const _handleLogin = () => {
		if (usuario === 'admin' && senha === 'senha') {
			setResultado('Login bem sucedido!')
		} else {
			setResultado('Falha no login. Usuário ou senha incorretos.')
		}
	}
	const _handleReset = () => {
		setUsuario('')
		setSenha('')
	}

	return (
		<View style={styles.container}>
			<Text>Informe seu login</Text>
			<TextInput
				autoCapitalize='none'
				autocorrect={false}
				autocomplete='off'
				keyboardType='email-address'
				value={usuario}
				onChangeText={setUsuario}
				style={styles.textinput}
				placeholder='informe os dados aqui'
			/>
			<Text>Informe sua senha</Text>
			<TextInput
				autoCapitalize='none'
				autocorrect={false}
				autocomplete='off'
				secureTextEntry
				keyboardType='number-pad'
				value={senha}
				onChangeText={setSenha}
				style={styles.textinput}
				placeholder='informe os dados aqui'
			/>
			<View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center' }}>
				<Button title='Enviar' onPress={_handleLogin} />
				<Button title='Resetar' onPress={_handleReset} />
			</View>
			<View style={styles.containerResultado}>
				<Text>{resultado}</Text>
			</View>
			<StatusBar style='auto' />
		</View>
	)
}

import { useState, useContext, createContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'

const ResultadoContext = createContext(null)

function Button({ escolha, image }) {
	const { setResultado } = useContext(ResultadoContext)

	function jogar(escolha) {
		const opcoes = ['pedra', 'papel', 'tesoura']
		const numeroAleatorio = Math.floor(Math.random() * opcoes.length)
		const escolhaComputador = opcoes[numeroAleatorio]

		if (escolha === escolhaComputador) {
			setResultado(`${escolhaComputador} - Empate!`)
		} else if (
			(escolha === 'pedra' && escolhaComputador === 'tesoura') ||
			(escolha === 'papel' && escolhaComputador === 'pedra') ||
			(escolha === 'tesoura' && escolhaComputador === 'papel')
		) {
			setResultado(`${escolhaComputador} - Você ganhou!`)
		} else {
			setResultado(`${escolhaComputador} - Você perdeu!`)
		}
	}

	return (
		<TouchableOpacity style={styles.button} onPress={() => jogar(escolha)}>
			<Image style={styles.imageButtons} source={image} />
		</TouchableOpacity>
	)
}

function Form() {
	const { resultado } = useContext(ResultadoContext)

	return (
		<View style={styles.container}>
			<Text style={styles.title}>JOKENPO</Text>
			<View style={styles.containerButtons}>
				<Button escolha='pedra' image={require('../assets/pedra.png')} />
				<Button escolha='papel' image={require('../assets/papel.png')} />
				<Button escolha='tesoura' image={require('../assets/tesoura.png')} />
			</View>
			<Text style={styles.texto}>Escolha sua jogada</Text>
			<Text style={styles.resultado}>{resultado}</Text>
			<StatusBar style='auto' />
		</View>
	)
}

export default function App() {
	const [resultado, setResultado] = useState('')

	return (
		<ResultadoContext.Provider value={{ resultado, setResultado }}>
			<Form />
		</ResultadoContext.Provider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffffff',
		justifyContent: 'center',
		gap: 16,
	},
	title: {
		fontSize: 48,
		fontWeight: 'bold',
		alignSelf: 'center',
	},
	containerButtons: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		margin: 16,
	},
	button: {
		borderRadius: 48,
		borderWidth: 2,
		borderColor: '#000',
		backgroundColor: 'rgba(255, 255, 255, 0.7)',
	},
	imageButtons: {
		height: 96,
		width: 96,
		borderRadius: 48,
	},
	texto: {
		fontSize: 24,
		fontWeight: '600',
		alignSelf: 'center',
	},
	resultado: {
		borderWidth: 2,
		borderRadius: 8,
		borderColor: '#000',
		padding: 16,
		margin: 16,
		backgroundColor: '#fff',
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		textTransform: 'uppercase',
		color: '#000ed5ff',
	},
})

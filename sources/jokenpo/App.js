import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'

export default function App() {
	const [resultado, setResultado] = useState('')

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
		<View style={styles.container}>
			<Text style={styles.title}>JOKENPO</Text>
			<View style={styles.containerButtons}>
				<TouchableOpacity onPress={() => jogar('pedra')}>
					<Image style={styles.imageButtons} source={require('./assets/pedra.png')} />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => jogar('papel')}>
					<Image style={styles.imageButtons} source={require('./assets/papel.png')} />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => jogar('tesoura')}>
					<Image style={styles.imageButtons} source={require('./assets/tesoura.png')} />
				</TouchableOpacity>
			</View>
			<Text style={styles.texto}>Escolha sua jogada</Text>
			<Text style={styles.resultado}>{resultado}</Text>
			<StatusBar style='auto' />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#c3c3c3',
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
	imageButtons: {
		height: 96,
		width: 96,
	},
	texto: {
		fontSize: 24,
		fontWeight: 'semibold',
		alignSelf: 'center',
	},
	resultado: {
		borderWidth: 2,
		borderRadius: 8,
		borderColor: '#000',
		padding: 16,
		margin: 16,
		backgroundColor: '#fff',
		fontSize: 16,
		fontWeight: 'semibold',
		textAlign: 'center',
	},
})

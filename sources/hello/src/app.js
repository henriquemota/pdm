import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Text, View, TouchableOpacity, Image } from 'react-native'

// importacao do arquivo de estilos
import styles from './styles'

// importacao das imagens
import pedra from '../assets/pedra.png'
import papel from '../assets/papel.png'
import tesoura from '../assets/tesoura.png'

export default function App() {
	const [resultado, setResultado] = useState('')

	function _handlePress(escolha) {
		const opcoes = ['pedra', 'papel', 'tesoura']
		const indice = Math.floor(Math.random() * opcoes.length)
		const escolhaComputador = opcoes[indice]

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
			<Text style={styles.title}>Pedra, Papel e Tesoura</Text>
			<View style={styles.imageContainer}>
				<TouchableOpacity style={styles.button} onPress={() => _handlePress('pedra')}>
					<Image source={pedra} style={styles.image} />
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={() => _handlePress('papel')}>
					<Image source={papel} style={styles.image} />
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={() => _handlePress('tesoura')}>
					<Image source={tesoura} style={styles.image} />
				</TouchableOpacity>
			</View>
			<Text style={styles.subtitle}>Escolha sua jogada</Text>
			<Text style={styles.result}>{resultado}</Text>
			<StatusBar style='auto' />
		</View>
	)
}

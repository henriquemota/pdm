import { useState, useContext, createContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Text, View, TouchableOpacity, Image } from 'react-native'

// criando o contexto para compartilhar o estado entre os componentes
const ResultadoContext = createContext(null)

// importacao do arquivo de estilos
import styles from './styles'

// importacao das imagens
import pedra from '../assets/pedra.png'
import papel from '../assets/papel.png'
import tesoura from '../assets/tesoura.png'

export default function App() {
	const [resultado, setResultado] = useState('')

	return (
		<ResultadoContext.Provider value={{ setResultado }}>
			<View style={styles.container}>
				<Text style={styles.title}>Pedra, Papel e Tesoura</Text>
				<View style={styles.imageContainer}>
					<Button escolha='pedra' imageSource={pedra} />
					<Button escolha='papel' imageSource={papel} />
					<Button escolha='tesoura' imageSource={tesoura} />
				</View>
				<Text style={styles.subtitle}>Escolha sua jogada</Text>
				<Text style={styles.result}>{resultado}</Text>
				<StatusBar style='auto' />
			</View>
		</ResultadoContext.Provider>
	)
}

function Button({ escolha, imageSource }) {
	const { setResultado } = useContext(ResultadoContext)

	function _handlePress() {
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
		<TouchableOpacity style={styles.button} onPress={_handlePress}>
			<Image source={imageSource} style={styles.image} />
		</TouchableOpacity>
	)
}

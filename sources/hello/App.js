import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native'

// importacao das imagens
import pedra from './assets/pedra.png'
import papel from './assets/papel.png'
import tesoura from './assets/tesoura.png'

export default function App() {
	function handlePress(jogada) {
		Alert.alert('Jogada', `Você escolheu ${jogada}`)
	}

	return (
		<View style={styles.container}>
			<Text style={{ fontSize: 24, fontWeight: 'bold' }}>Pedra, Papel e Tesoura</Text>
			<Text style={{ fontSize: 18 }}>Escolha sua jogada</Text>

			<View style={{ flexDirection: 'row', gap: 16 }}>
				<TouchableOpacity onPress={() => handlePress('pedra')}>
					<Image source={pedra} style={styles.imagem} />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => handlePress('papel')}>
					<Image source={papel} style={styles.imagem} />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => handlePress('tesoura')}>
					<Image source={tesoura} style={styles.imagem} />
				</TouchableOpacity>
			</View>
			<StatusBar style='auto' />
		</View>
	)
}

const styles = StyleSheet.create({
	imagem: {
		height: 120,
		width: 120,
	},
	quadrado: {
		height: 100,
		width: 100,
		borderRadius: 50,
	},
	container: {
		flex: 1,
		gap: 16,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
	},
})

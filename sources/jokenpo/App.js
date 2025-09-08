import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'

export default function App() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>JOKENPO</Text>
			<View style={styles.containerButtons}>
				<TouchableOpacity>
					<Image style={styles.imageButtons} source={require('./assets/pedra.png')} />
				</TouchableOpacity>
				<TouchableOpacity>
					<Image style={styles.imageButtons} source={require('./assets/papel.png')} />
				</TouchableOpacity>
				<TouchableOpacity>
					<Image style={styles.imageButtons} source={require('./assets/tesoura.png')} />
				</TouchableOpacity>
			</View>
			<Text style={styles.texto}>Escolha sua jogada</Text>
			<Text style={styles.resultado}>Resultado da jogada</Text>
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

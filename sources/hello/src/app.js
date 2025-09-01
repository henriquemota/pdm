import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button, Alert } from 'react-native'

export default function App() {
	return (
		<View style={styles.container}>
			<Text>Ola mundo</Text>
			<Button title='Clique aqui' onPress={() => Alert.alert('Atenção', 'Voce clicou no botao!')} />
			<StatusBar style='auto' />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})

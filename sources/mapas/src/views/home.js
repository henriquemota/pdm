import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { TextInput } from 'react-native-paper'
import MapView, { Marker } from 'react-native-maps'
import axios from 'axios'

// importando os dados
export default function Home() {
	const URL = 'https://cep.awesomeapi.com.br/json/'
	const [cep, setCep] = useState('')
	const [loading, setLoading] = useState(false)
	const [coordenada, setCoordenada] = useState({})
	const initialRegion = {
		latitude: -3.7617664,
		longitude: -38.4958464,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	}

	useEffect(() => {
		if (cep.length === 8) {
			axios
				.get(URL + cep)
				.then(({ data }) => {
					// setDados(data)
					// console.log(data)
					const { lat, lng } = data
					setCoordenada({
						latitude: Number(lat),
						longitude: Number(lng),
					})
				})
				.catch((e) => {
					// setDados(undefined)
					setCoordenada({})
				})
			// .finally(() => console.log('Sempre por aqui'))
		}
	}, [cep])

	return (
		<View style={styles.container}>
			<TextInput onChangeText={setCep} />
			<MapView
				style={{ flex: 1 }}
				initialRegion={initialRegion}
				region={
					'latitude' in coordenada
						? {
								...initialRegion,
								latitude: coordenada.latitude,
								longitude: coordenada.longitude,
						  }
						: initialRegion
				}
			>
				{'latitude' in coordenada && (
					<Marker
						title='poderia ser qualquer coisa'
						coordinate={{ latitude: coordenada.latitude, longitude: coordenada.longitude }}
					/>
				)}
			</MapView>
			<StatusBar style='auto' />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
	},
})

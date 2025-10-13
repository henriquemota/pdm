import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, Dimensions, Button } from 'react-native'
import { Searchbar } from 'react-native-paper'
import MapView, { Marker } from 'react-native-maps'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

export default function Home() {
	const URL = 'https://cep.awesomeapi.com.br/json/'
	const [loading, setLoading] = useState(false)
	const [cep, setCep] = useState('')
	const [dados, setDados] = useState()
	const [coordenada, setCoordenada] = useState({})

	// Dimenssões da tela
	const { width } = Dimensions.get('window')

	// Declara a navegacao
	const { navigate } = useNavigation()

	// região inicial do mapa
	const initialRegion = {
		latitude: -3.7617664,
		longitude: -38.4958464,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	}

	// trabalhando com hook de efeito
	useEffect(() => {
		if (cep.length === 8) {
			setLoading(true)
			axios
				.get(`${URL}${cep}`)
				.then(({ data }) => {
					// promise resolvida
					setDados(data)
					setCoordenada({
						...coordenada,
						latitude: Number(data.lat),
						longitude: Number(data.lng),
					})
				})
				.catch((error) => {
					setDados(undefined)
					console.error(error)
				})
				.finally(() => {
					setLoading(false)
				})
		}
	}, [cep])

	return (
		<View style={styles.container}>
			<View style={{ flexDirection: 'row' }}>
				<Searchbar
					style={{ width: width - 100 }}
					loading={loading}
					placeholder='Digite o CEP'
					maxLength={8}
					onChangeText={setCep}
				/>
				<Button onPress={() => navigate('Enderecos')} style={{ width: 100 }} title='Listar endereços' />
			</View>
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
						title={`Nome da Rua: ${dados.address_name}`}
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

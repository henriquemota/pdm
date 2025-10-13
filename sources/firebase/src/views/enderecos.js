import { useState, useEffect } from 'react'
import { View, Button, Alert, ActivityIndicator, FlatList } from 'react-native'
import { TextInput, Text } from 'react-native-paper'
import axios from 'axios'
import { db } from '../services/_firebase'
import { ref, set, get, child } from 'firebase/database'

const Enderecos = () => {
	const baseUrl = 'https://dispositivosmoveis2025-default-rtdb.firebaseio.com/enderecos.json'
	// estados dos campos
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [rua, setRua] = useState('')
	const [numero, setNumero] = useState('')
	const [bairro, setBairro] = useState('')
	const [cidade, setCidade] = useState('')
	const [estado, setEstado] = useState('')

	const _handleSave = () => {
		setLoading(true)
		axios
			.post(baseUrl, { rua, numero, bairro, cidade, estado })
			.then(() => {
				setRua('')
				setNumero('')
				setBairro('')
				setCidade('')
				setEstado('')
				Alert.alert('Aviso', 'Endereço salvo com sucesso!')
			})
			.catch((error) => {
				Alert.alert('Erro', 'Erro ao cadastrar o endereço!')
				console.log(error)
			})
			.finally(() => setLoading(false))
	}

	const _handleSaveFb = () => {
		setLoading(true)
		const data = new Date()
		const id = `${data.getUTCFullYear()}${data.getUTCMonth()}${data.getUTCDay()}${data.getUTCMinutes()}${data.getUTCMilliseconds()}`
		set(ref(db, `enderecos/${id}`), {
			rua,
			numero,
			bairro,
			cidade,
			estado,
		})
			.then(() => {
				setRua('')
				setNumero('')
				setBairro('')
				setCidade('')
				setEstado('')
				Alert.alert('Aviso', 'Endereço salvo com sucesso!')
			})
			.catch((error) => {
				Alert.alert('Erro', 'Erro ao cadastrar o endereço!')
				console.log(error)
			})
			.finally(() => setLoading(false))
	}

	const _readData = () => {
		const dbRef = ref(db)
		get(child(dbRef, 'enderecos/'))
			.then((snapshot) => {
				if (snapshot.exists()) {
					const val = snapshot.val()
					setData(Object.entries(val).map(([id, item]) => ({ id, ...item })))
				} else {
					setData([])
				}
			})
			.catch((error) => {
				console.error(error)
			})
	}

	useEffect(() => {
		_readData()
	}, [, _handleSaveFb])

	return (
		<View style={{ gap: 16 }}>
			<TextInput label='Rua' value={rua} onChangeText={setRua} />
			<TextInput label='Número' value={numero} onChangeText={setNumero} />
			<TextInput label='Bairro' value={bairro} onChangeText={setBairro} />
			<TextInput label='Cidade' value={cidade} onChangeText={setCidade} />
			<TextInput label='Estado' value={estado} onChangeText={setEstado} />

			<Button onPress={_handleSaveFb} title='Salvar' />
			<ActivityIndicator animating={loading} size='large' />
			<FlatList
				data={data}
				renderItem={({ item }) => (
					<View style={{ borderWidth: 1, margin: 4, borderRadius: 4, gap: 2, padding: 8 }}>
						<Text>
							{item.rua}, {item.numero} - {item.bairro}
						</Text>
						<Text>
							{item.cidade} - {item.estado}
						</Text>
					</View>
				)}
				keyExtractor={(item) => item.id}
			/>
		</View>
	)
}

export { Enderecos }
export default Enderecos

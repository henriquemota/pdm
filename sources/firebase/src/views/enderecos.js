import { useState } from 'react'
import { View, Button, Alert, ActivityIndicator } from 'react-native'
import { TextInput } from 'react-native-paper'
import axios from 'axios'
import { db } from '../services/_firebase'
import { ref, set } from 'firebase/database'

const Enderecos = () => {
	const baseUrl = 'https://dispositivosmoveis2025-default-rtdb.firebaseio.com/enderecos.json'
	// estados dos campos
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

	return (
		<View style={{ gap: 16 }}>
			<TextInput label='Rua' value={rua} onChangeText={setRua} />
			<TextInput label='Número' value={numero} onChangeText={setNumero} />
			<TextInput label='Bairro' value={bairro} onChangeText={setBairro} />
			<TextInput label='Cidade' value={cidade} onChangeText={setCidade} />
			<TextInput label='Estado' value={estado} onChangeText={setEstado} />

			<Button onPress={_handleSaveFb} title='Salvar' />
			<ActivityIndicator animating={loading} size='large' />
		</View>
	)
}

export { Enderecos }
export default Enderecos

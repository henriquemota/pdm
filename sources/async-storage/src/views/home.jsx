import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Home = () => {
	const { setItem, getItem } = AsyncStorage
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState({ message: '', secret: '' })

	const _gravar = async () => {
		setLoading(true)
		try {
			await setItem('secret', data.secret)
			setData({ ...data, message: 'Dados gravados com sucesso' })
		} catch (error) {
			console.log('Erro ao gravar', error)
			setData({ ...data, message: 'Erro ao gravar os dados' })
		} finally {
			setLoading(false)
		}
	}

	const _ler = async () => {
		setLoading(true)
		try {
			const valor = await getItem('secret')
			setData({ ...data, message: valor || 'Nenhum valor encontrado' })
		} catch (error) {
			console.log('Erro ao ler os dados', error)
			setData({ ...data, message: 'Erro ao ler os dados' })
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		_ler()
	}, [])

	return (
		<View style={{ gap: 8, padding: 8 }}>
			<TextInput
				label='Informe a chave secreta'
				secureTextEntry
				value={data.secret}
				onChangeText={(text) => setData({ ...data, secret: text })}
			/>
			<Button mode='contained' onPress={_gravar} loading={loading}>
				Gravar
			</Button>
			<Button mode='contained' onPress={_ler} loading={loading}>
				Ler
			</Button>
			<StatusBar style='auto' />
			<Text>{data.message}</Text>
		</View>
	)
}

export default Home
export { Home }

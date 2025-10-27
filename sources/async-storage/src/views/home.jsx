import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as FileSystem from 'expo-file-system'
import * as DocumentPicker from 'expo-document-picker'

const Home = () => {
	const { setItem, getItem } = AsyncStorage
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState({ message: '', secret: '' })

	const fileUri = FileSystem.documentDirectory + 'meuArquivo.txt'

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

	const _lerDiretorios = async () => {
		try {
			const { assets = null, canceled = false } = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true })
			if (!canceled) {
				const conteudo = await FileSystem.readAsStringAsync(fileUri)
				// const conteudo = await FileSystem.readAsStringAsync(assets[0].uri)
				console.log(conteudo)
			}
			const conteudo = await FileSystem.readAsStringAsync(fileUri)
			console.log(conteudo)
		} catch (error) {
			console.error(error)
		}
	}

	const _criarArquivo = async () => {
		try {
			await FileSystem.writeAsStringAsync(fileUri, 'Olá, mundo! Este é um teste.')
			console.log('Arquivo criado com sucesso')
		} catch (error) {
			console.error('Erro ao criar arquivo:', error)
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
			<Button mode='contained' onPress={_lerDiretorios} loading={loading}>
				Abrir arquivos
			</Button>
			<Button mode='contained' onPress={_criarArquivo} loading={loading}>
				Criar arquivo
			</Button>
			<StatusBar style='auto' />
			<Text>{data.message}</Text>
		</View>
	)
}

export default Home
export { Home }

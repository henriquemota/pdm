import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, FlatList, Alert } from 'react-native'
import { Text, Button, TextInput } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as FileSystem from 'expo-file-system'
import * as SecureStore from 'expo-secure-store'

export default function App() {
	const [files, setFiles] = useState([])
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState({ chave: '', palavra: '', arquivo: 'meu_arquivo' })
	const { getItem, setItem, clear, multiGet } = AsyncStorage

	const fileUri = FileSystem.documentDirectory + `${data.arquivo}.txt`

	useEffect(() => {
		_lerDiretorios()
	}, [])

	async function _saveSecureStore() {
		setLoading(true)
		try {
			await SecureStore.setItemAsync(data.chave, data.palavra)
		} catch (error) {
			console.error('Erro ao salvar no SecureStore:', error)
		} finally {
			setLoading(false)
		}
	}

	async function _getValueFor() {
		let result = await SecureStore.getItemAsync(data.chave)
		if (result) {
			Alert.alert("🔐 Here's your value 🔐 \n" + result)
		} else {
			Alert.alert('No values stored under that key.')
		}
	}

	const _gravar = async () => {
		try {
			setLoading(true)
			await setItem(data.chave, data.palavra)
			await _lerDiretorios()
		} catch (error) {
			console.log('Erro ao gravar:', error)
		} finally {
			setLoading(false)
		}
	}

	const _recuperar = async () => {
		try {
			setLoading(true)
			const result = await getItem(data.chave)
			console.log('Recuperado:', result)
		} catch (error) {
			console.log('Erro ao recuperar:', error)
		} finally {
			setLoading(false)
		}
	}

	const _limpar = async () => {
		try {
			setLoading(true)
			await clear()
			await _lerDiretorios()
		} catch (error) {
			console.log('Erro ao recuperar:', error)
		} finally {
			setLoading(false)
		}
	}

	const _lerDiretorios = async () => {
		setLoading(true)
		FileSystem.readDirectoryAsync(FileSystem.documentDirectory)
			.then((files) => {
				setFiles(files)
			})
			.catch((error) => {
				console.error('Erro ao ler o diretório de documentos:', error)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	const _criarArquivo = async () => {
		try {
			await FileSystem.writeAsStringAsync(fileUri, 'Olá, mundo! Este é um teste.')
			await _lerDiretorios()
		} catch (error) {
			console.error('Erro ao criar arquivo:', error)
		}
	}

	const _removerArquivo = async (filename) => {
		try {
			await FileSystem.deleteAsync(FileSystem.documentDirectory + filename)
			await _lerDiretorios()
		} catch (error) {
			console.error('Erro ao remover arquivo:', error)
		}
	}

	return (
		<View style={{ gap: 8, padding: 8, flex: 1 }}>
			<TextInput
				onChangeText={(t) => setData({ ...data, arquivo: t })}
				value={data.arquivo}
				label='Arquivo'
				mode='outlined'
			/>
			<TextInput
				onChangeText={(t) => setData({ ...data, chave: t })}
				value={data.chave}
				label='Chave secreta'
				mode='outlined'
			/>
			<TextInput
				onChangeText={(t) => setData({ ...data, palavra: t })}
				value={data.palavra}
				label='Palavra secreta'
				mode='outlined'
			/>
			<Button mode='contained' onPress={_saveSecureStore} loading={loading}>
				Secure Store Save
			</Button>
			<Button mode='contained' onPress={_getValueFor} loading={loading}>
				Secure Store Restore
			</Button>
			<Button mode='contained' onPress={_gravar} loading={loading}>
				Enviar
			</Button>
			<Button mode='contained' onPress={_recuperar} loading={loading}>
				Recuperar
			</Button>
			<Button mode='contained' onPress={_limpar} loading={loading}>
				Limpar
			</Button>

			<Button mode='contained' onPress={_criarArquivo} loading={loading}>
				Criar arquivo
			</Button>

			<Button mode='contained' onPress={_lerDiretorios} loading={loading}>
				Ler diretorios
			</Button>

			<Text>{JSON.stringify(data)}</Text>

			<FlatList
				horizontal={false}
				data={files}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => (
					<Button onPress={() => _removerArquivo(item)} mode='outlined' style={{ padding: 2, margin: 2 }}>
						{item}
					</Button>
				)}
			/>
		</View>
	)
}

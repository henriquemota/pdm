import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, Dimensions, Alert, FlatList } from 'react-native'
import { Button, TextInput, Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import useAgenda from '../hooks/agenda'

export default function Home() {
	const [data, setData] = useState({ nome: '', telefone: '' })
	const [contatos, setContatos] = useState([])
	const { width } = Dimensions.get('window')
	const { navigate } = useNavigation()
	const { initDB, insert, read } = useAgenda()

	useEffect(() => {
		initDB()
		setContatos(read())
	}, [])

	return (
		<View style={styles.container}>
			<TextInput value={data.nome} onChangeText={(text) => setData({ ...data, nome: text })} />
			<TextInput value={data.telefone} onChangeText={(text) => setData({ ...data, telefone: text })} />
			<View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center' }}>
				<Button
					mode='outlined'
					onPress={() => {
						insert(data)
						setData({ nome: '', telefone: '' })
						setContatos(read())
					}}
				>
					Inserir
				</Button>
				<Button mode='outlined' onPress={() => console.log('listar')}>
					Listar
				</Button>
			</View>

			<FlatList
				data={contatos}
				renderItem={({ item }) => (
					<View>
						<Text>
							{item.nome} - {item.telefone}
						</Text>
					</View>
				)}
				keyExtractor={(item) => item.id}
			/>

			<StatusBar style='auto' />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 16,
		backgroundColor: '#fff',
		padding: 8,
	},
})

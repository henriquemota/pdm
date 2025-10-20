import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, Dimensions, Alert } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'

// importar a biblioteca do SQLite
import * as SQLite from 'expo-sqlite'

export default function Home() {
	const [data, setData] = useState({ nome: '', telefone: '' })
	// Dimenssões da tela
	const { width } = Dimensions.get('window')
	// Declara a navegacao
	const { navigate } = useNavigation()

	const initDB = async () => {
		try {
			const db = await SQLite.openDatabaseAsync('mydb.db')
			await db.execAsync(`
        CREATE TABLE IF NOT EXISTS contatos (
          id INTEGER PRIMARY KEY NOT NULL, 
          nome TEXT NOT NULL,
          telefone TEXT NOT NULL
        );
			`)
			console.log('banco de dados criado com sucesso')
		} catch (error) {
			console.log('erro ao criar banco de dados')
		}
	}
	// insere os dados no banco de dados
	const insertData = async () => {
		let db = undefined
		try {
			db = await SQLite.openDatabaseAsync('mydb.db')
			await db.runAsync('INSERT INTO contatos (nome, telefone) VALUES (?,?)', [data.nome, data.telefone])
			setData({ nome: '', telefone: '' })
			Alert.alert('Atenção', 'Dados inseridos com sucesso.')
		} catch (error) {
			console.log(error)
		} finally {
			if (db) db.closeAsync()
		}
	}
	// lê os dados do banco de dados
	const readData = async () => {
		let db = undefined
		try {
			db = await SQLite.openDatabaseAsync('mydb.db')
			const allRows = await db.getAllAsync('SELECT * FROM contatos;')
			setContatos(allRows)
			// for (const row of allRows) {
			// 	console.log(row.id, row.nome, row.telefone)
			// }
		} catch (error) {
			setContatos([])
			console.log(error)
		} finally {
			if (db) db.closeAsync()
		}
	}
	// remove os dados no banco de dados
	const deleteData = async (id) => {
		let db = undefined
		try {
			db = await SQLite.openDatabaseAsync('mydb.db')
			await db.runAsync('DELETE FROM contatos WHERE id = ?', [id])
			// Alert.alert('Atenção', 'Dados inseridos com sucesso.')
		} catch (error) {
			console.log(error)
		} finally {
			if (db) db.closeAsync()
		}
	}

	useEffect(() => {
		initDB()
	}, [])

	return (
		<View style={styles.container}>
			<View>
				<TextInput value={data.nome} onChangeText={(text) => setData({ ...data, nome: text })} />
				<TextInput value={data.telefone} onChangeText={(text) => setData({ ...data, telefone: text })} />
				<Button mode='outlined' onPress={insertData}>
					Inserir
				</Button>
				<Button mode='outlined' onPress={() => console.log('listar')}>
					Listar
				</Button>
			</View>

			<StatusBar style='auto' />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		padding: 8,
	},
})

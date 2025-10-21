import * as SQLite from 'expo-sqlite'

const useAgenda = () => {
	const initDB = () => {
		let db = undefined
		try {
			db = SQLite.openDatabaseSync('mydb.db')
			db.execSync(`
        CREATE TABLE IF NOT EXISTS contatos (
          id INTEGER PRIMARY KEY NOT NULL, 
          nome TEXT NOT NULL,
          telefone TEXT NOT NULL
        );
      `)
			console.log('iniciou o banco')
		} catch (error) {
			console.log(error)
		} finally {
			if (db) db.closeSync()
		}
	}
	const insert = ({ nome, telefone }) => {
		let db = undefined
		try {
			db = SQLite.openDatabaseSync('mydb.db')
			db.runSync('INSERT INTO contatos (nome, telefone) VALUES (?,?)', [nome, telefone])
			console.log('dados inseridos com sucesso')
		} catch (error) {
			console.log(error)
		} finally {
			if (db) db.closeSync()
		}
	}
	const read = () => {
		let db = undefined
		try {
			db = SQLite.openDatabaseSync('mydb.db')
			const allRows = db.getAllSync('SELECT * FROM contatos;')
			return allRows
		} catch (error) {
			console.log(error)
		} finally {
			if (db) db.closeSync()
		}
	}
	const remove = (id) => {
		let db = undefined
		try {
			db = SQLite.openDatabaseSync('mydb.db')
			db.runSync('DELETE FROM contatos WHERE id = ?', [id])
		} catch (error) {
			console.log(error)
		} finally {
			if (db) db.closeSync()
		}
	}

	return {
		initDB,
		insert,
		read,
		remove,
	}
}

export { useAgenda }
export default useAgenda

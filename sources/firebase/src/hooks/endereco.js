import { db } from '../services/_firebase'
import { ref, set, get, child } from 'firebase/database'

const useEndereco = () => {
	const enderecoRef = ref(db)
	const documento = 'enderecos/'

	const create = async (data) => {
		set(enderecoRef, documento, { ...data })
	}
	const update = () => {}
	const remove = () => {}
	const list = async () => {
		return get(child(enderecoRef, documento)).then((snapshot) => {
			if (snapshot.exists()) {
				const val = snapshot.val()
				const data = Object.entries(val).map(([id, item]) => ({ id, ...item }))
				return data
			} else {
				return []
			}
		})
	}

	return {
		create,
		update,
		remove,
		list,
	}
}

export default useEndereco
export { useEndereco }

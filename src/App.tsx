import { useState } from 'react'
import { Container, Area, Header } from './App.styles'
import { Item } from './types/Item'
import { ListItem } from './components/ListItem'
import { AddArea } from './components/AddArea'

const App = () => {
	const [list, setList] = useState<Item[]>([
		{ id: 1, name: 'Estudar JavaScript', done: true },
		{ id: 2, name: 'Estudar TypeScript', done: false },
		{ id: 3, name: 'Estudar React', done: false },
	])

	const handleAddTask = (taskName: string) => {
		let newList = [
			...list,
			{ id: list.length + 1, name: taskName, done: false },
		]
		setList(newList)
	}

	return (
		<Container>
			<Area>
				<Header>Lista de Tarefas</Header>
				<AddArea onEnter={handleAddTask} />
				{list.map((item, index) => (
					<ListItem key={index} item={item} />
				))}
			</Area>
		</Container>
	)
}

export default App

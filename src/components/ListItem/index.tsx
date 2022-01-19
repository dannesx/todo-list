import { useState } from 'react'
import { Item } from '../../types/Item'
import { Container } from './styles'

type Props = {
	item: Item
}

export const ListItem = ({ item }: Props) => {
	const [isChecked, setIsChecked] = useState(item.done)

	return (
		<Container done={isChecked}>
			<input
				type="checkbox"
				checked={isChecked}
				onChange={() => setIsChecked(!isChecked)}
			/>
			<label>{item.name}</label>
		</Container>
	)
}

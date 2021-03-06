import styled from 'styled-components'

type ContainerProps = {
	done: boolean
}

export const Container = styled.div(
	({ done }: ContainerProps) => `
   display: flex;
   background: #20212c;
   padding: 10px;
   border-radius: 10px;
   margin-bottom: 10px;
   align-items: center;
   gap: 8px;

   input {
      width: 20px;
      height: 20px;
   }

   label {
      color: ${done ? '#444' : '#ccc'};
      text-decoration: ${done ? 'line-through' : 'initial'};
   }
   `
)

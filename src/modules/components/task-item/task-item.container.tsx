import React from 'react'
import { TaskItemComponent } from './task-item.component'
import { Task } from '../../../common/types'

//Aqui se hará la query

interface TaskItemProps {
  
}


export const TaskItem : React.FC<TaskItemProps> = () => {
  const data : Task = {id: 0, title: 'Titulo', description: 'Esto en una simple descripcion', isChecked: true}
  return (<TaskItemComponent data={data}/>)
}
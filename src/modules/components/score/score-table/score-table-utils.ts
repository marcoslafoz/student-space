import { ChipProps } from '@nextui-org/react'

export const columns = [
  { name: 'Nombre', uid: 'name', sortable: true },
  { name: 'Fecha', uid: 'date', sortable: true },
  { name: 'Nota', uid: 'score', sortable: true },
  { name: 'Estado', uid: 'status', sortable: true },
  { name: 'Asignatura', uid: 'subject', sortable: true },
  { name: 'Curso', uid: 'course', sortable: true },
  { name: 'Acciones', uid: 'actions' },
]

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const DEFAULT_INITIAL_VISIBLE_COLUMNS = ['name', 'status', 'actions', 'date', 'score', 'course', 'subject']

export const statusColorMap: Record<string, ChipProps['color']> = {
  1: 'success',
  2: 'danger',
}

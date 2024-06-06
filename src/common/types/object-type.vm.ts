export enum objectTypeEnum {
  TASK = 'TASK',
  DOCUMENT = 'DOCUMENT',
  EVENT = 'EVENT',
}

export interface SelectItem {
  label: string
  value: number
}

export interface ModalForm {
  isOpen: boolean
  onClose: () => void
  onRefetch: () => void
  lockCourseId?: number
  lockSubjectId?: number
}

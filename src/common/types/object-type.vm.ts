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
  defaultCourseId?: number
  defaultSubjectId?: number
  isSubjectIdLocked?: boolean
  isCourseIdLocked?: boolean
}

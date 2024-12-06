import { Subject } from './subject.vm'

export interface Document {
  id: number
  title: string
  body: string
  subject: Subject
}

export enum SlideDirectionEnum {
  RIGHT = 'right',
  LEFT = 'left',
}

export const slideTime: number = 5000

export interface DemoSection {
  image: string
  title: string
  description: string
}

export const demoData: DemoSection[] = [
  {
    image: '/assets/landing/tasks.webp',
    title: 'Planifica tus tareas sin complicaciones',
    description: 'Gestiona tus tareas de forma rápida y sencilla. Prioriza, programa y cumple tus tareas a tiempo.',
  },
  {
    image: '/assets/landing/documents.webp',
    title: 'Edita y guarda tus documentos al instante',
    description:
      'Crea y edita tus documentos con nuestro editor integrado. Tu trabajo se sincroniza automáticamente para que nunca pierdas ningún avance.',
  },
  {
    image: '/assets/landing/events.webp',
    title: 'Gestiona tus eventos y exámenes fácilmente',
    description:
      'Organiza tus exámenes, actividades y eventos importantes con facilidad, asegurándote de no perder nunca un plazo o cita importante.',
  },
  {
    image: '/assets/landing/scores.webp',
    title: 'Almacena tus notas y resultados',
    description:
      'Almacena y gestiona tus notas y resultados para consultarlos donde y cuando quieras. Realiza tus cálculos, medias, porcentajes y mucho más.',
  },
]

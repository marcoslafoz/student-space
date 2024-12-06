export const htmlTitle = (title: string): string => {
  if (title.trim() == '') return 'Sin titulo - StudentSpace'

  return `${title.substring(0, 15)} - StudentSpace`
}

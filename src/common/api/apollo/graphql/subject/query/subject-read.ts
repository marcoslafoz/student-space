import { gql, LazyQueryHookOptions, QueryHookOptions, useLazyQuery, useQuery } from '@apollo/client'
import { SUBJECT_READ_FIELDS } from '../../../fragments'
import { Subject } from '../../../../../types'

const SUBJECT_READ = gql`
  ${SUBJECT_READ_FIELDS}
  query subjectRead($subjectId: ID!, $userId: ID!) {
    subjectRead(subjectId: $subjectId, userId: $userId) {
      ...SubjectReadFields
    }
  }
`

interface SubjectReadData {
  subjectRead: Subject
}

interface SubjectReadVars {
  subjectId: number
  userId: number
}

export const useSubjectReadLazyQuery = (options?: LazyQueryHookOptions<SubjectReadData, SubjectReadVars>) => {
  return useLazyQuery<SubjectReadData, SubjectReadVars>(SUBJECT_READ, {
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    ...options,
  })
}

export const useSubjectReadQuery = (options?: QueryHookOptions<SubjectReadData, SubjectReadVars>) => {
  return useQuery<SubjectReadData, SubjectReadVars>(SUBJECT_READ, {
    errorPolicy: 'all',
    fetchPolicy: 'no-cache',
    ...options,
  })
}

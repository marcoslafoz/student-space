import React from 'react'
import { useRouteError } from 'react-router'

export const ErrorScene: React.FC = () => {

  const error = useRouteError()
  console.error(error)

  return (
    <>
      <div id="error-page">
        <h1>Oops!</h1>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </>
  )
}


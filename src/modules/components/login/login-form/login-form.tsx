import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LoginForm } from './login-form.vm'
import { Button, Input } from '@nextui-org/react'
import { useLoginFindUsernameLazyQuery, useLoginLazyQuery } from '../../../../common/api/apollo/graphql/login'
import { isAuthenticated } from '../../../../common/api/axios'
import { EyeFilledIcon, EyeSlashFilledIcon } from '../../base/nextui-icons'
import clsx from 'clsx'

export const LoginFormUsername: React.FC = () => {
  const { handleSubmit, register } = useForm<LoginForm>()

  const [loginFindUsername, { data, error }] = useLoginFindUsernameLazyQuery()

  const [isUsernameValid, setIsUsernameValid] = React.useState<boolean>(false)
  const [validUsername, setValidUsername] = React.useState<string>()
  const [usernameError, setUsernameError] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (data?.loginFindUsername) {
      setIsUsernameValid(true)
      setUsernameError(false)
    } else if (error || (data && !data.loginFindUsername)) {
      setUsernameError(true)
    }
  }, [data, error])

  const onUsernameSuccess: SubmitHandler<LoginForm> = values => {
    loginFindUsername({ variables: { username: values.username } }).then(() => {
      setValidUsername(values.username)
    }).catch(() => {
      setUsernameError(true)
    })
  }

  return (
    <>
      {!isUsernameValid && (
        <form onSubmit={handleSubmit(onUsernameSuccess)}>
          <div className='inline-flex gap-6'>
            <Input
              {...register('username', { required: true })}
              isRequired
              placeholder='Nombre de usuario'
              size='md'
              className={clsx('min-w-72', usernameError && 'username-input-error')}
              isInvalid={usernameError}
              onChange={() => setUsernameError(false)}
              errorMessage="Nombre de usuario inválido"
              data-test-id='login-username-input'
            />
            <Button isIconOnly type='submit' size='md' style={{ backgroundColor: '#191c1f' }} data-test-id='login-username-btn'  >
              <svg
                className='size-3.5'
                width='23'
                height='21'
                viewBox='0 0 23 21'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M21 10.5L12.8571 2M21 10.5L12.8571 19M21 10.5H2'
                  stroke='#F7F7F7'
                  strokeWidth='3'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </Button>
          </div>
        </form>
      )}
      {isUsernameValid && validUsername && <LoginPasswordForm username={validUsername} />}
    </>
  )
}

interface LoginPasswordFormProps {
  username: string
}

const LoginPasswordForm: React.FC<LoginPasswordFormProps> = props => {
  const { username } = props
  const { handleSubmit, register } = useForm<LoginForm>()
  const [login, { data, error }] = useLoginLazyQuery()
  const [isVisible, setIsVisible] = React.useState(false)
  const [passwordError, setPasswordError] = React.useState<boolean>(false)
  const toggleVisibility = () => setIsVisible(!isVisible)

  React.useEffect(() => {
    const handleLoginSuccess = async () => {
      if (data?.login) {
        localStorage.setItem('jwttoken', data.login)
        const authenticated = await isAuthenticated()
        if (authenticated) window.location.reload() 
      } else if (error || (data && !data.login)) {
        setPasswordError(true)
      }
    }
    handleLoginSuccess()
  }, [data, error])

  const onPasswordSuccess: SubmitHandler<LoginForm> = values => {
    login({
      variables: {
        username,
        password: values.password,
      },
    }).catch(() => {
      setPasswordError(true)
      localStorage.removeItem('jwttoken')
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit(onPasswordSuccess)}>
        <div className='inline-flex gap-6'>
          <Input
            placeholder='Contraseña'
            {...register('password', { required: true })}
            className={clsx('min-w-72', passwordError && 'password-input-error')}
            onChange={() => setPasswordError(false)}
            endContent={
              <button className='focus:outline-none' type='button' onClick={toggleVisibility}>
                {isVisible ? (
                  <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                ) : (
                  <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                )}
              </button>
            }
            type={isVisible ? 'text' : 'password'}
            isInvalid={passwordError}
            errorMessage="Contraseña inválida"
            data-test-id='login-password-input'
          />
          <Button isIconOnly type='submit' size='md' style={{ backgroundColor: '#191c1f' }} data-test-id='login-password-btn' >
            <svg
              className='size-5'
              width='31'
              height='31'
              viewBox='0 0 31 31'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M18.7552 3.03177C18.1538 3.13097 17.633 3.29837 17.0564 3.57117C15.3948 4.35237 14.2664 5.72257 13.7828 7.55777C13.6464 8.06617 13.6216 8.28937 13.6154 9.11397C13.6092 10.509 13.8634 11.5568 14.5268 12.8588L14.8368 13.4664L9.93879 18.3768C7.24179 21.0738 4.99119 23.3492 4.93539 23.436C4.81139 23.622 4.80519 24.0684 4.92299 24.2916C5.05939 24.5396 6.57839 26.0214 6.77679 26.102C7.04339 26.195 7.32239 26.1764 7.53319 26.0462C7.69439 25.947 10.3542 23.3182 16.1264 17.5708L17.5276 16.1758L18.2034 16.5106C19.4992 17.1616 20.4354 17.391 21.7932 17.3848C22.6736 17.3848 22.8534 17.3662 23.3866 17.2174C24.5646 16.895 25.3644 16.461 26.1518 15.7232C26.5982 15.3016 27.088 14.6444 27.3546 14.105C27.584 13.6524 27.8754 12.7286 27.9622 12.1892C28.0738 11.5196 28.0118 10.0936 27.8444 9.42397C27.181 6.80137 25.2652 4.58177 22.7852 3.56497C21.7994 3.15577 21.1794 3.03177 20.0572 3.00697C19.5116 2.99457 18.9288 3.00697 18.7552 3.03177ZM20.7826 6.85097C21.415 7.00597 22.2024 7.45857 22.779 7.99797C24.2174 9.33717 24.6948 11.3584 23.864 12.6108C23.213 13.5842 21.8366 13.9066 20.4726 13.4044C19.1892 12.927 17.974 11.687 17.54 10.416C17.354 9.85797 17.3106 8.95277 17.447 8.45677C17.8376 7.08657 19.152 6.45417 20.7826 6.85097Z'
                fill='#F7F7F7'
              />
              <path
                d='M10.5837 24.5954L8.5625 26.629L10.2303 28.303L11.9043 29.977L12.5553 29.326L13.2063 28.675L12.5553 28.024C12.1957 27.6644 11.9043 27.342 11.9043 27.311C11.9043 27.2738 12.2143 26.939 12.5863 26.567L13.2683 25.885L13.9503 26.567L14.6323 27.2428L15.2709 26.629C15.6305 26.288 15.9219 25.9842 15.9281 25.9532C15.9281 25.9222 15.1841 25.1472 14.2665 24.2296L12.5987 22.5618L10.5837 24.5954Z'
                fill='#F7F7F7'
              />
            </svg>
          </Button>
        </div>
      </form>
    </>
  )
}

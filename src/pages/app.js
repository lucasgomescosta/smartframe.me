import React, { useState, useEffect } from 'react'
import {Router} from '@reach/router'
import Layout from '../components/layout'
import {navigate} from 'gatsby'
import { useAuth} from '../lib/AuthContext'
import CreateScene from '../client-side-routes/app/CreateScene'
import Scenes from '../client-side-routes/app/Scenes'
import UpdatePassword from '../client-side-routes/app/UpdatePassword'
import Scene from '../client-side-routes/app/Scene'

const ShowEmailNotification = () => {
  const auth =  useAuth()
  const [emailSent, setEmailSent] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if(auth.isAuthReady && !auth.isAuth){
      navigate('/sign-in')
    }
  }, [auth])

  const resendEmailVerification = async() => {
    try {
      setError(false)
      await auth.resendEmailVerification()
      setEmailSent(true)
    } catch (err) {
      setError(true)
      setEmailSent(false)
    }
  }
  if(!auth.isAuthReady){
    return null
  }
  if(!auth.emailVerified){
    return (
      <div className='bg-orange-200 p-4'>
        <p className='container mx-auto text-center'>
          Please, confirm your email address ({auth.email}). <br />
    {!emailSent && <button onClick={resendEmailVerification}>Click here to resend email confirmation.</button> }
          {emailSent && <React.Fragment>
           <br/> Verification e-mail sent. Please, check your inbox and follow the instructions.
          </React.Fragment> }
          {error && <React.Fragment>
           <br/> Error, try again in few minutes.
          </React.Fragment> }
        </p>
      </div>  
    )
  }
  return null;
}

const App = () => {
  return (
      <Layout app>
        <ShowEmailNotification />
        <div className="container mx-auto mt-12">
          <Router basepath='/app'>
            <CreateScene path='/create-scene' />
            <Scenes path='/' />
            <Scene path='scene/:sceneId' />
            <UpdatePassword path='/update-password' />
          </Router>
        </div>  
      </Layout>
  )
}

export default App
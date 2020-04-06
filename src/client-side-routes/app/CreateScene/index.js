import React from 'react'
import { useAuth } from '../../../lib/AuthContext'

const CreateScene = () => {
  const auth = useAuth()
  return (
    <div>
      <h1>Create Scene</h1>
      <pre>{JSON.stringify(auth)}</pre>
    </div>  
  )
} 

export default CreateScene
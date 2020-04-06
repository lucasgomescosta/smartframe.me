import React, { useState, useEffect} from 'react'
import firebase from '../../../lib/firebase'
import { useAuth } from '../../../lib/AuthContext'

const FRAME_TYPES = {
  chromakey: {
    key:'chromakey',
    label: 'Add chromakey'
  },
  image: {
    key: 'image',
    label: 'Add image'
  },
}

const FrameComponents = {
  [FRAME_TYPES.chromakey.key]: ({id}) => <h1>Component: Chroma Key {id}</h1>,
  [FRAME_TYPES.image.key]: ({id}) => <h1>Component: Image {id}</h1>,
}

const Scene = ({ sceneId }) => {
  const auth = useAuth()
    const [scene, setScene] = useState({})
    const [frames, setFrames] = useState([])
    const db = firebase.firestore()
    useEffect(() => {
      if(auth.isAuthReady){
        db.collection('scenes').doc(auth.uid).collection('scenes').doc(sceneId).onSnapshot(querySnapshot => {
         setScene({
           ...querySnapshot.data(),
           id: sceneId
         })
        }) 

        db.collection('frames').doc(auth.uid).collection(sceneId).onSnapshot(querySnapshot => {
          const currentFrames = []
          querySnapshot.forEach(doc => {
            currentFrames.push({
              ...doc.data(),
              id: doc.id
            })
          })
          console.log(currentFrames)
          setFrames(currentFrames)
        }) 
      }
  }, [db, auth])
  const createFrame = (type) => () => {
    const newSceneRef = db.collection('frames').doc(auth.uid).collection(sceneId).doc()
    newSceneRef.set({
      type
    })
  }

  return ( 
    <div>
      <h1>{scene.name}</h1>
      <div className='grid grid-cols-3 gap-4'>
      {Object.keys(FRAME_TYPES).map(key => {
        return (
            <div key={key} onClick={createFrame(key)} className='text-center p-4 bg-write hover:bg-gray-100 h-32 w-32 shadow-md rounded flex items-end'>
              <p>{FRAME_TYPES[key].label}</p>
            </div>
        )}
      )}
      </div>
      <div>
        {
          frames.map(frame => {
            const CurrentComp = FrameComponents[frame.type]
            return <p> <CurrentComp id={frame.id} /> </p>
          })
        }
      </div>
      <pre>{JSON.stringify(frames, null, 2)}</pre>
    </div>  
  )
}

export default Scene
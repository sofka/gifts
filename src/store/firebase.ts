import { initializeApp } from 'firebase/app'
import { getDatabase, ref, get, child } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyARQaSuRhJOdzXfuY_xLZ3huWfTykm8Op8',
  authDomain: 'wishlist-44e18.firebaseapp.com',
  projectId: 'wishlist-44e18',
  storageBucket: 'wishlist-44e18.appspot.com',
  messagingSenderId: '450106109913',
  appId: '1:450106109913:web:49fd3509b3f1991408f3c8'
}

const app = initializeApp(firebaseConfig)
const dbRef = ref(getDatabase(app))
export const getAll = get(dbRef)
  .then(snapshot => {
    if (snapshot.exists()) {
      return snapshot.val()
    } else {
      console.log('No data available')
    }
  })
  .catch(error => {
    console.error(error)
  })

export const getById = (id: string) => {
  return get(child(dbRef, `${id}`))
    .then(snapshot => {
      if (snapshot.exists()) {
        return snapshot.val()
      } else {
        console.log('No data available')
      }
    })
    .catch(error => {
      console.error(error)
    })
}

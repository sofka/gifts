import 'normalize.css'
import Home from './routes/Home'
import { Routes, Route } from 'react-router-dom'
import WishList from './routes/WishList'

function App () {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route  path='/wishList/:id' element={<WishList />} />
        <Route  path='/wishList' element={<WishList />} />
      </Routes>
    </div>
  )
}

export default App

import { useState } from 'react'
import logo from './logo.svg'

import NavBar from './components/navbar/navbar'
import BucketView from './views/Transactions/Bucket/BucketView'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>
      <BucketView />
    </div>
  )
}

export default App

import { useState } from 'react'
import logo from './logo.svg'

import BucketView from './views/Transactions/Bucket/BucketView'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <nav>Nav bar go here</nav>
      </header>
      <BucketView />
    </div>
  )
}

export default App

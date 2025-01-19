
import './App.css'

import ContainerList from './components/body/ContainerList'


function App() {

  return (
    <>
    <div className='h-screen w-screen bg-black'>
      <div className='w-screen h-[10vh] flex items-center justify-center'>
        <h1 className='font-sans text-3xl font-bold' style={{color: 'yellow'}}>Rasberry Pi Docker Monitor</h1>
      </div>

      <div className='bg-saphire-blue w-screen h-[90vh] bg- flex items-center justify-center'>
        <ContainerList />
      </div>
    </div>
    </>
  )
}

export default App

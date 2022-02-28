import { BeaconProvider } from 'contexts/BeaconContext'
import React from 'react'

const Providers: React.FC = ({ children }) => {
  return (
    <BeaconProvider>
      { children }
    </BeaconProvider>
  )
}

export default Providers

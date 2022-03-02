import React from 'react'
import { BeaconProvider } from 'contexts/BeaconContext'
import { ToastsProvider } from 'contexts/ToastsContext'

const Providers: React.FC = ({ children }) => {
  return (
    <BeaconProvider>
      <ToastsProvider>
        { children }
      </ToastsProvider>
    </BeaconProvider>
  )
}

export default Providers

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function LoadingToRedirect() {
  const [count, setCount] = useState(5)
  const navigate = useNavigate()
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(cur => --cur)
    }, 1000)

    count === 0 && navigate('/login')

    return () => clearInterval(interval)
  }, [count, navigate])

  return (
    <div style={{marginTop: '100px', position: 'absolute', left: '50%', translate: '-50%' }}>
      <h5>Ridericting you in { count } second</h5>
    </div>
  )
}

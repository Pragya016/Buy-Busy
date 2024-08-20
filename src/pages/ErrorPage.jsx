import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ErrorPage() {
  const navigate = useNavigate();

  const containerStyles = {
    height: '75vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }

  return (
    <div style={containerStyles}>
      <img src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/error-500_f9bbb4.png" alt="" />
      <h4>Unfortunately, the page you're looking for has been moved or deleted</h4>
      <Button onClick={() => navigate('/')} variant='contained'>Go to Homepage</Button>
    </div>
  )
}

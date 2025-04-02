async function updateSubscriptionTypes() {
  try {
    const response = await fetch('http://localhost:3000/api/update-subscription-types', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    const data = await response.json()
    console.log('Réponse:', data)
  } catch (error) {
    console.error('Erreur:', error)
  }
}

updateSubscriptionTypes()

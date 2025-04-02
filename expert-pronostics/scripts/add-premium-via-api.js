async function addPremium() {
  try {
    const response = await fetch('http://localhost:3000/api/add-premium', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    const data = await response.json()
    console.log('Réponse complète:', JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('Erreur complète:', error)
  }
}

addPremium()

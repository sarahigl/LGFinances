document.getElementById('depenseForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    // Assurez-vous que la date est au format ISO
    data.date = new Date(data.date).toISOString();

    fetch('http://localhost:3000/api/formulaireDepense', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Succès:', data);
        alert('Dépense enregistrée avec succès !');
    })
    .catch((error) => {
        console.error('Erreur:', error);
        alert('Erreur lors de l\'enregistrement de la dépense');
    });
});
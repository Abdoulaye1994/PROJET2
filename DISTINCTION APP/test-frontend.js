const axios = require('axios');

async function testApi() {
    try {
        console.log('Test de la connexion à l\'API...');
        
        // Test de la route de base
        const helloResponse = await axios.get('http://yekpondafe-001-site1.ptempurl.com/api/hello');
        console.log('Test /api/hello:', helloResponse.data);

        // Test de l\'authentification
        const loginResponse = await axios.post('http://yekpondafe-001-site1.ptempurl.com/api/login', {
            username: 'test_user',
            password: 'test_password'
        });
        console.log('Test login:', loginResponse.data);

        // Test d\'une route protégée
        const authConfig = {
            headers: { 'Authorization': `Bearer ${loginResponse.data.token}` }
        };
        const usersResponse = await axios.get('http://yekpondafe-001-site1.ptempurl.com/api/users', authConfig);
        console.log('Test /api/users:', usersResponse.data);

        console.log('Tous les tests ont réussi !');

    } catch (error) {
        console.error('Erreur lors des tests:', error.response?.data || error.message);
    }
}

testApi();

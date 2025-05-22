const FEDAPAY_PUBLIC_KEY = 'pk_live_qSRmZ-uMwdt7l1uiNqptCZMz';
const FEDAPAY_API_URL = 'https://api.fedapay.com/v1';

export const createPayment = async (amount, currency = 'XOF', description = 'Paiement DISTINCTION') => {
  try {
    const response = await fetch(`${FEDAPAY_API_URL}/transactions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${FEDAPAY_PUBLIC_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount,
        currency: currency,
        description: description,
        metadata: {
          customer: 'DISTINCTION',
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la création du paiement');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la création du paiement:', error);
    throw error;
  }
};

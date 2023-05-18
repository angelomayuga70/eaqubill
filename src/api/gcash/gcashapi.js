import axios from 'axios';

export function payWithGcash(amount) {
  const data = {
    merchant_id: YOUR_MERCHANT_ID,
    amount: amount,
    currency: 'PHP',
    description: 'Payment for Vue project',
    email: 'angelomayuga70@gmail.com',
    mobile: "09278204051",
    redirect_url: YOUR_REDIRECT_URL,
  };
 
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa(YOUR_API_KEY:YOUR_SECRET_KEY)}`,
    }
  };

  return axios.post('https://pg-sandbox.paymaya.com/checkout/v1/checkouts', data, config)
    .then(response => {
      return response.data.redirect_url;
    })
    .catch(error => {
      console.error(error);
    });
}

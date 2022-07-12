require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json());

const YOUR_DOMAIN = 'http://localhost:8080';

const storeItems = new Map([
	[1, {priceInCents: 100, name: 'Óculos Claro'}],
	[2, {priceInCents: 200, name: 'Óculos Vermelho'}],
	[3, {priceInCents: 300, name: 'Óculos Azul'}],
])

app.post('/create-checkout-session', async (req, res) => {

  const storeItem = storeItems.get(req.body.id);

  const session = await stripe.checkout.sessions.create({
      line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price_data: {
	    currency: 'brl',
	    product_data : {
	        name: storeItem.name    
	    },
	    unit_amount: storeItem.priceInCents
	},
        quantity: req.body.quantity,
      },
    ],
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.json({url: session.url});
});

app.listen(8080, () => console.log('Running on port 8080'));

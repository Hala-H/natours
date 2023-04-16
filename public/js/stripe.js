/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51MxEVpDuByIZONfOlJroJVTZdtLYtirwRMxmg9aCsROW3KIeW9QLq5erELyzGymdu1dlpwgtOJC6eRDxSYe8aB6s008QfP62UF'
); // <==== PUT THE VARIABLE HERE

export const bookTour = async (tourId) => {
  try {
    // 1. Get checkout session from the API
    const session = await axios(
      `http://127.0.0.1:8000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2. Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};

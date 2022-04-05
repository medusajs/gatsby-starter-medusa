import React from 'react';

class RazorpayComponent extends React.Component {
   
  constructor(props){
      super(props);
      this.state={
        amount:0,
        processing:false
      }
      this.handleChange = this.handleChange.bind(this);
      this.openPayModal = this.openPayModal.bind(this);
      
      
  }
  
  loadComponent()
  {
     const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
  
  }

  async handleResponse(response,completeOrder,setErrorMessage,setProcessing) {
    console.log(response);
    await Promise.resolve(response).then
   .then(({ error, paymentIntent }) => {
    if (error) {
      const pi = error.payment_intent;

      if ((pi && pi.status === "requires_capture") ||
        (pi && pi.status === "captured")) {
        completeOrder();
      }

      setErrorMessage(error.message);
      setProcessing(false);
      return;
    }
    if ((paymentIntent && paymentIntent.status === "requires_capture") ||
      paymentIntent.status === "captured") {
      completeOrder();
    }
    return;
    
 })
}

  handleChange(evt){
      console.log(evt.target.value)
      this.setState({
        amount:evt.target.value
      })
    }

  async openPayModal(session,cart, completeOrder,setErrorMessage,setProcessing){
   
    var amount_to_be_paid = session.data.amount
    var amount = (amount_to_be_paid)>0?amount_to_be_paid* 100:0; //Razorpay consider the amount in paise
      var options = {
        "key": process.env.GATSBY_RAZORPAY_KEY,
        "amount": amount, // 2000 paise = INR 20, amount in paisa
        "name": process.env.GATSBY_SHOP_NAME,
        "description": process.env.GATSBY_SHOP_DESCRIPTION,
        "order_id":session.data.id,
        "currency":session.data.currency,
        "prefill":{
            "name":cart.billing_address.first_name + " "+ cart.billing_address.last_name,
            "email":cart.email,
            "contact":cart.shipping_address.phone
        },
        "notes": {
          "address": cart.billing_address,
          "order_notes":session.data.notes
        },
        "theme": {
          "color": 1234
        },
        "handler": async function (response) {console.log(response);
          
          if (response?.error??false) {
            const error = response.error
            console.log(error)
            setErrorMessage(error.description+";reason:"+error.reason);
            setProcessing(false);
            return;
          }
          else{
          completeOrder(response);
          }
          return;
          
       },
      }; 
      let rzp = new window.Razorpay(options);
      rzp.open();  
  };

}
  
 
export default RazorpayComponent;
import React from 'react';
import axios from "axios";
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

  handleResponse(response) {
    console.log(response);
    var values ={
        razorpay_signature : response.razorpay_signature,
        razorpay_order_id : response.razorpay_order_id,
        payment_id : response.razorpay_payment_id,
        amount : response.amount
      }
    return new Promise(paymentIntent=>(response))
    
 }

  handleChange(evt){
      console.log(evt.target.value)
      this.setState({
        amount:evt.target.value
      })
    }
  /*const openPayModal = () => {
      var rzp1 = new window.Razorpay(options);
      rzp1.open();
  };*/
  openPayModal(amt){
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    
    var amount = amt * 100; //Razorpay consider the amount in paise
      var options = {
        "key": process.env.GATSBY_RAZORPAY_KEY,
        "amount": amount, // 2000 paise = INR 20, amount in paisa
        "name": "",
        "description": "",
        'order_id':"",
        "prefill":{
            "name":"NONAME",
            "email":"EMAID",
            "contact":"0000000"
        },
        "notes": {
          "address": "Noclude"
        },
        "theme": {
          "color": 1234
        },
        "handler": this.handleResponse,
      };
      let rzp = new window.Razorpay(options);
      rzp.open();  
  };

}
  
 
export default RazorpayComponent;
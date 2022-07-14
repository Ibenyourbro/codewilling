import React, { useState } from 'react';
import Iben from '../images/Iben.jpg';
import CodeWilling from '../images/CodeWilling.jpg';
import { useSendOfferMutation } from './api/apiSlice';

const Offer = () => {
  //destructuring the useSendOfferMutation hook
  const [sendOffer, { data, isLoading, isSuccess, isError, error }] =
    useSendOfferMutation();
  const [offer, setOffer] = useState('');

  let ibensResponse;
  if (isLoading) {
    //loading we want to display something. Could add a spinner here.
    ibensResponse = <p>Hmmm...</p>;
  } else if (isSuccess) {
    //IF there is a resposne and counterOffer we want to display it this way.
    if (data.response && data.counterOffer) {
      ibensResponse = (
        <>
          <p className='p-2'>
            {data.response} {data.counterOffer}
          </p>
          <p className='pb-2'>How about a counter offer?</p>
        </>
      );
    } else if (data.response === 'Deal!') {
      //IF this is a deal we want to display it this way.
      ibensResponse = <p className='p-2'> {data.response} </p>;
    } else {
      //IF there is a response and no counterOffer we want to display it this way.
      ibensResponse = (
        <>
          <p className='p-2'> {data.response} </p>{' '}
          <p className='pb-2'>How about a counter offer?</p>
        </>
      );
    }
  } else if (isError) {
    // Checks the error msg from express validator
    if (error.data.errors[0].msg === 'Invalid value') {
      ibensResponse = (
        <p className='p-2'>{`Uh '${error.data.errors[0].value}' doesn't seem like an offer to me, please enter a number for me to consider.`}</p>
      );
    } else {
      //Just a normal error like the server is down or something.
      ibensResponse = <p>{error.error}</p>;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //send the offer to the server checking for an integer and removing any commas.
    //if no int we still send just to show off the error message.
    sendOffer(parseInt(offer.replaceAll(',', '')) || offer);
    setOffer('');
  };

  return (
    //Tailwind Stuff for CSS
    <div className='w-full  py-16 px-4'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
        <div className='border-purple-800 border-4 mr-5 rounded-xl'>
          <h1 className='text-center text-4xl px-12 pt-12 font-bold font-sans text-slate-100'>
            Iben
          </h1>
          <img
            src={Iben}
            alt=''
            className='w-auto h-60 mx-auto m-5 rounded-full'
          />
          <div className='text-center text-xl pt-0 font-bold font-sans  text-slate-100'>
            {ibensResponse || 'So what can you offer me?'}
          </div>
        </div>
        <div className='border-purple-800 border-4 mr-5 mt-5 md:mt-0 rounded-xl'>
          <h1 className='text-center text-4xl px-12 pt-12 font-bold font-sans text-slate-100'>
            Your Offer
          </h1>
          <img
            src={CodeWilling}
            alt=''
            className='w-auto h-60 mx-auto m-5 rounded-full'
          />
          <div className='text-center'>
            <form onSubmit={handleSubmit}>
              {/* Could add form validation here to make sure the input is a number before sending it to the server, but again wanted to try error handling with Redux Toolkit */}
              <input
                class='shadow appearance-none border rounded w-[25%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
                placeholder='100,000'
              />
              <button
                type='submit'
                onClick={handleSubmit}
                className='bg-violet-600 hover:bg-violet-900 text-white font-bold py-2 px-4 ml-3 mb-2 rounded'
              >
                Offer
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;

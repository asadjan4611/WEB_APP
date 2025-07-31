import React, { useState } from 'react'
import Header from '../component/layout/Header'
import styles from '../style/style'
import Footer from '../component/layout/Footer'
import {  AiOutlineForward } from 'react-icons/ai'

const FAQPage = () => {
  return (
    <div>
      <Header activeHeading={5}/>
      <Faq/>
       <Footer/>
    </div>
  )
}


const Faq =()=>{
  const [activeTab,setActiveTab] = useState(0);
    const toggleTab =(tab)=>{
        if (activeTab === tab) {
            setActiveTab(0);
        }else{
            setActiveTab(tab);
        }
    }
    return ( 
         <div className={`${styles.section} my-8`}>
          <h2 className='text-3xl font-semibold text-gray-900 pb-4'>
            FAQ
          </h2>

          <div className=" flex flex-col gap-3 max-auto space-y-4">
{/* first */}

             <div>

             
            <button 
            onClick={()=>toggleTab(2)}
            className='flex items-center justify-between w-full'>
               <span className='text-lg font-[400] text-gray-900'>
                How do I contact customer support?
               </span>


                {activeTab === 2 ? (
              <svg
                className="cursor-pointer h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 cursor-pointer w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
       

            </button>
                    {activeTab === 2 && (
            <div className="mt-4">
              <p className="text-base text-gray-500">
               You can contact our customer support team by emailing us at
                support@myecommercestore.com, or by calling us at (555) 123-4567
                between the hours of 9am and 5pm EST, Monday through Friday.
              </p>
            </div>
          )}
          </div>
{/* //second */}
   
             <div>

             
            <button 
            onClick={()=>toggleTab(2)}
            className='flex items-center justify-between w-full'>
               <span className='text-lg font-[400] text-gray-900'>
                How do I track my order?
               </span>


                {activeTab === 1 ? (
              <svg
                className="cursor-pointer h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 cursor-pointer w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
       

            </button>
                    {activeTab === 1 && (
            <div className="mt-4">
              <p className="text-base text-gray-500">
                You can track your order by clicking the tracking link in your
                shipping confirmation email, or by logging into your account on
                our website and viewing the order details.
              </p>
            </div>
          )}
          </div>

{/* //third */}
 <div>

             
            <button 
            onClick={()=>toggleTab(3)}
            className='flex items-center justify-between w-full'>
               <span className='text-lg font-[400] text-gray-900'>
                Can I change or cancel my order?
               </span>


                {activeTab === 3 ? (
              <svg
                className="cursor-pointer h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 cursor-pointer w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
       

            </button>
                    {activeTab === 3 && (
            <div className="mt-4">
              <p className="text-base text-gray-500">
                Unfortunately, once an order has been placed, we are not able to
                make changes or cancellations. If you no longer want the items
                you've ordered, you can return them for a refund within 30 days
                of delivery.
              </p>
            </div>
          )}
          </div>


{/* //fourth */}
   <div>

             
            <button 
            onClick={()=>toggleTab(4)}
            className='flex items-center justify-between w-full'>
               <span className='text-lg font-[400] text-gray-900'>
                What payment methods do you accept?
               </span>


                {activeTab === 4 ? (
              <svg
                className="cursor-pointer h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 cursor-pointer w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
       

            </button>
                    {activeTab === 4 && (
            <div className="mt-4">
              <p className="text-base text-gray-500">
                 We accept visa,mastercard,paypal payment method also we have
                cash on delivery system.
              </p>
            </div>
          )}
          </div>


          {/* five  */}

           <div>

             
            <button 
            onClick={()=>toggleTab(5)}
            className='flex items-center justify-between w-full'>
               <span className='text-lg font-[400] text-gray-900'>
                Do you offer international shipping?
               </span>


                {activeTab === 5 ? (
              <svg
                className="cursor-pointer h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 cursor-pointer w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
       

            </button>
                    {activeTab === 5 && (
            <div className="mt-4">
              <p className="text-base text-gray-500">
               Currently, we only offer shipping within the United States.
              </p>
            </div>
          )}
          </div>


          {/* end faqs */}

          </div>
         </div>
    );
}

export default FAQPage

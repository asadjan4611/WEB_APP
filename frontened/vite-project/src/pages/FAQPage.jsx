import React, { useState } from 'react'
import Header from '../component/layout/Header'
import styles from '../style/style'
import Footer from '../component/layout/Footer'
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
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


const faqs = [
  {
    id: 1,
    question: "How do I contact customer support?",
    answer:
      "You can contact our customer support team by emailing us at support@myecommercestore.com, or by calling (555) 123-4567 between 9am–5pm EST, Mon–Fri.",
  },
  {
    id: 2,
    question: "How do I track my order?",
    answer:
      "You can track your order using the tracking link in your confirmation email, or by logging into your account and viewing order details.",
  },
  {
    id: 3,
    question: "Can I change or cancel my order?",
    answer:
      "Unfortunately, once an order has been placed, we cannot change or cancel it. However, you can return items for a refund within 30 days of delivery.",
  },
  {
    id: 4,
    question: "What payment methods do you accept?",
    answer:
      "We accept Visa, Mastercard, PayPal, and also offer Cash on Delivery.",
  },
  {
    id: 5,
    question: "Do you offer international shipping?",
    answer: "Currently, we only ship within the United States.",
  },
];

const Faq = () => {
  const [activeTab, setActiveTab] = useState(null);

  const toggleTab = (id) => {
    setActiveTab(activeTab === id ? null : id);
  };

  return (
    <div className={`${styles.section} my-12`}>
      <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2 pb-6">
        <HelpCircle className="text-blue-600" size={28} />
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="border border-gray-200 rounded-xl shadow-sm overflow-hidden"
          >
            {/* Question */}
            <button
              onClick={() => toggleTab(faq.id)}
              className="flex justify-between items-center w-full px-5 py-4 text-left font-medium text-gray-800 hover:bg-gray-50 transition"
            >
              <span>{faq.question}</span>
              {activeTab === faq.id ? (
                <ChevronUp className="text-blue-600" size={22} />
              ) : (
                <ChevronDown className="text-gray-500" size={22} />
              )}
            </button>

            {/* Answer */}
            {activeTab === faq.id && (
              <div className="px-5 pb-4 text-gray-600 text-sm animate-fadeIn">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};


export default FAQPage

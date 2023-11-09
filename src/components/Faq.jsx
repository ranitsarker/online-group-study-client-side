import { useState } from 'react';
const Faq = () => {
  const faqItems = [
    {
      question: '1. User Registration',
      answer: 'Users can create accounts with their name, email, password, and profile photo.',
    },
    {
      question: '2. Social Login',
      answer: 'Users can log in using social platforms such as Google or GitHub.',
    },
    {
      question: '3. Assignment Creation',
      answer: 'Any logged-in user can create assignments with various details.',
    },
    {
      question: '4. Assignment Deletion',
      answer: 'Users can delete assignments they have created.',
    },
    {
      question: '5. Assignment Update',
      answer: 'Users can update assignment details, and the form is pre-filled for convenience.',
    },
    {
      question: '6. Assignment Filtering',
      answer: 'Users can filter assignments by difficulty level (easy, medium, hard).',
    },
    {
      question: '7. Assignment Submission',
      answer: 'Users can submit assignments with PDF links and notes.',
    },
    {
      question: '8. Marking System',
      answer: 'Instructors can mark assignments, provide feedback, and give marks.',
    },
    {
      question: '9. Status Tracking',
      answer: 'Assignments can change status from pending to completed after marking.',
    },
    {
      question: '10. User-Friendly Interface',
      answer: 'The system offers a user-friendly interface with toast messages and modals for better user experience.',
    },
  ];

  const [openItem, setOpenItem] = useState(null);

  // Function to toggle the open/closed state of an FAQ item
  const toggleItem = (index) => {
    if (index === openItem) {
      setOpenItem(null);
    } else {
      setOpenItem(index);
    }
  };

  return (
    <div className="bg-white py-12">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4 mx-4">
          
          {faqItems.map((item, index) => (
            <div key={index}>
              <button
                className="flex justify-between w-full py-2 px-4 text-left bg-gray-200 hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
                onClick={() => toggleItem(index)
                }
              >
                <span className="font-medium">{item.question}</span>
                <span>{openItem === index ? '−' : '+'}</span>
              </button>
              {openItem === index && (
                <div className="px-4 py-2 text-gray-700">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;

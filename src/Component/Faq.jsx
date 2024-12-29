import React, { useEffect } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import Aos from 'aos';
import { useLottie } from 'lottie-react';

import lottie from '../assets/Animation - 1735308127401.json';

const Faq = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const options = {
    animationData: lottie,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options);

  return (
    <div className="overflow-hidden rounded-none mx-auto py-8 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* FAQ Section */}
        <div data-aos="fade-right">
          <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">
            <Typewriter
              words={[" Frequently Asked Questions"]}
              loop={5}
              cursor
              cursorStyle="_!"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </h2>
          <div className="space-y-4">
            {/* FAQ 1 */}
            <div className="collapse collapse-arrow border-2 border-orange-500 shadow-md rounded-lg">
              <input type="radio" name="my-accordion-2" defaultChecked />
              <div className="collapse-title text-xl font-semibold text-orange-500 p-4">
                What is the Marathon Management System?
              </div>
              <div className="collapse-content p-4 rounded-b-lg">
                <p>
                  The Marathon Management System is an all-in-one platform designed to help organizers manage marathon events and connect with participants. Users can create and customize marathons, sign up for events, and track registrations through a personal dashboard. With features like online registration, progress tracking, and secure payment systems, the platform makes event management seamless for both organizers and participants.
                </p>
              </div>
            </div>

            {/* FAQ 2 */}
            <div className="collapse collapse-arrow border-2 border-orange-500 shadow-md rounded-lg">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-xl font-semibold text-orange-500 p-4">
                How can I register for a marathon event?
              </div>
              <div className="collapse-content p-4 rounded-b-lg">
                <p>
                  To register for a marathon event, browse through the list of available marathons on the platform. Select your desired event, and click on the registration button. Fill in the necessary details, such as your name, contact information, and t-shirt size (if applicable). After completing the payment through our secure gateway, you’ll receive a confirmation email with your registration details. Your dashboard will also be updated with the event information.
                </p>
              </div>
            </div>

            {/* FAQ 3 */}
            <div className="collapse collapse-arrow border-2 border-orange-500 shadow-md rounded-lg">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-xl font-semibold text-orange-500 p-4">
                How do I create a marathon event?
              </div>
              <div className="collapse-content p-4 rounded-b-lg">
                <p>
                  Creating a marathon event is simple. After logging into your organizer account, go to the “Create Event” section. Provide essential details like event name, date, location, participant limit, and registration fees. You can also upload promotional images or videos. Once submitted, the platform will guide you through the setup process, including online payment options and participant management tools. After approval, your marathon event will be live and ready for registrations.
                </p>
              </div>
            </div>

         
            
          </div>
        </div>

        {/* Animation Section */}
        <div className="shadow-2xl border border-1 border-orange-500 rounded-tr-[320px] rounded-bl-[320px]  ">{View}</div>
      </div>
    </div>
  );
};

export default Faq;

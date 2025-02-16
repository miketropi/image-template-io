'use client';

import { useState } from 'react';
import { UserRound } from 'lucide-react';

export const explain = {
  name: 'Customer Testimonial',
  description: 'A component that displays customer testimonials in a list format',
  icon: <UserRound />,
};

interface Testimonial {
  id: number;
  customerName: string;
  customerRole?: string;
  customerAvatar?: string;
  rating: number;
  comment: string;
  date: Date;
}

interface CustomerTestimonialSimulateProps {
  initialTestimonials?: Testimonial[];
  containerClassName?: string;
  showRating?: boolean;
  showDate?: boolean;
  avatarSize?: string;
  backgroundColor?: string;
  textColor?: string; 
}

export default function CustomerTestimonialSimulate({
  initialTestimonials = [
    {
      id: 1,
      customerName: "Sarah Johnson",
      customerRole: "Marketing Director",
      customerAvatar: "",
      rating: 5,
      comment: "This product has completely transformed how we handle our marketing campaigns. Highly recommended!",
      date: new Date('2024-01-15')
    },
    {
      id: 2,
      customerName: "Michael Chen",
      customerRole: "Software Engineer",
      customerAvatar: "",
      rating: 4,
      comment: "Great user experience and excellent customer support. Would definitely use again.",
      date: new Date('2024-01-14')
    }
  ],
  containerClassName = 'w-full max-w-3xl mx-auto',
  showRating = true,
  showDate = true,
  avatarSize = 'w-12 h-12',
  backgroundColor = 'bg-white',
  textColor = 'text-gray-800'
}: CustomerTestimonialSimulateProps) {
  const [testimonials] = useState<Testimonial[]>(initialTestimonials);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className={`${containerClassName}`}>
      <div className="space-y-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={ index }
            className={`${backgroundColor} rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-102`}
          >
            <div className="flex items-start space-x-4">
              {/* Avatar */}
              {testimonial.customerAvatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={testimonial.customerAvatar}
                  alt={testimonial.customerName}
                  className={`${avatarSize} rounded-full object-cover`}
                />
              ) : (
                <div className={`${avatarSize} rounded-full bg-gray-200 flex items-center justify-center`}>
                  <UserRound className="w-6 h-6 text-gray-400" />
                </div>
              )}

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className={`font-semibold ${textColor}`}>{testimonial.customerName}</h3>
                    {testimonial.customerRole && (
                      <p className="text-gray-500 text-sm">{testimonial.customerRole}</p>
                    )}
                  </div>
                  {showDate && (
                    <span className="text-gray-400 text-sm">
                      {testimonial.date.toLocaleDateString()}
                    </span>
                  )}
                </div>

                {showRating && (
                  <div className="flex items-center mt-2">
                    {renderStars(testimonial.rating)}
                  </div>
                )}

                <p className={`mt-3 ${textColor}`}>{testimonial.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

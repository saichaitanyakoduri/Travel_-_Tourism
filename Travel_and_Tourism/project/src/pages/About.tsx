import { Users, Award, Globe, Shield } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About Travel World</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your trusted travel partner providing comprehensive solutions for all your journeys.
        </p>
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div>
          <img
            src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
            alt="A scenic view symbolizing travel"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded with a vision to revolutionize travel planning, Travel World has grown from a small startup to one of India's leading travel platforms.
          </p>
          <p className="text-gray-600">
            We believe in making travel accessible, comfortable, and memorable for everyone. Our platform integrates all aspects of travel planning, from transportation to accommodation, making it easier for you to focus on what matters most—enjoying your journey.
          </p>
        </div>
      </div>

      {/* Highlights Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
        {[
          { icon: <Users />, count: '100+', label: 'Happy Customers' },
          { icon: <Globe />, count: '100+', label: 'Cities Covered' },
          { icon: <Award />, count: '50+', label: 'Travel Awards' },
          { icon: <Shield />, count: '24/7', label: 'Customer Support' },
        ].map((highlight, index) => (
          <div
            key={index}
            className="text-center p-6 bg-white rounded-lg shadow-md"
          >
            <div className="h-12 w-12 text-blue-600 mx-auto mb-4">
              {highlight.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{highlight.count}</h3>
            <p className="text-gray-600">{highlight.label}</p>
          </div>
        ))}
      </div>

      {/* Values Section */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Customer First',
              description:
                "We prioritize our customers' needs and satisfaction above everything else.",
            },
            {
              title: 'Innovation',
              description:
                'Constantly improving our services to provide the best travel experience.',
            },
            {
              title: 'Reliability',
              description:
                'Trusted by millions for safe and secure travel arrangements.',
            },
          ].map((value, index) => (
            <div key={index} className="text-center">
              <h3 className="text-xl font-bold mb-4">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;

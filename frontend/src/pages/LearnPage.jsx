import { useState } from 'react';

function LearnPage() {
  const [activeCategory, setActiveCategory] = useState('solar-system');

  const categories = [
    { id: 'solar-system', name: 'Solar System' },
    { id: 'stars', name: 'Stars & Galaxies' },
    { id: 'space-exploration', name: 'Space Exploration' },
    { id: 'astronomy', name: 'Astronomy Basics' }
  ];

  const spaceContent = {
    'solar-system': [
      {
        title: 'Our Solar System',
        content: 'Our solar system consists of the Sun, eight planets...',
        image: '/src/assets/solar.jpg',
        facts: [
          'The Sun contains 99.86% of the mass in the solar system',
          'Jupiter has the shortest day of all the planets',
          'Venus is the hottest planet, even though Mercury is closer to the Sun'
        ]
      },
      {
        title: "Earth's Moon",
        content: "The Moon is Earth's only natural satellite...",
        image: '/src/assets/moon.jpg',
        facts: [
          'The Moon is moving away from Earth at a rate of 3.8 cm per year',
          'The Moon always shows the same face to Earth',
          'The Moon has no atmosphere'
        ]
      },
      {
        title: 'Mars: The Red Planet',
        content: 'Mars is the fourth planet from the Sun...',
        image: '/src/assets/mars.jpg',
        facts: [
          'Mars has the largest dust storms in the solar system',
          'Mars has two moons, Phobos and Deimos',
          'Mars has the tallest mountain in the solar system, Olympus Mons'
        ]
      }
    ],
    'stars': [
      {
        title: 'Life Cycle of Stars',
        content: 'Stars are born in clouds of gas and dust called nebulae...',
        image: '/src/assets/stars.jpg',
        facts: [
          'The closest star to Earth is the Sun',
          'Stars twinkle because of turbulence in Earth\'s atmosphere',
          'Most stars visible to the naked eye in the night sky are bigger and brighter than the Sun'
        ]
      },
      {
        title: 'The Milky Way Galaxy',
        content: 'The Milky Way is the galaxy that contains our Solar System...',
        image: '/src/assets/galaxy.jpg',
        facts: [
          'The Milky Way is moving through space at about 552 kilometers per second',
          'The supermassive black hole at the center of the Milky Way is called Sagittarius A*',
          'The Milky Way will collide with the Andromeda Galaxy in about 4.5 billion years'
        ]
      }
    ],
    'space-exploration': [
      {
        title: 'Apollo Missions',
        content: 'The Apollo program was a series of human spaceflight missions...',
        image: '/src/assets/apollo.jpg',
        facts: [
          'Apollo 11 carried the first humans to land on the Moon',
          'Apollo 13\'s mission to the Moon was aborted after an oxygen tank explosion',
          'Alan Shepard hit two golf balls on the Moon during Apollo 14'
        ]
      },
      {
        title: 'Mars Rovers',
        content: 'NASA has sent several rovers to explore the surface of Mars...',
        image: '/src/assets/rover.jpg',
        facts: [
          'Perseverance rover carried the Ingenuity helicopter',
          'Opportunity rover operated for over 14 years',
          'Curiosity rover is powered by a radioisotope generator'
        ]
      }
    ],
    'astronomy': [
      {
        title: 'Understanding Light Years',
        content: 'A light-year is the distance that light travels in one year...',
        image: '/src/assets/andromeda.jpg',
        facts: [
          'Proxima Centauri is 4.24 light-years away',
          'Andromeda Galaxy is 2.537 million light-years away',
          'The observable universe is about 93 billion light-years in diameter'
        ]
      },
      {
        title: 'Black Holes',
        content: 'A black hole is a region of spacetime where gravity is so strong...',
        image: '/src/assets/blackhole.jpg',
        facts: [
          'Predicted by Einstein\'s general relativity',
          'First image captured in 2019',
          'Exist at the center of most galaxies'
        ]
      }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Learn About Space</h1> {/* changed from 3xl */}

      <div className="flex flex-wrap justify-center mb-8 gap-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-6 py-3 rounded-md mr-2 mb-2 ${ /* px-4 py-2 rounded-md mr-2 mb-2 */
              activeCategory === category.id
                ? 'bg-space-dark text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="space-y-12">
        {spaceContent[activeCategory].map((item, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  style={{ minHeight: '300px' }}
                />
              </div>
              <div className="p-8 md:w-2/3">
                <h2 className="text-3xl font-bold mb-4">{item.title}</h2>
                <p className="text-gray-700 dark:text-blue-300 mb-6 text-lg leading-relaxed">
                  {item.content}
                </p>
                <div>
                  <h3 className="font-bold text-xl mb-4 text-left">Fun Facts:</h3>
                  <ul className="space-y-3">
                    {item.facts.map((fact, idx) => (
                      <li key={idx} className="text-gray-700 dark:text-gray-300 flex items-start">
                        <span className="text-white-500 mr-3 text-xl flex-shrink-0">•</span>
                        <span className="leading-relaxed">{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Want to test your knowledge?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
          Take our space quiz and see how much you've learned!
        </p>
        <a href="/quiz" className="btn-primary">
          Take the Quiz
        </a>
      </div>
    </div>
  );
}

export default LearnPage;

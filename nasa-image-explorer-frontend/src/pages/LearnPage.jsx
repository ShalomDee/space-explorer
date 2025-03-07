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
        content: 'Our solar system consists of the Sun, eight planets, dwarf planets, moons, asteroids, comets, and other celestial bodies. The four inner planets (Mercury, Venus, Earth, and Mars) are called terrestrial planets because they have solid, rocky surfaces. The four outer planets (Jupiter, Saturn, Uranus, and Neptune) are called gas giants because they are large and made mostly of gas.',
        image: '/api/placeholder/400/300',
        facts: [
          'The Sun contains 99.86% of the mass in the solar system',
          'Jupiter has the shortest day of all the planets',
          'Venus is the hottest planet, even though Mercury is closer to the Sun'
        ]
      },
      {
        title: 'Earth\'s Moon',
        content: 'The Moon is Earth\'s only natural satellite. It is the fifth largest satellite in the Solar System and the largest and most massive relative to its parent planet. The Moon is thought to have formed about 4.51 billion years ago, not long after Earth, from the debris left over after a Mars-sized body called Theia collided with Earth.',
        image: '/api/placeholder/400/300',
        facts: [
          'The Moon is moving away from Earth at a rate of 3.8 cm per year',
          'The Moon always shows the same face to Earth',
          'The Moon has no atmosphere'
        ]
      },
      {
        title: 'Mars: The Red Planet',
        content: 'Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, being larger than only Mercury. In English, Mars carries the name of the Roman god of war. It is often referred to as the "Red Planet" because the iron oxide prevalent on its surface gives it a reddish appearance, which is distinctive among the astronomical bodies visible to the naked eye.',
        image: '/api/placeholder/400/300',
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
        content: 'Stars are born in clouds of gas and dust called nebulae. Gravity pulls the dust and gas together, and as it gets denser, it gets hotter. Eventually, it gets hot enough for nuclear fusion to begin, and a star is born. Stars spend most of their lives in the main sequence, where they convert hydrogen to helium. When a star runs out of hydrogen, it becomes a red giant or a red supergiant. After this stage, lower mass stars become white dwarfs, while higher mass stars explode as supernovae and may leave behind neutron stars or black holes.',
        image: '/api/placeholder/400/300',
        facts: [
          'The closest star to Earth is the Sun',
          'Stars twinkle because of turbulence in Earth\'s atmosphere',
          'Most stars visible to the naked eye in the night sky are bigger and brighter than the Sun'
        ]
      },
      {
        title: 'The Milky Way Galaxy',
        content: 'The Milky Way is the galaxy that contains our Solar System. It is a barred spiral galaxy with a diameter between 150,000 and 200,000 light-years. It is estimated to contain 100–400 billion stars and at least that number of planets. The Solar System is located at a radius of about 27,000 light-years from the Galactic Center, on the inner edge of the Orion Arm, one of the spiral-shaped concentrations of gas and dust.',
        image: '/api/placeholder/400/300',
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
        content: 'The Apollo program was a series of human spaceflight missions undertaken by NASA with the goal of landing humans on the Moon. The program ran from 1961 to 1972 and was successful with six missions that landed astronauts on the Moon. The first crewed landing was Apollo 11 on July 20, 1969, when Neil Armstrong became the first human to step onto the lunar surface, followed by Buzz Aldrin.',
        image: '/api/placeholder/400/300',
        facts: [
          'Apollo 11 carried the first humans to land on the Moon',
          'Apollo 13\'s mission to the Moon was aborted after an oxygen tank explosion',
          'Alan Shepard hit two golf balls on the Moon during the Apollo 14 mission'
        ]
      },
      {
        title: 'Mars Rovers',
        content: 'NASA has sent several rovers to explore the surface of Mars. These include Sojourner (1997), Spirit and Opportunity (2004), Curiosity (2012), and Perseverance (2021). These rovers have provided valuable data about the Martian surface, climate, and potential for past life. They have found evidence of past water activity and organic molecules, which are building blocks of life as we know it.',
        image: '/api/placeholder/400/300',
        facts: [
          'Perseverance rover carried the Ingenuity helicopter, the first aircraft to fly on another planet',
          'Opportunity rover operated for over 14 years, much longer than its planned 90-day mission',
          'Curiosity rover is powered by a radioisotope thermoelectric generator (RTG)'
        ]
      }
    ],
    'astronomy': [
      {
        title: 'Understanding Light Years',
        content: 'A light-year is the distance that light travels in one year. Since light moves at a speed of about 300,000 kilometers per second, a light-year is about 9.5 trillion kilometers. Astronomers use light-years to describe the distances to stars and other objects beyond our Solar System because the distances are so vast that using kilometers or miles would result in unwieldy numbers.',
        image: '/api/placeholder/400/300',
        facts: [
          'The nearest star to our solar system is Proxima Centauri, about 4.24 light-years away',
          'The Andromeda Galaxy is about 2.537 million light-years away',
          'The observable universe is about 93 billion light-years in diameter'
        ]
      },
      {
        title: 'Black Holes',
        content: 'A black hole is a region of spacetime where gravity is so strong that nothing—no particles or even electromagnetic radiation such as light—can escape from it. The theory of general relativity predicts that a sufficiently compact mass can deform spacetime to form a black hole. The boundary of the region from which no escape is possible is called the event horizon.',
        image: '/api/placeholder/400/300',
        facts: [
          'Black holes were first predicted by Einstein\'s theory of general relativity',
          'In 2019, astronomers captured the first image of a black hole',
          'Supermassive black holes are thought to exist at the center of most galaxies'
        ]
      }
    ]
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Learn About Space</h1>
      
      <div className="flex flex-wrap mb-8">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-md mr-2 mb-2 ${
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
              <div className="md:w-1/3">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                  style={{ minHeight: '300px' }}
                />
              </div>
              <div className="p-6 md:w-2/3">
                <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {item.content}
                </p>
                <div>
                  <h3 className="font-bold text-lg mb-2">Fun Facts:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {item.facts.map((fact, idx) => (
                      <li key={idx} className="text-gray-700 dark:text-gray-300">{fact}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Want to test your knowledge?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
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
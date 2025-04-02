import Image from 'next/image';

const bookmakers = [
  {
    name: 'DonBet',
    description: 'DonBet est un bookmaker en ligne proposant une large gamme de paris sportifs avec des cotes compétitives. Il se distingue par son casino en ligne riche en jeux, ses promotions attractives et son support client réactif. Expert Pronostics utilise les cotes de DonBet comme référence pour tous ses pronostics.',
    features: [
      'Cotes compétitives',
      'Paris en direct sur de nombreux sports',
      'Large sélection de jeux de casino',
      'Bonus généreux pour les nouveaux joueurs'
    ]
  },
  {
    name: 'Winamax',
    description: 'Réputé pour proposer des cotes très élevées sur une variété de sports, Winamax offre également des grilles loto foot avec jackpots garantis et une plateforme de streaming, Winamax TV, diffusant de nombreux matchs et programmes exclusifs.',
    features: [
      'Cotes élevées',
      'Winamax TV',
      'Grilles Loto Foot',
      'Streaming de qualité'
    ]
  },
  {
    name: 'Betclic',
    description: 'Apprécié pour son interface utilisateur intuitive et sa large gamme de paris sur divers sports, Betclic propose des cotes compétitives, notamment sur le football et le tennis, ainsi que des fonctionnalités telles que le cashout et des gains boostés sur les paris combinés.',
    features: [
      'Interface intuitive',
      'Cashout disponible',
      'Gains boostés',
      'Paris combinés avantageux'
    ]
  },
  {
    name: 'Unibet',
    description: 'Unibet se distingue par une offre de paris en direct avec streaming vidéo de qualité, une application mobile ergonomique, et des cotes attractives sur le football européen, le tennis et la NBA. Les mises débutent à partir de 10 centimes, ce qui est idéal pour les parieurs au budget serré.',
    features: [
      'Streaming vidéo HD',
      'Application mobile performante',
      'Mises à partir de 0.10€',
      'Cotes attractives'
    ]
  },
  {
    name: 'Parions Sport en ligne',
    description: 'Le bookmaker de la FDJ a amélioré son interface pour une expérience utilisateur plus conviviale et propose des cotes compétitives, de nombreuses promotions, et une grande flexibilité pour les transactions, avec un dépôt minimum à 5 € et un retrait possible dès 1 centime.',
    features: [
      'Dépôt minimum 5€',
      'Retrait dès 0.01€',
      'Interface conviviale',
      'Nombreuses promotions'
    ]
  }
];

export default function BookmakersPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Les Meilleurs Bookmakers en 2025
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            En France, plusieurs bookmakers se distinguent par la qualité de leurs services et offres. 
            Découvrez notre sélection des meilleurs sites de paris sportifs.
          </p>
          <p className="text-lg text-blue-600 mt-4 font-semibold">
            Tous les pronostics d'Expert Pronostics sont basés sur les cotes de DonBet.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {bookmakers.map((bookmaker, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${
                bookmaker.name === 'DonBet' ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="p-6">
                <h2 className={`text-2xl font-bold mb-4 ${
                  bookmaker.name === 'DonBet' ? 'text-blue-600' : 'text-gray-900'
                }`}>
                  {bookmaker.name}
                </h2>
                <p className="text-gray-600 mb-6">
                  {bookmaker.description}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {bookmaker.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <svg
                        className={`h-5 w-5 mr-2 ${
                          bookmaker.name === 'DonBet' ? 'text-blue-500' : 'text-green-500'
                        }`}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

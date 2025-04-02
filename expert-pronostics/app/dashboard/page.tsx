'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const NoSubscriptionMessage = () => (
  <div className="min-h-screen bg-gray-900 py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">
          Bienvenue sur Expert Pronostics
        </h2>
        <p className="text-gray-400 mb-6">
          Pour accéder à nos pronostics et analyses détaillées, veuillez choisir un abonnement qui vous convient.
        </p>
        <div className="space-y-4">
          <Link
            href="/offres"
            className="inline-block bg-yellow-400 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-300 transition-colors"
          >
            Voir les abonnements
          </Link>
        </div>
      </div>
    </div>
  </div>
);

const NoSubscriptionMessage2 = () => (
  <div className="text-center py-12">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">
      Accès Restreint
    </h2>
    <p className="text-gray-600 mb-8">
      Vous devez avoir un abonnement actif pour accéder aux pronostics.
    </p>
    <a
      href="/pricing"
      className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
    >
      Voir les abonnements
    </a>
  </div>
);

const parisQuotidiens = [
  {
    id: 1,
    match: "Bayer Leverkusen - TSG Hoffenheim",
    type: "Résultat du match",
    prediction: "1",
    cote: 1.24,
    date: "02/02/2025"
  },
  {
    id: 2,
    match: "Brentford FC - Tottenham Hotspur",
    type: "Total buts",
    prediction: "+2.5 buts",
    cote: 1.37,
    date: "02/02/2025"
  },
  {
    id: 3,
    match: "AS Monaco - AJ Auxerre",
    type: "Résultat du match",
    prediction: "1",
    cote: 1.32,
    date: "01/02/2025"
  },
  {
    id: 4,
    match: "FC Barcelone - Alaves",
    type: "Résultat du match",
    prediction: "1",
    cote: 1.19,
    date: "02/02/2025"
  }
];

const ParisQuotidiens = () => {
  const coteTotale = parisQuotidiens.reduce((acc, pari) => acc * pari.cote, 1);
  const mise = 100;
  const gainsPotentiels = (mise * coteTotale).toFixed(2);

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-white">
      <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold text-white mb-2">
      Combinés du Jour
                </h2>
        <span className="text-gray-400">Matchs du 1-2 février</span>
      </div>
      <div className="space-y-4">
        {parisQuotidiens.map((pari, index) => (
          <div key={pari.id} className="border-b border-gray-700 pb-4 last:border-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">{index + 1}</span>
                <span className="text-sm text-gray-400">{pari.date}</span>
              </div>
              <button className="text-gray-400 hover:text-gray-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mb-2">
              <h3 className="font-semibold">{pari.match}</h3>
              <p className="text-gray-400 text-sm">{pari.type}</p>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">{pari.prediction}</span>
              <span className="bg-yellow-400 text-black px-3 py-1 rounded font-bold">
                {pari.cote.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-400">Enjeu</span>
          <div className="flex items-center space-x-4">
            <button className="text-2xl font-bold text-gray-400 hover:text-white">-</button>
            <span className="text-xl font-bold">{mise}€</span>
            <button className="text-2xl font-bold text-gray-400 hover:text-white">+</button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-400 mb-1">Total des Cotes</p>
            <p className="text-xl font-bold">{coteTotale.toFixed(2)}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 mb-1">Gains potentiels</p>
            <p className="text-xl font-bold text-yellow-400">{gainsPotentiels} EUR</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ParisPronostics = () => {
  const today = new Date();
  const isWeekend = today.getDay() === 0 || today.getDay() === 5 || today.getDay() === 6;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
        <ParisQuotidiens />
    </div>
  );
};

interface TabProps {
  active: string;
  onTabChange: (tab: string) => void;
}

const PronosticTabs = ({ active, onTabChange }: TabProps) => (
  <div className="border-b border-gray-200 mb-6">
    <nav className="-mb-px flex space-x-8">
      <button
        onClick={() => onTabChange('championnat')}
        className={`py-4 px-1 border-b-2 font-medium text-sm ${
          active === 'championnat'
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`}
      >
        Pronostics Championnat 2024/2025
      </button>
      <button
        onClick={() => onTabChange('montante')}
        className={`py-4 px-1 border-b-2 font-medium text-sm ${
          active === 'montante'
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`}
      >
        Montante
      </button>
      <button
        onClick={() => onTabChange('paris')}
        className={`py-4 px-1 border-b-2 font-medium text-sm ${
          active === 'paris'
            ? 'border-blue-500 text-blue-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`}
      >
        Combinés du Jour
      </button>
    </nav>
  </div>
);

const premiumLeagues = ['Ligue 2', 'Bundesliga 2', 'Eredivisie', 'Liga Portugal', 'Super Lig'];

const leagues = [
  { name: 'Ligue 1', matches: [] },
  { name: 'Premier League', matches: [] },
  { name: 'La Liga', matches: [] },
  { name: 'Serie A', matches: [] },
  { name: 'Bundesliga', matches: [] },
  { name: 'Ligue 2', matches: [] },
  { name: 'Bundesliga 2', matches: [] },
  { name: 'Eredivisie', matches: [] },
  { name: 'Liga Portugal', matches: [] },
  { name: 'Super Lig', matches: [] },
  { name: 'Ligue des Champions', matches: [] },
  { name: 'Ligue Europa', matches: [] },
];

const bundesligaMatches = [
  {
    match: "Werder - Mayence",
    prediction: "Over 2",
    result: "2-1"
  },
  {
    match: "Stuttgart - Gladbach",
    prediction: "Over 2,5",
    result: "3-1"
  },
  {
    match: "Bayern - Kiel",
    prediction: "Bayern",
    result: "4-1",
    isHighlight: true
  },
  {
    match: "Heidenheim - Dortmund",
    prediction: "X2",
    result: "1-2"
  },
  {
    match: "Bochum - Fribourg",
    prediction: "Over 1,5",
    result: "2-1"
  },
  {
    match: "St Pauli - Augsburg",
    prediction: "Over 1,5",
    result: "1-1"
  },
  {
    match: "Union - Leipzig",
    prediction: "X2",
    result: "1-2"
  },
  {
    match: "Ent Francfort - Wolfsburg",
    prediction: "BTTS",
    result: "2-2"
  },
  {
    match: "Leverkusen - Hoffenheim",
    prediction: "Leverkusen",
    result: "2-0",
    isHighlight: true
  }
];

const serieAMatches = [
  {
    match: "Parme - Lecce",
    prediction: "Lecce over 0,5",
    result: "1-1"
  },
  {
    match: "Monza - Hellas",
    prediction: "Hellas over 0,5",
    result: "1-2"
  },
  {
    match: "Udinese - Venezia",
    prediction: "1X",
    result: "1-0"
  },
  {
    match: "Atalanta - Torino",
    prediction: "1X & Over 1,5",
    result: "2-1"
  },
  {
    match: "Bologne - Como",
    prediction: "Over 1,5",
    result: "1-1"
  },
  {
    match: "Juventus - Empoli",
    prediction: "Juventus",
    result: "2-0",
    isHighlight: true
  },
  {
    match: "Fiorentina - Genoa",
    prediction: "Genoa H+1,5",
    result: "1-0"
  },
  {
    match: "AC Milan - Inter",
    prediction: "Over 2",
    result: "1-3"
  },
  {
    match: "AS Rome - Naples",
    prediction: "Over 1,5",
    result: "1-1"
  },
  {
    match: "Cagliari - Lazio",
    prediction: "X2",
    result: "1-2"
  }
];

const premierLeagueMatches = [
  {
    match: "Nottingham - Brighton",
    prediction: "1X",
    result: "2-1"
  },
  {
    match: "Bournemouth - Liverpool",
    prediction: "Over 2,5",
    result: "1-2"
  },
  {
    match: "Everton - Leicester",
    prediction: "1X",
    result: "1-0"
  },
  {
    match: "Ipswich - Southampton",
    prediction: "1X",
    result: "2-1"
  },
  {
    match: "Newcastle - Fulham",
    prediction: "Over 2",
    result: "2-1"
  },
  {
    match: "Wolves - Villa",
    prediction: "Over 2",
    result: "1-2"
  },
  {
    match: "Brentford - Tottenham",
    prediction: "Over 2,5",
    result: "3-1",
    isHighlight: true
  },
  {
    match: "MU - Crystal",
    prediction: "Crystal over 0,5",
    result: "2-2"
  },
  {
    match: "Arsenal - City",
    prediction: "1X",
    result: "1-0"
  },
  {
    match: "Chelsea - West Ham",
    prediction: "Over 2,5",
    result: "3-1",
    isHighlight: true
  }
];

const eredivisieMatches = [
  {
    match: "Breda - Heracles",
    prediction: "Over 2",
    result: "2-1"
  },
  {
    match: "Zwolle - Utrecht",
    prediction: "X2",
    result: "1-2"
  },
  {
    match: "Heerenveen - Sittard",
    prediction: "Heerenveen DnB",
    result: "2-1"
  },
  {
    match: "Nijmegen - PSV",
    prediction: "Over 2,5",
    result: "1-3",
    isHighlight: true
  },
  {
    match: "Almere - Waalwijk",
    prediction: "Over 1,5",
    result: "2-1"
  },
  {
    match: "Ajax - Feyenoord",
    prediction: "Over 2",
    result: "3-2",
    isHighlight: true
  },
  {
    match: "Eagles - Twente",
    prediction: "Over 2",
    result: "3-2",
    isHighlight: true
  },
  {
    match: "Sparta - Groningen",
    prediction: "1X & Over 1,5",
    result: "2-1"
  },
  {
    match: "Willem II - Alkmaar",
    prediction: "Over 1,5",
    result: "1-2",
    isHighlight: true
  }
];

const superLigMatches = [
  {
    match: "Eyupspor - Sivasspor",
    prediction: "Eyupspor DnB",
    result: "1-0"
  },
  {
    match: "Konyaspor - Bodrumspor",
    prediction: "1X",
    result: "1-0"
  },
  {
    match: "Hatayspor - Antalyaspor",
    prediction: "Over 2",
    result: "3-1"
  },
  {
    match: "Kayserispor - Trabzonspor",
    prediction: "Over 2,5",
    result: "3-2"
  },
  {
    match: "Basaksehir - Samsunspor",
    prediction: "1X",
    result: "1-1",
    isRedHighlight: true
  },
  {
    match: "Adana - Kasimpasa",
    prediction: "Over 2,5",
    result: "2-3"
  },
  {
    match: "Goztepe - Alanyaspor",
    prediction: "Goztepe",
    result: "2-0",
    isHighlight: true
  },
  {
    match: "Fenerbahce - Rizespor",
    prediction: "Fenerbahce",
    result: "4-1",
    isHighlight: true
  },
  {
    match: "Gaziantep - Galatasaray",
    prediction: "Galatasaray",
    result: "1-2"
  }
];

const ligaPortugalMatches = [
  {
    match: "Boavista - Famalicao",
    prediction: "X2",
    result: "1-2"
  },
  {
    match: "Santa Clara - Casa Pia",
    prediction: "X2",
    result: "0-0"
  },
  {
    match: "Nacional - Arouca",
    prediction: "1X",
    result: "1-0"
  },
  {
    match: "Gil Vicente - Estoril",
    prediction: "1X",
    result: "1-0"
  },
  {
    match: "Guimaraes - AVS",
    prediction: "1X & Over 1,5",
    result: "2-1",
    isHighlight: true
  },
  {
    match: "Sporting - Farense",
    prediction: "Sporting",
    result: "2-0",
    isHighlight: true
  },
  {
    match: "Estrela - Benfica",
    prediction: "Benfica",
    result: "1-3",
    isHighlight: true
  },
  {
    match: "Moreirense - Braga",
    prediction: "Over 1,5",
    result: "1-2",
    isHighlight: true
  },
  {
    match: "Rio Ave - Porto",
    prediction: "Over 2",
    result: "1-2",
    isHighlight: true
  }
];

const ligue2Matches = [
  {
    match: "Grenoble - Rodez",
    prediction: "1X",
    result: "1-0"
  },
  {
    match: "Amiens - Annecy",
    prediction: "X2",
    result: "0-1"
  },
  {
    match: "Dunkerque - Martigues",
    prediction: "Dunkerque",
    result: "1-0"
  },
  {
    match: "Pau - Laval",
    prediction: "Over 1,5",
    result: "1-1"
  },
  {
    match: "Bastia - Metz",
    prediction: "X2",
    result: "0-0"
  },
  {
    match: "Clermont - Ajaccio",
    prediction: "1X",
    result: "1-1"
  },
  {
    match: "Red Star - Lorient",
    prediction: "Over 2",
    result: "1-2"
  },
  {
    match: "Troyes - Caen",
    prediction: "1X",
    result: "2-0"
  },
  {
    match: "EAG - Paris FC",
    prediction: "Over 1,5",
    result: "2-1"
  }
];

const bundesliga2Matches = [
  {
    match: "Elversberg - Karlsruher",
    prediction: "Over 2,5",
    result: "2-1"
  },
  {
    match: "Nuremberg - Darmstadt",
    prediction: "1X",
    result: "3-1"
  },
  {
    match: "Dusseldorf - Ulm",
    prediction: "1X & Over 1,5",
    result: "3-1"
  },
  {
    match: "Braunschweig - Cologne",
    prediction: "Under 3,5",
    result: "0-1"
  },
  {
    match: "Regensburg - Hertha",
    prediction: "Hertha DnB",
    result: "1-2"
  },
  {
    match: "Schalke - Magdeburg",
    prediction: "Over 2,5",
    result: "3-1",
    isHighlight: true
  },
  {
    match: "Hambourg - Hanovre",
    prediction: "Hambourg DnB",
    result: "2-0"
  },
  {
    match: "Paderborn - Greuther",
    prediction: "1X & Over 1,5",
    result: "2-1"
  },
  {
    match: "Kaiserslautern - Munster",
    prediction: "1X & Over 1,5",
    result: "3-1",
    isHighlight: true
  }
];

const ligue1Matches = [
  {
    match: "Montpellier - Lens",
    prediction: "Over 2",
    result: "2-2"
  },
  {
    match: "Brest - PSG",
    prediction: "X2 & Over 1,5",
    result: "1-2"
  },
  {
    match: "Monaco - Auxerre",
    prediction: "Monaco",
    result: "2-0",
    isHighlight: true
  },
  {
    match: "Lille - ASSE",
    prediction: "Lille",
    result: "2-1"
  },
  {
    match: "Toulouse - Nice",
    prediction: "Over 1,5",
    result: "1-1"
  },
  {
    match: "Reims - Nantes",
    prediction: "Nantes H+1",
    result: "0-0"
  },
  {
    match: "Angers - Le Havre",
    prediction: "1X",
    result: "2-0",
    isHighlight: true
  },
  {
    match: "Rennes - Strasbourg",
    prediction: "Over 1,5",
    result: "1-2",
    isHighlight: true
  },
  {
    match: "OM - OL",
    prediction: "BTTS",
    result: "1-1"
  }
];

const laLigaMatches = [
  {
    match: "Leganes - Vallecano",
    prediction: "1X",
    result: "1-1",
    isRedHighlight: true
  },
  {
    match: "Getafe - Seville",
    prediction: "12",
    result: "1-0"
  },
  {
    match: "Villareal - Valladolid",
    prediction: "Villareal",
    result: "3-1",
    isHighlight: true
  },
  {
    match: "At Madrid - Majorque",
    prediction: "Atletico",
    result: "1-0",
    isHighlight: true
  },
  {
    match: "Espanyol - Real Madrid",
    prediction: "Real Madrid",
    result: "1-2",
    isHighlight: true
  },
  {
    match: "Barcelone - Alaves",
    prediction: "Barcelone",
    result: "3-1",
    isHighlight: true
  },
  {
    match: "Valence - Celta",
    prediction: "Over 1,5",
    result: "2-1"
  },
  {
    match: "Osasuna - Sociedad",
    prediction: "Over 1,5",
    result: "1-2"
  },
  {
    match: "Betis - Bilbao",
    prediction: "Over 1,5",
    result: "1-1"
  },
  {
    match: "Gerone - Las Palmas",
    prediction: "Under 3,5",
    result: "1-0"
  }
];

const TableauChampionnat = ({ title, matches, subscription }) => {
  const router = useRouter();
  const isDefaultMatches = !matches || matches.length === 0;
  const displayMatches = title === 'Bundesliga' ? bundesligaMatches : 
                        title === 'Serie A' ? serieAMatches :
                        title === 'Premier League' ? premierLeagueMatches :
                        title === 'Eredivisie' ? eredivisieMatches :
                        title === 'Super Lig' ? superLigMatches :
                        title === 'Liga Portugal' ? ligaPortugalMatches :
                        title === 'Ligue 2' ? ligue2Matches :
                        title === 'Bundesliga 2' ? bundesliga2Matches :
                        title === 'Ligue 1' ? ligue1Matches :
                        title === 'La Liga' ? laLigaMatches :
                        matches;
  const isPremiumLeague = premiumLeagues.includes(title);
  const hasAccess = subscription === 'PREMIUM' || !isPremiumLeague;

  const handlePremiumClick = () => {
    router.push('/premium');
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        {isPremiumLeague && !hasAccess && (
          <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded">PREMIUM</span>
        )}
      </div>
      {hasAccess ? (
        <div className="overflow-x-auto">
          <div className="grid grid-cols-3 text-sm font-medium text-gray-400 mb-2">
            <div className="p-3">Match</div>
            <div className="p-3">Pronostic</div>
            <div className="p-3 flex items-center gap-2">
              Score Exact
              {subscription !== 'PREMIUM' && (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 text-yellow-400 cursor-pointer hover:text-yellow-300" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  onClick={handlePremiumClick}
                >
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
          {displayMatches.map((match, index) => (
            <div key={index} className="grid grid-cols-3 text-sm border-t border-gray-700">
              <div className="p-3">
                <span className={`${match.isHighlight ? 'text-yellow-400' : match.isRedHighlight ? 'text-yellow-400' : 'text-yellow-400/80'}`}>
                  {match.match}
                </span>
              </div>
              <div className="p-3">
                <span className={`${
                  match.isHighlight ? 'text-green-400' : match.isRedHighlight ? 'text-red-400' : 'text-white'
                }`}>
                  {match.prediction}
                </span>
              </div>
              <div className="p-3">
                {subscription === 'PREMIUM' ? (
                  <span className="text-white">{match.result}</span>
                ) : (
                  <div 
                    className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-yellow-400" 
                    onClick={handlePremiumClick}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span>Premium</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-400 mb-4">Contenu réservé aux membres Premium</p>
          <Link href="/premium" className="text-yellow-400 hover:text-yellow-300">
            Devenir Premium →
          </Link>
        </div>
      )}
    </div>
  );
};

const ChampionnatPronostics = ({ subscription }) => {
  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">Pronostics Championnats 2024/2025</h2>
        <div className="space-y-4">
          <span className="text-gray-400">Matchs du 31 janvier au 3 février</span>
          
          <div className="space-y-4">
            <div className="flex gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="text-gray-300">Grosses confiances</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <span className="text-gray-300">Matchs à éviter</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-400">
              Conseils : Privilégiez les pronostics de résultats (1X2, Double Chance, Over/Under) pour vos paris.<br />
              Les pronostics de score exact sont à jouer de manière récréative avec des mises plus faibles.
            </p>
          </div>
        </div>
      </div>
      
      {leagues.map((league) => (
        <TableauChampionnat
          key={league.name}
          title={league.name}
          matches={league.name === 'Serie A' ? serieAMatches : 
                  league.name === 'Ligue 1' ? ligue1Matches : 
                  league.name === 'La Liga' ? laLigaMatches :
                  league.matches}
          subscription={subscription}
        />
      ))}
    </div>
  );
};

const TableauMontante = () => {
  const [currentMonth, setCurrentMonth] = useState(1); // Janvier = 1
  const [currentYear, setCurrentYear] = useState(2025);

  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  // Données de test pour février 2025
  const montanteData = {
    2: { // Février
      year: 2025,
      mise: 100,
      gainsPotentiels: 267,
      dateResultat: '2025-02-02',
      status: 'win', // 'pending', 'win', 'loss'
      bilan: 167 // Gains - mise (267 - 100)
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const getBilanColor = (status, bilan) => {
    if (status === 'pending') return 'text-gray-400';
    return bilan > 0 ? 'text-green-400' : 'text-red-400';
  };

  const currentMonthData = montanteData[currentMonth];

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">
          {months[currentMonth - 1]} {currentYear}
        </h3>
        {currentMonthData && (
          <span className={`${getBilanColor(currentMonthData.status, currentMonthData.bilan)}`}>
            {currentMonthData.bilan > 0 ? '+' : ''}{currentMonthData.bilan}€
          </span>
        )}
      </div>

      {currentMonthData ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <p className="text-gray-400 mb-1">Mise</p>
              <p className="text-white font-medium">{currentMonthData.mise}€</p>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <p className="text-gray-400 mb-1">Gains potentiels</p>
              <p className="text-white font-medium">{currentMonthData.gainsPotentiels}€</p>
            </div>
          </div>
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <p className="text-gray-400 mb-1">Date du résultat</p>
            <p className="text-white font-medium">
              {new Date(currentMonthData.dateResultat).toLocaleDateString('fr-FR')}
            </p>
          </div>
          {currentMonthData.status === 'pending' && (
            <p className="text-sm text-gray-400 mt-2">
              En attente du résultat
            </p>
          )}
        </div>
      ) : (
        <p className="text-gray-400 text-center py-8">
          Pas de paris pour ce mois
        </p>
      )}
    </div>
  );
};

const MontantePronostics = () => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Pronostics Montante
      </h3>
      <p className="text-gray-600">
        Notre méthode montante commence avec une mise de base de 100€. L'objectif est d'atteindre 500€ minimum.
        Une fois les 500€ atteints, nous retirons la mise initiale de 100€ et continuons avec les gains.
        Ce cycle se répète chaque mois.
      </p>
    </div>
    <TableauMontante />
  </div>
);

const tabs = [
  { id: 'championnats', name: 'Pronostics Championnats' },
  { id: 'paris', name: 'Combinés du Jour' },
  { id: 'pronostics-montante', name: 'Pronostics Montante' },
  { id: 'calendrier-montante', name: 'Technique Montante' },
];

const ParisJour = () => {
  const paris = [
    {
      date: "2025-02-01",
      jour: "Samedi 1er février",
      matchs: [
        { equipe: "Genk", competition: "Jupiler Pro League" },
        { equipe: "Villareal", competition: "La Liga" }
      ]
    },
    {
      date: "2025-02-02",
      jour: "Dimanche 2 février",
      matchs: [
        { equipe: "Leverkusen", competition: "Bundesliga" },
        { equipe: "Barcelone", competition: "La Liga" }
      ]
    },
    {
      date: "2025-02-03",
      jour: "Lundi 3 février",
      matchs: [
        { equipe: "Chelsea - West Ham", prediction: "Over 2,5 buts Chelsea - West Ham", competition: "Premier League" },
        { equipe: "Galatasaray", competition: "Super Lig" }
      ]
    }
  ];

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Combinés du Jour</h2>
      
      <div className="space-y-6">
        {paris.map((jour) => (
          <div key={jour.date} className="bg-gray-700/50 rounded-lg p-4">
            <h3 className="text-yellow-400 font-medium mb-4">{jour.jour}</h3>
            
            <div className="space-y-3">
              {jour.matchs.map((match, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex-1">
                    <p className="text-white font-medium">
                      {match.prediction ? match.prediction : match.equipe}
                    </p>
                    <p className="text-sm text-gray-400">{match.competition}</p>
                  </div>
                  {index < jour.matchs.length - 1 && (
                    <div className="mx-3">
                      <span className="text-yellow-400">+</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return null;
  }

  if (!session) {
    router.push('/login');
    return null;
  }

  // Si l'utilisateur n'a pas d'abonnement actif, afficher le message
  if (!session.user.hasActiveSubscription) {
    return <NoSubscriptionMessage />;
  }

  const [activeTab, setActiveTab] = useState('championnats');

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-700">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-yellow-400 text-yellow-400'
                      : 'border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="mt-6">
          {activeTab === 'championnats' && (
            <ChampionnatPronostics subscription="PREMIUM" />
          )}
          {activeTab === 'paris' && (
            <ParisJour />
          )}
          {activeTab === 'pronostics-montante' && (
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-white">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Pronostics Montante</h2>
                <span className="text-gray-400">Matchs du 1-2 février</span>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Mise totale</span>
                    <span className="text-white font-medium">100€</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Gains potentiels</span>
                    <span className="text-green-400 font-medium">266.85€</span>
                  </div>
                </div>
                {parisQuotidiens.map((match, index) => (
                  <div key={index} className="bg-gray-700/50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-yellow-400">{match.match}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Pronostic</span>
                        <p className="text-white mt-1">{match.prediction}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-400">Côte</span>
                        <p className="text-white mt-1">{match.cote}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-gray-400 text-sm">{match.competition}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'calendrier-montante' && (
            <div>
              <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
                <h2 className="text-xl font-semibold text-white mb-2">
                  Technique Montante
                </h2>
                <p className="text-gray-400">
                  Notre méthode montante commence avec une mise de base de 100€. L'objectif est d'atteindre 500€ minimum.
                  Une fois les 500€ atteints, nous retirons la mise initiale de 100€ et continuons avec les gains.
                  Ce cycle se répète chaque mois.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

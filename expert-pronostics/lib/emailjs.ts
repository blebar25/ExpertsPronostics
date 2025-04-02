import emailjs from '@emailjs/browser';

// Initialiser EmailJS avec votre User ID public
emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_USER_ID!);

interface EmailParams {
  to_email: string;
  to_name: string;
  subscription_type?: string;
}

export const sendWelcomeEmail = async (params: EmailParams) => {
  try {
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_WELCOME_TEMPLATE_ID!,
      {
        to_email: params.to_email,
        to_name: params.to_name
      }
    );
    console.log('Email de bienvenue envoyé avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email de bienvenue:', error);
    throw error;
  }
};

export const sendSubscriptionConfirmation = async (params: EmailParams) => {
  try {
    // Déterminer les avantages en fonction du type d'abonnement
    const benefits = params.subscription_type === 'PREMIUM' ? [
      "Tous les avantages de l'offre Standard",
      "Pronostics sur plus de championnats",
      "Support par email prioritaire",
      "Analyses approfondies",
      "Statistiques avancées",
      "Accès au groupe Telegram VIP"
    ] : [
      "Pronostics quotidiens",
      "Statistiques détaillées",
      "Historique des paris",
      "Support client"
    ];

    const benefitsList = benefits.map(b => `• ${b}`).join('\\n');

    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_SUBSCRIPTION_TEMPLATE_ID!,
      {
        to_email: params.to_email,
        to_name: params.to_name,
        subscription_type: params.subscription_type,
        benefits: benefitsList,
        subscription_date: new Date().toLocaleDateString('fr-FR'),
        next_payment_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR')
      }
    );
    console.log('Email de confirmation d\'abonnement envoyé avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email de confirmation:', error);
    throw error;
  }
};

export const sendPasswordResetEmail = async (params: {
  to_email: string;
  to_name: string;
  reset_link: string;
}) => {
  try {
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_RESET_TEMPLATE_ID!,
      {
        to_email: params.to_email,
        to_name: params.to_name,
        reset_link: params.reset_link
      }
    );
    console.log('Email de réinitialisation envoyé avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email de réinitialisation:', error);
    throw error;
  }
};

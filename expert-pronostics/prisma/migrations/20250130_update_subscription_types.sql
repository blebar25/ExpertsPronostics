-- Mettre à jour les abonnements MONTHLY_PREMIUM en PREMIUM
UPDATE "Subscription"
SET type = 'PREMIUM'
WHERE type = 'MONTHLY_PREMIUM';

-- Mettre à jour les abonnements YEARLY_PREMIUM en PREMIUM
UPDATE "Subscription"
SET type = 'PREMIUM'
WHERE type = 'YEARLY_PREMIUM';

-- Mettre à jour les abonnements MONTHLY_STANDARD en STANDARD
UPDATE "Subscription"
SET type = 'STANDARD'
WHERE type = 'MONTHLY_STANDARD';

-- Mettre à jour les abonnements YEARLY_STANDARD en STANDARD
UPDATE "Subscription"
SET type = 'STANDARD'
WHERE type = 'YEARLY_STANDARD';

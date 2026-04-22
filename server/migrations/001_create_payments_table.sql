-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ad_id UUID NOT NULL REFERENCES ads(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'PKR',
  proof_url TEXT,
  status VARCHAR(50) DEFAULT 'submitted', -- submitted, verified, rejected
  admin_id UUID REFERENCES users(id),
  admin_notes TEXT,
  verified_at TIMESTAMP,
  rejected_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add columns to ads table if they don't exist
ALTER TABLE ads
ADD COLUMN IF NOT EXISTS payment_status VARCHAR(50) DEFAULT 'not_required', -- pending, verified, not_required
ADD COLUMN IF NOT EXISTS moderator_notes TEXT,
ADD COLUMN IF NOT EXISTS moderator_id UUID REFERENCES users(id),
ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMP;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_payments_ad_id ON payments(ad_id);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_ads_status ON ads(status);
CREATE INDEX IF NOT EXISTS idx_ads_user_id ON ads(user_id);

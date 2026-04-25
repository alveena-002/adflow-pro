-- Add image_url column to ads table
ALTER TABLE ads
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_ads_image_url ON ads(image_url);

CREATE TABLE orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  ad_id uuid REFERENCES ads(id),
  buyer_id uuid,
  quantity int DEFAULT 1,
  message text,
  status text DEFAULT 'pending',
  created_at timestamp DEFAULT now()
);

-- Update ads with image URLs based on category
UPDATE ads
SET image_url = CASE 
  WHEN c.name = 'Electronics' THEN 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800&h=600'
  WHEN c.name = 'Real Estate' THEN 'https://images.unsplash.com/photo-1560518099-ce2b3394fdf5?auto=format&fit=crop&q=80&w=800&h=600'
  WHEN c.name = 'Vehicles' THEN 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?auto=format&fit=crop&q=80&w=800&h=600'
  WHEN c.name = 'Services' THEN 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800&h=600'
  WHEN c.name = 'Fashion' THEN 'https://images.unsplash.com/photo-1488554347314-60390e4215da?auto=format&fit=crop&q=80&w=800&h=600'
  WHEN c.name = 'Home & Garden' THEN 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=800&h=600'
  WHEN c.name = 'Books' THEN 'https://images.unsplash.com/photo-1507842072343-583f20270319?auto=format&fit=crop&q=80&w=800&h=600'
  WHEN c.name = 'Sports' THEN 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800&h=600'
  ELSE 'https://via.placeholder.com/800x600?text=No+Image'
END
FROM categories c
WHERE ads.category_id = c.id;

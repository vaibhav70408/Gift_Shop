-- Update a user's email:
UPDATE "users" 
SET "email" = 'new_email@example.com', "updatedAt" = CURRENT_TIMESTAMP
WHERE "userName" = 'test1';


-- Update a theme's price:
UPDATE "themes" 
SET "themePrice" = 120, "updatedAt" = CURRENT_TIMESTAMP
WHERE "themeName" = 'ThemeOne';


-- Update a gift's details and price:
UPDATE "gifts" 
SET "giftDetails" = 'Updated description for Gift1', "giftPrice" = 35, "updatedAt" = CURRENT_TIMESTAMP
WHERE "giftName" = 'Gift1';


UPDATE "orders" 
SET "orderAddress" = '456 New Address St', 
    "orderPhone" = 9876543210, 
    "orderDescription" = 'Updated description for Order1', 
    "orderStatus" = 'processing', 
    "orderUpdatedBy" = 'admin1', 
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "orderName" = 'Order1';
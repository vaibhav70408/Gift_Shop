-- Insert data into users table
INSERT INTO "users" 
    ("userName", "email", "password", "mobileNumber", "userRole", "createdAt", "updatedAt") 
VALUES 
    ('test1', 'test1@epam.com', '$2b$10$RK6RGCaYEaEvwzsWlCM/ve3D1aOsntlOwkMoXOzKT2POiAoWqxSHC', '9959014204', 'ADMIN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('test2', 'test2@epam.com', '$2b$10$nJggrWbbGJiiEGHanEuVnOIZ8JdMayYblE4UhpcuFb22X7WHC1Fr6', '9876543210', 'USER', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('test3', 'test3@epam.com', '$2b$10$R80o8Cyk53AbOuOA1XPGU.20NAOl7FYHZ2iuT7f.qMEgK8T6xLZFK', '9998887776', 'USER', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("userName") DO NOTHING;

-- Insert data into ThemeModel table
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
INSERT INTO "themes" 
    ("themeId", "themeName", "themeDetails", "themePrice", "createdAt", "updatedAt") 
VALUES 
    ('8b86189e-09ba-4f94-973e-6898f75b6453', 'ThemeOne', 'Details for Theme One', 100, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (uuid_generate_v4(), 'ThemeTwo', 'Details for Theme Two', 150, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (uuid_generate_v4(), 'ThemeThree', 'Details for Theme Three', 200, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("themeId") DO NOTHING;

-- Insert data into gifts table
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
INSERT INTO "gifts" ("giftId", "giftName", "giftImageUrl", "giftDetails", "giftPrice", "createdAt", "updatedAt")
VALUES
    ('c01fada7-2628-4033-87cf-50f3e90d94ac', 'Gift1', 'https://images.pexels.com/photos/5472311/pexels-photo-5472311.jpeg?auto=compress&cs=tinysrgb&w=600', 'This is a description for Gift1', 30, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (uuid_generate_v4(), 'Gift2', 'https://images.pexels.com/photos/139764/pexels-photo-139764.jpeg?auto=compress&cs=tinysrgb&w=600', 'This is a description for Gift2', 50, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (uuid_generate_v4(), 'Gift3', 'https://images.pexels.com/photos/8101549/pexels-photo-8101549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'This is a description for Gift3', 100, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("giftId") DO NOTHING;

-- Insert data into orders table
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
INSERT INTO "orders"
    ("orderId", "orderName", "orderDescription", "themeModel", "giftModel", "orderDate", "orderPrice", "orderAddress", "orderPhone", "orderEmail", "orderStatus", "orderUpdatedBy", "createdAt", "updatedAt")
VALUES 
    (
        uuid_generate_v4(),
        'Order1', 
        'This is a description for Order1', 
        '[{"themeId": "8b86189e-09ba-4f94-973e-6898f75b6453", "themeName": "ThemeOne", "themeDetails": "Details for Theme One", "themePrice": 100}]', 
        '{"giftId": "c01fada7-2628-4033-87cf-50f3e90d94ac", "giftName": "Gift1", "giftImageUrl": "https://images.pexels.com/photos/5472311/pexels-photo-5472311.jpeg?auto=compress&cs=tinysrgb&w=600", "giftDetails": "This is a description for Gift1", "giftPrice": 30}', 
        '2022-01-01', 
        100.00, 
        '123 Main St', 
        9876543210, 
        'order1@example.com',
        'confirmed',
        'admin1',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

-- Menu as published on the BURGESTA site (October 2026).

INSERT INTO category (slug, name_uz, name_ru, name_en, note_uz, note_ru, note_en, sort_order) VALUES ('combo', 'Kombo', 'Комбо', 'Combos', 'fri kartoshka va ichimlik bilan', 'с картофелем фри и напитком', 'with fries and a drink', 1);
INSERT INTO category (slug, name_uz, name_ru, name_en, note_uz, note_ru, note_en, sort_order) VALUES ('burger', 'Burgerlar', 'Бургеры', 'Burgers', NULL, NULL, NULL, 2);
INSERT INTO category (slug, name_uz, name_ru, name_en, note_uz, note_ru, note_en, sort_order) VALUES ('sandwich', 'Sendvichlar', 'Сэндвичи', 'Sandwiches', NULL, NULL, NULL, 3);
INSERT INTO category (slug, name_uz, name_ru, name_en, note_uz, note_ru, note_en, sort_order) VALUES ('salad', 'Salatlar', 'Салаты', 'Salads', NULL, NULL, NULL, 4);
INSERT INTO category (slug, name_uz, name_ru, name_en, note_uz, note_ru, note_en, sort_order) VALUES ('sides', 'Nagets va garnirlar', 'Наггетсы и гарниры', 'Nuggets & sides', NULL, NULL, NULL, 5);
INSERT INTO category (slug, name_uz, name_ru, name_en, note_uz, note_ru, note_en, sort_order) VALUES ('coffee', 'Kofe', 'Кофе', 'Coffee', NULL, NULL, NULL, 6);
INSERT INTO category (slug, name_uz, name_ru, name_en, note_uz, note_ru, note_en, sort_order) VALUES ('tea', 'Choy', 'Чай', 'Tea', NULL, NULL, NULL, 7);
INSERT INTO category (slug, name_uz, name_ru, name_en, note_uz, note_ru, note_en, sort_order) VALUES ('lemonade', 'Limonadlar', 'Лимонады', 'Lemonades', NULL, NULL, NULL, 8);
INSERT INTO category (slug, name_uz, name_ru, name_en, note_uz, note_ru, note_en, sort_order) VALUES ('fresh', 'Fresh va milksheyk', 'Фреши и милкшейки', 'Fresh & shakes', NULL, NULL, NULL, 9);
INSERT INTO category (slug, name_uz, name_ru, name_en, note_uz, note_ru, note_en, sort_order) VALUES ('cold', 'Sovuq ichimliklar', 'Холодные напитки', 'Cold drinks', NULL, NULL, NULL, 10);

-- combo
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'combo'), 'Steyk burger kombo', 'Комбо стейк бургер', 'Steak Burger Combo', 75000, 680, 'HIT', 1);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'combo'), 'Tryufel burger kombo', 'Комбо бургер трюфель', 'Truffle Burger Combo', 70000, 700, NULL, 2);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'combo'), 'Tuxumli burger kombo', 'Комбо бургер с яйцом', 'Egg Burger Combo', 60000, 600, NULL, 3);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'combo'), 'Double Klash burger kombo', 'Комбо дабл клаш бургер', 'Double Clash Burger Combo', 57000, 650, NULL, 4);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'combo'), 'Boks Master kombo', 'Комбо бокс мастер', 'Box Master Combo', 52000, 690, NULL, 5);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'combo'), 'Nagetsli burger kombo', 'Комбо бургер наггец', 'Nugget Burger Combo', 50000, 600, NULL, 6);

-- burger
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'burger'), 'Steyk burger', 'Стейк бургер', 'Steak Burger', 58000, 350, 'HIT', 1);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'burger'), 'Burgesta burger', 'Бургеста бургер', 'Burgesta Burger', 52000, 280, 'SIGNATURE', 2);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'burger'), 'Tryufel burger', 'Бургер трюфель', 'Truffle Burger', 54000, 300, NULL, 3);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'burger'), 'Burger trio', 'Бургер трио', 'Burger Trio', 60000, 350, NULL, 4);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'burger'), 'Motsarellali burger', 'Бургер с моцареллой', 'Mozzarella Burger', 48000, 270, NULL, 5);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'burger'), 'Tuxumli burger', 'Бургер с яйцом', 'Egg Burger', 43000, 270, NULL, 6);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'burger'), 'Double motsarella burger', 'Дабл бургер с моцареллой', 'Double Mozzarella Burger', 41000, 450, NULL, 7);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'burger'), 'Chizburger', 'Чизбургер', 'Cheeseburger', 40000, 270, NULL, 8);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'burger'), 'Double Klash burger', 'Дабл бургер клаш', 'Double Clash Burger', 38000, 450, NULL, 9);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'burger'), 'Gamburger', 'Гамбургер', 'Hamburger', 37000, 250, NULL, 10);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'burger'), 'Tovuqli burger', 'Бургер с курицей', 'Chicken Burger', 36000, 300, NULL, 11);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'burger'), 'Nagetsli burger', 'Бургер с наггецом', 'Nugget Burger', 34000, 270, NULL, 12);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'burger'), 'Kartoshkali burger', 'Бургер с картошкой', 'Potato Burger', 33000, 250, NULL, 13);

-- sandwich
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'sandwich'), 'Baliqli sendvich', 'Сендвич с рыбой', 'Fish Sandwich', 75000, 250, NULL, 1);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'sandwich'), 'Klab sendvich (tovuq soni)', 'Клаб сендвич бедро', 'Club Sandwich (chicken thigh)', 46000, 250, NULL, 2);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'sandwich'), 'Klab sendvich', 'Клаб сэндвич', 'Club Sandwich', 46000, 300, NULL, 3);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'sandwich'), 'Tovuqli sendvich', 'Сендвич с курицей', 'Chicken Sandwich', 46000, 250, NULL, 4);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'sandwich'), 'Kurka go‘shtli sendvich', 'Сендвич с индейкой', 'Turkey Sandwich', 40000, 250, NULL, 5);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'sandwich'), 'Klab sendvich Sezar', 'Клаб сендвич цезарь', 'Caesar Club Sandwich', 37000, 250, NULL, 6);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'sandwich'), 'Boks Master L', 'Бокс мастер L', 'Box Master L', 35000, 270, NULL, 7);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'sandwich'), 'Boks Master S', 'Бокс мастер S', 'Box Master S', 31000, 250, NULL, 8);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'sandwich'), 'Nagetsli hot-dog', 'Хот дог с наггетсом', 'Nugget Hot Dog', 20000, 250, NULL, 9);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'sandwich'), 'Hot-dog', 'Хотдог', 'Hot Dog', 18000, 230, NULL, 10);

-- salad
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'salad'), 'Sezar salati', 'Цезарь салат', 'Caesar Salad', 42000, 300, NULL, 1);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'salad'), 'Grek salati', 'Греческий салат', 'Greek Salad', 42000, 300, NULL, 2);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'salad'), 'Karam salati', 'Салат с капустой', 'Coleslaw', 15000, 200, NULL, 3);

-- sides
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'sides'), 'Tovuq qanotlari, 16 dona', 'Куриные крылышки 16 шт.', 'Chicken Wings, 16 pcs', 92000, 300, NULL, 1);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'sides'), 'Tovuq qanotlari, 8 dona', 'Куриные крылышки 8 шт.', 'Chicken Wings, 8 pcs', 49000, 200, NULL, 2);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'sides'), 'Nagets', 'Наггетсы', 'Nuggets', 38000, 200, NULL, 3);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'sides'), 'Tovuq qanotlari, 5 dona', 'Куриные крылышки 5 шт.', 'Chicken Wings, 5 pcs', 33000, 100, NULL, 4);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'sides'), 'Pishloq tayoqchalari', 'Сырные палочки', 'Cheese Sticks', 18000, 120, NULL, 5);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'sides'), 'Fri kartoshka', 'Картофель фри', 'French Fries', 17000, 150, NULL, 6);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'sides'), 'Qishloqcha kartoshka', 'Картофель по-деревенски', 'Country-style Potatoes', 17000, 180, NULL, 7);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'sides'), 'Kartoshka sharchalari', 'Картофельные шарики', 'Potato Balls', 17000, 150, NULL, 8);

-- coffee
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'coffee'), 'Bumble kofe', 'Bumble кофе', 'Bumble Coffee', 45000, NULL, NULL, 1);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'coffee'), 'Sitrusli raf', 'Раф с цитрусом', 'Citrus Raf', 40000, NULL, NULL, 2);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'coffee'), 'Double kapuchino', 'Дабл капучино', 'Double Cappuccino', 35000, NULL, NULL, 3);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'coffee'), 'Bergamotli latte', 'Латте с бергамотом', 'Bergamot Latte', 35000, NULL, NULL, 4);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'coffee'), 'Flet uayt', 'Флэт уайт', 'Flat White', 30000, NULL, NULL, 5);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'coffee'), 'Bananli kakao', 'Какао с бананом', 'Banana Cocoa', 30000, NULL, NULL, 6);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'coffee'), 'Kakao', 'Какао', 'Cocoa', 30000, NULL, NULL, 7);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'coffee'), 'Kapuchino', 'Капучино', 'Cappuccino', 25000, NULL, NULL, 8);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'coffee'), 'Latte makiato', 'Латте макиато', 'Latte Macchiato', 25000, NULL, NULL, 9);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'coffee'), 'Double amerikano', 'Дабл американо', 'Double Americano', 25000, NULL, NULL, 10);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'coffee'), 'Double espresso', 'Дабл эспрессо', 'Double Espresso', 25000, NULL, NULL, 11);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'coffee'), 'Amerikano', 'Американо', 'Americano', 20000, NULL, NULL, 12);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'coffee'), 'Espresso', 'Эспрессо', 'Espresso', 20000, NULL, NULL, 13);

-- tea
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'tea'), 'Malina va zanjabil choyi', 'Малиновый и имбирный чай', 'Raspberry & Ginger Tea', 42000, NULL, NULL, 1);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'tea'), 'Zanjabil choyi', 'Имбирный чай', 'Ginger Tea', 35000, NULL, NULL, 2);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'tea'), 'Chakanda va apelsin choyi', 'Чай с облепихой и апельсином', 'Sea Buckthorn & Orange Tea', 35000, NULL, NULL, 3);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'tea'), 'Rezavor meva choyi', 'Ягодный чай', 'Berry Tea', 35000, NULL, NULL, 4);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'tea'), 'Erl Grey', 'Эрл Грей', 'Earl Grey', 10000, NULL, NULL, 5);

-- lemonade
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'lemonade'), 'Malina va marakuyya limonadi', 'Малиновый маракуйя лимонад', 'Raspberry Passion Fruit Lemonade', 40000, NULL, NULL, 1);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'lemonade'), 'Marakuyya va mango limonadi', 'Маракуйя манго лимонад', 'Passion Fruit Mango Lemonade', 35000, NULL, NULL, 2);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'lemonade'), 'Malina va shaftoli limonadi', 'Малиновый персиковый лимонад', 'Raspberry Peach Lemonade', 35000, NULL, NULL, 3);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'lemonade'), 'Sitrus va gibiskus limonadi', 'Цитрусовый гибискус лимонад', 'Citrus Hibiscus Lemonade', 30000, NULL, NULL, 4);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'lemonade'), 'Qulupnay va ananas limonadi', 'Клубничный ананас лимонад', 'Strawberry Pineapple Lemonade', 30000, NULL, NULL, 5);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'lemonade'), 'Sitrusli choy', 'Цитрусовый чай', 'Citrus Iced Tea', 30000, NULL, NULL, 6);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'lemonade'), 'Ays ti', 'Айс ти', 'Iced Tea', 25000, NULL, NULL, 7);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'lemonade'), 'Jasminli ays ti', 'Айс ти с жасмином', 'Jasmine Iced Tea', 25000, NULL, NULL, 8);

-- fresh
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'fresh'), 'Apelsin freshi', 'Фреш апельсиновый', 'Orange Juice', 40000, NULL, NULL, 1);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'fresh'), 'Kivi va olma smuzi', 'Смузи киви и яблоко', 'Kiwi & Apple Smoothie', 40000, NULL, NULL, 2);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'fresh'), 'Sitrus smuzi', 'Смузи цитрусовый', 'Citrus Smoothie', 40000, NULL, NULL, 3);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'fresh'), 'Shokoladli milksheyk', 'Милкшейк шоколадный', 'Chocolate Milkshake', 40000, NULL, NULL, 4);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'fresh'), 'Qulupnayli milksheyk', 'Милкшейк клубничный', 'Strawberry Milkshake', 40000, NULL, NULL, 5);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'fresh'), 'Shaftoli smuzi', 'Смузи персик', 'Peach Smoothie', 35000, NULL, NULL, 6);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'fresh'), 'Yashil smuzi', 'Смузи зелёный', 'Green Smoothie', 35000, NULL, NULL, 7);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'fresh'), 'Bananli milksheyk', 'Милкшейк банановый', 'Banana Milkshake', 35000, NULL, NULL, 8);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'fresh'), 'Oreo milksheyk', 'Милкшейк Орео', 'Oreo Milkshake', 35000, NULL, NULL, 9);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'fresh'), 'Sabzi va olma freshi', 'Фреш морковь и яблоко', 'Carrot & Apple Juice', 30000, NULL, NULL, 10);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'fresh'), 'Olma freshi', 'Фреш яблоко', 'Apple Juice', 30000, NULL, NULL, 11);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'fresh'), 'Sabzi freshi', 'Фреш морковный', 'Carrot Juice', 30000, NULL, NULL, 12);

-- cold
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'cold'), 'Red Bull', 'Red Bull', 'Red Bull', 25000, NULL, NULL, 1);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'cold'), 'Coca-Cola, banka 0,45 l', 'Кола в банке 0,45 л', 'Coca-Cola, can 0.45 L', 15000, NULL, NULL, 2);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'cold'), 'Fanta, banka 0,45 l', 'Фанта в банке 0,45 л', 'Fanta, can 0.45 L', 15000, NULL, NULL, 3);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'cold'), 'Sprite, banka 0,45 l', 'Спрайт в банке 0,45 л', 'Sprite, can 0.45 L', 15000, NULL, NULL, 4);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'cold'), 'Fuse Tea, banka 0,45 l', 'Fuse Tea в банке 0,45 л', 'Fuse Tea, can 0.45 L', 12000, NULL, NULL, 5);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'cold'), 'Coca-Cola 0,5 l', 'Кола 0,5 л', 'Coca-Cola 0.5 L', 10000, NULL, NULL, 6);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'cold'), 'Fanta 0,5 l', 'Фанта 0,5 л', 'Fanta 0.5 L', 10000, NULL, NULL, 7);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'cold'), 'Sprite 0,5 l', 'Спрайт 0,5 л', 'Sprite 0.5 L', 10000, NULL, NULL, 8);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'cold'), 'Fuse Tea 0,5 l', 'Fuse Tea 0,5 л', 'Fuse Tea 0.5 L', 10000, NULL, NULL, 9);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'cold'), 'Coca-Cola, banka 0,25 l', 'Кола в банке 0,25 л', 'Coca-Cola, can 0.25 L', 10000, NULL, NULL, 10);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'cold'), 'Fanta, banka 0,25 l', 'Фанта в банке 0,25 л', 'Fanta, can 0.25 L', 10000, NULL, NULL, 11);
INSERT INTO menu_item (category_id, name_uz, name_ru, name_en, price, weight_grams, tag, sort_order) VALUES ((SELECT id FROM category WHERE slug = 'cold'), 'Sprite, banka 0,25 l', 'Спрайт в банке 0,25 л', 'Sprite, can 0.25 L', 10000, NULL, NULL, 12);

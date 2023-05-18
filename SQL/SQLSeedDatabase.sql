INSERT INTO Difficulty ([Name], Reward)
VALUES
    ('Easy', 5),
    ('Average', 10),
    ('Difficult', 25),
    ('Impossible', 50);

INSERT INTO UserType ([Name])
VALUES
    ('Admin'),
    ('User');

INSERT INTO [User] (FirebaseId, UserName, FirstName, LastName, Email, ImageLocation, Currency, Locked, UserTypeId)
VALUES 
    ('8GLs1YrrM0X8a32TbeupiaOvay73', 'Jirossushi', 'Jiro', 'Fujimoto', 'jirossushi@example.com', 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 0, 0, 1),
    ('dNLwF9uGGPfr9iTxGKcyBVdhyBw2', 'Mysteryman', 'John', 'Smith', 'john.smith@example.com', 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 40, 0, 2),
    ('MTWS3S8JsPTQQhkY1T8DR4Mn0DW2', 'MaybeJane', 'Jane', 'Doe', 'jane.doe@example.com', 'https://images.pexels.com/photos/3646160/pexels-photo-3646160.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 25, 0, 2),
    ('fvWJw6BDIHVzkgFwTtt2znIhI9L2', 'Kalex', 'Alex', 'Kim', 'alex.kim@example.com', 'https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 20, 0, 2),
    ('i4t13zWE3nhSWRF0ZRy7Q7Nda9J2', 'MasterAngler', 'Bob', 'Johnson', 'bob.johnson@example.com', 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 10, 0, 2),
    ('NMRsdiGm6SerE7v8sebpBXm4mSC2', 'Chene', 'Emily', 'Chen', 'emily.chen@example.com', 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 5, 0, 2);

INSERT INTO Bounty ([Name], [Description], Species, [Location], Notes, DateCompleted, ImageLocation, DifficultyId)
VALUES 
    ('Biggest Catch', 'Catch the biggest fish in the lake', 'Bass', 'Lake Tahoe', 'Only open to fishing enthusiasts with a valid fishing license', NULL, 'https://images.pexels.com/photos/537393/pexels-photo-537393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 2),
    ('Swordfish Hunter', 'Catch a swordfish weighing over 500 pounds', 'Swordfish', 'Gulf of Mexico', 'Requires a special fishing license and a large boat', NULL, 'https://images.pexels.com/photos/15421133/pexels-photo-15421133.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 3),
    ('Mako Shark Challenge', 'Catch a mako shark over 8 feet long', 'Mako Shark', 'North Atlantic Ocean', 'Known for their incredible speed and strength', NULL, 'https://images.pexels.com/photos/2747248/pexels-photo-2747248.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 3),
    ('Trout Trek', 'Catch a trout in every river in the state', 'Trout', 'Various rivers throughout the state', 'Requires travel and knowledge of different fishing techniques', NULL, 'https://images.pexels.com/photos/1144176/pexels-photo-1144176.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 2),
    ('The Elusive Catfish', 'Catch a catfish over 50 pounds', 'Catfish', 'Mississippi River', 'Known for their size and strength', NULL, 'https://images.pexels.com/photos/10952804/pexels-photo-10952804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 2),
    ('Giant Bluefin Tuna', 'Catch a bluefin tuna over 800 pounds', 'Bluefin Tuna', 'Atlantic Ocean', 'Known for their size and delicious flavor', NULL, 'https://images.pexels.com/photos/12829694/pexels-photo-12829694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 3),
    ('Yellowtail Kingfisher', 'Catch a yellowtail kingfish over 30 pounds', 'Yellowtail Kingfish', 'Pacific Ocean', 'Requires knowledge of different fishing techniques and a sturdy boat', '4/15/2023 12:05:34 PM', 'https://images.pexels.com/photos/747016/pexels-photo-747016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 1),
    ('The Great White', 'Catch a great white shark over 10 feet long', 'Great White Shark', 'Off the coast of Australia', 'Requires a special fishing license and experience with shark fishing', NULL, 'https://images.pexels.com/photos/6497794/pexels-photo-6497794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 3),
    ('Red Snapper Rodeo', 'Catch as many red snappers as possible in one day', 'Red Snapper', 'Gulf of Mexico', 'Requires a boat and knowledge of where to find red snappers', '2/11/2023 12:05:34 PM', 'https://images.pexels.com/photos/8351892/pexels-photo-8351892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 1),
    ('Walleye Warrior', 'Catch a walleye over 30 inches long', 'Walleye', 'Great Lakes', 'Requires knowledge of different fishing techniques and a boat', NULL, 'https://images.pexels.com/photos/8352393/pexels-photo-8352393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 2),
    ('Bassmaster Classic', 'Catch the most bass in a single day', 'Bass', 'Lake Lanier', 'One of the biggest bass fishing tournaments in the world', '12/6/2022 12:05:34 PM', 'https://images.pexels.com/photos/4343735/pexels-photo-4343735.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 2),
    ('Trophy Pike Quest', 'Catch a pike over 40 inches long', 'Pike', 'Canadian lakes', 'Requires cold water fishing techniques and patience', '11/2/2022 12:05:34 PM', 'https://images.pexels.com/photos/3775188/pexels-photo-3775188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 2),
    ('Atlantic Salmon Adventure', 'Catch an Atlantic salmon over 20 pounds', 'Atlantic Salmon', 'Norwegian rivers', 'Requires knowledge of fly fishing and a sense of adventure', NULL, 'https://images.pexels.com/photos/3656989/pexels-photo-3656989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 2),
    ('Trifecta Challenge', 'Catch a trout, bass, and catfish in one day', 'Trout, Bass, Catfish', 'Local lake', 'Requires knowledge of different fishing techniques and some luck', NULL, 'https://images.pexels.com/photos/247600/pexels-photo-247600.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 2),
    ('Hawaiian Ahi Challenge', 'Catch a yellowfin tuna over 100 pounds', 'Yellowfin Tuna', 'Hawaii', 'Requires a boat', NULL, 'https://images.pexels.com/photos/2521620/pexels-photo-2521620.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 2);

INSERT INTO UserBounty (UserId, BountyId)
VALUES
    (2, 1),
    (2, 3),
    (2, 5),
    (2, 7),
    (2, 9),
    (3, 2),
    (3, 4),
    (3, 11),
    (4, 1),
    (4, 2),
    (4, 12),
    (5, 3),
    (5, 4),
    (6, 5);

INSERT INTO Sushi ([Name], [Description], Price, Inventory, ImageLocation, BountyId)
VALUES
    ('Yellowtail Roll', 'Yellowtail meat, avocado, and cucumber', 5, 50, 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 7),
    ('Red Hot Snapper Roll', 'Red Snapper, spicy sauce, and rice', 10, 40, 'https://images.pexels.com/photos/684965/pexels-photo-684965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 9),
    ('Bass Sushi', 'Fresh Bass and rice', 8, 30, 'https://images.pexels.com/photos/2098143/pexels-photo-2098143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 11),
    ('Pike Roll', 'Grilled Pike and avocado', 12, 20, 'https://images.pexels.com/photos/1148086/pexels-photo-1148086.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 12);

INSERT INTO SushiOrder (SushiId, UserId, DateCreated, DateCompleted)
VALUES
    (1, 2, '2/11/2023 12:05:34 PM', NULL),
    (1, 5, '1/15/2023 12:05:34 PM', NULL),
    (2, 4, '12/13/2022 12:05:34 PM', NULL),
    (2, 3, '10/9/2022 12:05:34 PM', NULL),
    (3, 6, '9/20/2022 12:05:34 PM', NULL),
    (3, 5, '5/23/2022 12:05:34 PM', NULL),
    (4, 2, '3/19/2022 12:05:34 PM', '3/22/2022 12:05:34 PM'),
    (4, 3, '2/22/2022 12:05:34 PM', '2/25/2022 12:05:34 PM');
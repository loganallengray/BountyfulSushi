INSERT INTO Difficulty ([Name])
VALUES
    ('Easy'),
    ('Average'),
    ('Difficult'),
    ('Impossible');

INSERT INTO UserType ([Name])
VALUES
    ('Admin'),
    ('User');

INSERT INTO [User] (FirebaseId, [Name], Email, ImageLocation, UserTypeId)
VALUES 
    ('123456789abcdef', 'Jiro Fujimoto', 'jirossushi@example.com', NULL, 1),
    ('123456789abcdef', 'John Smith', 'john.smith@example.com', NULL, 2),
    ('234567890bcdefg', 'Jane Doe', 'jane.doe@example.com', NULL, 2),
    ('34567890cdefgh', 'Alex Kim', 'alex.kim@example.com', NULL, 2),
    ('456789', 'Bob Johnson', 'bob.johnson@example.com', NULL, 2),
    ('56789', 'Emily Chen', 'emily.chen@example.com', NULL, 2);

INSERT INTO Bounty ([Name], [Description], Species, [Location], Notes, DateCompleted, DifficultyId)
VALUES 
    ('Biggest Catch', 'Catch the biggest fish in the lake', 'Bass', 'Lake Tahoe', 'Only open to fishing enthusiasts with a valid fishing license', NULL, 2),
    ('Swordfish Hunter', 'Catch a swordfish weighing over 500 pounds', 'Swordfish', 'Gulf of Mexico', 'Requires a special fishing license and a large boat', NULL, 3),
    ('Mako Shark Challenge', 'Catch a mako shark over 8 feet long', 'Mako Shark', 'North Atlantic Ocean', 'Known for their incredible speed and strength', NULL, 3),
    ('Trout Trek', 'Catch a trout in every river in the state', 'Trout', 'Various rivers throughout the state', 'Requires travel and knowledge of different fishing techniques', NULL, 1),
    ('The Elusive Catfish', 'Catch a catfish over 50 pounds', 'Catfish', 'Mississippi River', 'Known for their size and strength', NULL, 3);

INSERT INTO UserBounty (UserId, BountyId)
VALUES
    (2, 1),
    (2, 3),
    (2, 5),
    (3, 2),
    (3, 4),
    (4, 1),
    (4, 2),
    (5, 3),
    (5, 4),
    (6, 5);
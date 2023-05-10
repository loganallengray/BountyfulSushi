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

INSERT INTO [User] (FirebaseId, UserName, FirstName, LastName, Email, ImageLocation, Locked, UserTypeId)
VALUES 
    ('123456789abcdef', 'Jirossushi', 'Jiro', 'Fujimoto', 'jirossushi@example.com', 'https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 0, 1),
    ('123456789abcdef', 'Mysteryman', 'John', 'Smith', 'john.smith@example.com', 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 0, 2),
    ('234567890bcdefg', 'MaybeJane', 'Jane', 'Doe', 'jane.doe@example.com', 'https://images.pexels.com/photos/3646160/pexels-photo-3646160.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 0, 2),
    ('34567890cdefgh', 'Kalex', 'Alex', 'Kim', 'alex.kim@example.com', 'https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 0, 2),
    ('456789', 'MasterAngler', 'Bob', 'Johnson', 'bob.johnson@example.com', 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 0, 2),
    ('56789', 'Chene', 'Emily', 'Chen', 'emily.chen@example.com', 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 0, 2);

INSERT INTO Bounty ([Name], [Description], Species, [Location], Notes, DateCompleted, ImageLocation, DifficultyId)
VALUES 
    ('Biggest Catch', 'Catch the biggest fish in the lake', 'Bass', 'Lake Tahoe', 'Only open to fishing enthusiasts with a valid fishing license', NULL, 'https://images.pexels.com/photos/537393/pexels-photo-537393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 2),
    ('Swordfish Hunter', 'Catch a swordfish weighing over 500 pounds', 'Swordfish', 'Gulf of Mexico', 'Requires a special fishing license and a large boat', NULL, 'https://images.pexels.com/photos/15421133/pexels-photo-15421133.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 3),
    ('Mako Shark Challenge', 'Catch a mako shark over 8 feet long', 'Mako Shark', 'North Atlantic Ocean', 'Known for their incredible speed and strength', NULL, 'https://images.pexels.com/photos/2747248/pexels-photo-2747248.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 3),
    ('Trout Trek', 'Catch a trout in every river in the state', 'Trout', 'Various rivers throughout the state', 'Requires travel and knowledge of different fishing techniques', NULL, 'https://images.pexels.com/photos/1144176/pexels-photo-1144176.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 1),
    ('The Elusive Catfish', 'Catch a catfish over 50 pounds', 'Catfish', 'Mississippi River', 'Known for their size and strength', NULL, 'https://images.pexels.com/photos/10952804/pexels-photo-10952804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 3);

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
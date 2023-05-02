CREATE TABLE [User] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [FirebaseId] varchar(28) NOT NULL,
  [Name] varchar(50) NOT NULL,
  [Email] varchar(50) NOT NULL,
  [ImageLocation] nvarchar(255),
  [UserTypeId] int NOT NULL
)
GO

CREATE TABLE [UserType] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Bounty] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [Description] nvarchar(255) NOT NULL,
  [Species] nvarchar(255),
  [Location] nvarchar(255),
  [Notes] nvarchar(255),
  [DateCompleted] datetime,
  [DifficultyId] int NOT NULL
)
GO

CREATE TABLE [Difficulty] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [UserBounty] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UserId] int NOT NULL,
  [BountyId] int NOT NULL
)
GO

ALTER TABLE [User] ADD FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([Id])
GO

ALTER TABLE [UserBounty] ADD FOREIGN KEY ([BountyId]) REFERENCES [Bounty] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [UserBounty] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [Bounty] ADD FOREIGN KEY ([DifficultyId]) REFERENCES [Difficulty] ([Id])
GO

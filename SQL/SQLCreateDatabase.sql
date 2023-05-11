USE [master]

IF db_id('BountyfulSushi') IS NULl
  CREATE DATABASE [BountyfulSushi]
GO

USE [BountyfulSushi]
GO

DROP TABLE IF EXISTS [User];
DROP TABLE IF EXISTS [UserType];
DROP TABLE IF EXISTS [Bounty];
DROP TABLE IF EXISTS [Difficulty];
DROP TABLE IF EXISTS [UserBounty];
GO

CREATE TABLE [User] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [FirebaseId] varchar(28) NOT NULL,
  [UserName] varchar(50) NOT NULL,
  [FirstName] varchar(50) NOT NULL,
  [LastName] varchar(50) NOT NULL,
  [Email] varchar(100) NOT NULL,
  [Currency] int NOT NULL,
  [Locked] bit NOT NULL,
  [ImageLocation] nvarchar(255) NOT NULL,
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
  [ImageLocation] nvarchar(255) NOT NULL,
  [DifficultyId] int NOT NULL
)
GO

CREATE TABLE [Difficulty] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [Reward] int NOT NULL
)
GO

CREATE TABLE [UserBounty] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UserId] int NOT NULL,
  [BountyId] int NOT NULL
)
GO

CREATE TABLE [Sushi] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [Description] nvarchar(255) NOT NULL,
  [Price] int NOT NULL,
  [Inventory] int,
  [ImageLocation] nvarchar(255) NOT NULL,
  [BountyId] int NOT NULL
)
GO

CREATE TABLE [SushiOrder] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [SushiId] int NOT NULL,
  [UserId] int NOT NULL
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

ALTER TABLE [Sushi] ADD FOREIGN KEY ([BountyId]) REFERENCES [Bounty] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [SushiOrder] ADD FOREIGN KEY ([SushiId]) REFERENCES [Sushi] ([Id])
GO

ALTER TABLE [SushiOrder] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

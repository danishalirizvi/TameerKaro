USE [master]
GO
/****** Object:  Database [TameerKaroDB]    Script Date: 8/9/2020 3:27:29 PM ******/
CREATE DATABASE [TameerKaroDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'TameerKaroDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA\TameerKaroDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'TameerKaroDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA\TameerKaroDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [TameerKaroDB] SET COMPATIBILITY_LEVEL = 130
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [TameerKaroDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [TameerKaroDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [TameerKaroDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [TameerKaroDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [TameerKaroDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [TameerKaroDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [TameerKaroDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [TameerKaroDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [TameerKaroDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [TameerKaroDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [TameerKaroDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [TameerKaroDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [TameerKaroDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [TameerKaroDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [TameerKaroDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [TameerKaroDB] SET  DISABLE_BROKER 
GO
ALTER DATABASE [TameerKaroDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [TameerKaroDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [TameerKaroDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [TameerKaroDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [TameerKaroDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [TameerKaroDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [TameerKaroDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [TameerKaroDB] SET RECOVERY FULL 
GO
ALTER DATABASE [TameerKaroDB] SET  MULTI_USER 
GO
ALTER DATABASE [TameerKaroDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [TameerKaroDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [TameerKaroDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [TameerKaroDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [TameerKaroDB] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'TameerKaroDB', N'ON'
GO
ALTER DATABASE [TameerKaroDB] SET QUERY_STORE = OFF
GO
USE [TameerKaroDB]
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
USE [TameerKaroDB]
GO
/****** Object:  Table [dbo].[Address]    Script Date: 8/9/2020 3:27:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Address](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[USER_ID] [int] NOT NULL,
	[Address] [varchar](250) NOT NULL,
	[CITY] [varchar](50) NOT NULL,
	[Type] [varchar](50) NULL,
	[IsActive] [bit] NULL,
 CONSTRAINT [PK_Address] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Admin]    Script Date: 8/9/2020 3:27:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Admin](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](100) NOT NULL,
	[Email] [varchar](100) NULL,
	[Phone] [varchar](100) NULL,
	[Username] [varchar](100) NOT NULL,
	[Password] [varchar](max) NOT NULL,
	[IsActive] [bit] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cart_Item]    Script Date: 8/9/2020 3:27:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cart_Item](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[PROD_ADVT_ID] [int] NOT NULL,
	[CART_ID] [int] NOT NULL,
	[QUNT] [int] NOT NULL,
	[UNIT_PRCE] [int] NOT NULL,
	[AMNT] [int] NOT NULL,
	[VNDR_ID] [int] NOT NULL,
	[IsActive] [bit] NULL,
 CONSTRAINT [PK_Cart_Item] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Customer]    Script Date: 8/9/2020 3:27:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customer](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[FRST_NME] [varchar](50) NOT NULL,
	[LAST_NME] [varchar](50) NULL,
	[EMAIL] [varchar](150) NOT NULL,
	[PHNE] [varchar](150) NULL,
	[USR_NME] [varchar](100) NOT NULL,
	[PSWD] [varchar](max) NOT NULL,
	[IsActive] [bit] NULL,
 CONSTRAINT [PK_Customer] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Images]    Script Date: 8/9/2020 3:27:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Images](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Path] [varchar](max) NOT NULL,
	[FId] [int] NOT NULL,
	[Type] [varchar](150) NULL,
	[IsActive] [nchar](10) NULL,
 CONSTRAINT [PK_Images] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Prod_Advt]    Script Date: 8/9/2020 3:27:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Prod_Advt](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[PROD_TYPE_ID] [int] NOT NULL,
	[DSCP] [varchar](450) NULL,
	[VNDR_ID] [int] NOT NULL,
	[UNIT_PRICE] [int] NOT NULL,
	[MAX_ORDR_LIMT] [int] NULL,
	[DLVRY_AVLB] [bit] NULL,
	[POST_DATE] [datetime] NOT NULL,
	[STUS_NME] [varchar](50) NOT NULL,
	[IsDeleted] [bit] NULL,
	[IsActive] [bit] NULL,
 CONSTRAINT [PK_Prod_Advt] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product_Type]    Script Date: 8/9/2020 3:27:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product_Type](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[NME] [varchar](50) NOT NULL,
	[DSCP] [varchar](100) NULL,
	[EXT_CODE] [int] NULL,
	[Unit] [varchar](50) NULL,
	[IsActive] [bit] NULL,
 CONSTRAINT [PK_Product_Type] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Purchase_Order]    Script Date: 8/9/2020 3:27:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Purchase_Order](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[CART_ITEM_ID] [int] NOT NULL,
	[VNDR_ID] [int] NOT NULL,
	[CSTMR_ID] [int] NOT NULL,
	[STATUS] [varchar](50) NOT NULL,
	[SHPNG_ADRS] [varchar](max) NOT NULL,
	[IsActive] [bit] NULL,
 CONSTRAINT [PK_Purchase_Order] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Rates]    Script Date: 8/9/2020 3:27:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Rates](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Prod_Type_ID] [int] NOT NULL,
	[EntryDate] [datetime] NULL,
	[ExpiryDate] [datetime] NULL,
	[Rate] [int] NULL,
	[IsActive] [bit] NOT NULL,
 CONSTRAINT [PK_Rates] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Shopping_Cart]    Script Date: 8/9/2020 3:27:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Shopping_Cart](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[CSTMR_ID] [int] NOT NULL,
	[TOTL_AMNT] [int] NOT NULL,
	[IsActive] [bit] NULL,
 CONSTRAINT [PK_Shopping_Cart] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Status]    Script Date: 8/9/2020 3:27:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Status](
	[NME] [varchar](50) NOT NULL,
	[Flag] [varchar](50) NULL,
	[DSCP] [varchar](250) NULL,
	[IsActive] [bit] NULL,
 CONSTRAINT [PK_Status] PRIMARY KEY CLUSTERED 
(
	[NME] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Vendor]    Script Date: 8/9/2020 3:27:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Vendor](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[FRST_NME] [varchar](50) NULL,
	[LAST_NME] [varchar](50) NULL,
	[EMAIL] [varchar](100) NULL,
	[PHNE] [varchar](100) NULL,
	[BSNS_NME] [varchar](100) NULL,
	[USR_NME] [varchar](50) NULL,
	[PSWD] [varchar](max) NULL,
	[IsActive] [bit] NULL,
 CONSTRAINT [PK_Vendor] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Address] ON 

INSERT [dbo].[Address] ([ID], [USER_ID], [Address], [CITY], [Type], [IsActive]) VALUES (1, 1, N'CG, LHR', N'Lahore', N'Customer', 1)
INSERT [dbo].[Address] ([ID], [USER_ID], [Address], [CITY], [Type], [IsActive]) VALUES (2, 1, N'SK, LHR', N'Lahore', N'Vendor', 1)
INSERT [dbo].[Address] ([ID], [USER_ID], [Address], [CITY], [Type], [IsActive]) VALUES (3, 2, N'PP, GRW', N'Gujranwala', N'Vendor', 1)
INSERT [dbo].[Address] ([ID], [USER_ID], [Address], [CITY], [Type], [IsActive]) VALUES (4, 2, N'PS, LHR', N'Lahore', N'Customer', 1)
INSERT [dbo].[Address] ([ID], [USER_ID], [Address], [CITY], [Type], [IsActive]) VALUES (5, 3, N'asda ads asdadas', N'LHR', N'Vendor', 1)
INSERT [dbo].[Address] ([ID], [USER_ID], [Address], [CITY], [Type], [IsActive]) VALUES (6, 4, N'adssa', N'lhr', N'Vendor', 1)
SET IDENTITY_INSERT [dbo].[Address] OFF
SET IDENTITY_INSERT [dbo].[Admin] ON 

INSERT [dbo].[Admin] ([ID], [Name], [Email], [Phone], [Username], [Password], [IsActive]) VALUES (1, N'danish', N'd@g.co', N'0300', N'da', N'1000:1B/NcDzkvCSEOSN5M2gFPJrxd/od7DuF:mz256wi3Y5ClUNkYon1qU+/SrpQ=', 1)
SET IDENTITY_INSERT [dbo].[Admin] OFF
SET IDENTITY_INSERT [dbo].[Cart_Item] ON 

INSERT [dbo].[Cart_Item] ([ID], [PROD_ADVT_ID], [CART_ID], [QUNT], [UNIT_PRCE], [AMNT], [VNDR_ID], [IsActive]) VALUES (1, 1, 1, 12, 10, 120, 1, 0)
INSERT [dbo].[Cart_Item] ([ID], [PROD_ADVT_ID], [CART_ID], [QUNT], [UNIT_PRCE], [AMNT], [VNDR_ID], [IsActive]) VALUES (2, 1, 2, 100, 10, 1000, 1, 0)
INSERT [dbo].[Cart_Item] ([ID], [PROD_ADVT_ID], [CART_ID], [QUNT], [UNIT_PRCE], [AMNT], [VNDR_ID], [IsActive]) VALUES (3, 1, 3, 150, 10, 1500, 1, 0)
INSERT [dbo].[Cart_Item] ([ID], [PROD_ADVT_ID], [CART_ID], [QUNT], [UNIT_PRCE], [AMNT], [VNDR_ID], [IsActive]) VALUES (4, 1, 4, 100, 10, 1000, 1, 0)
INSERT [dbo].[Cart_Item] ([ID], [PROD_ADVT_ID], [CART_ID], [QUNT], [UNIT_PRCE], [AMNT], [VNDR_ID], [IsActive]) VALUES (5, 3, 4, 10, 500, 5000, 2, 0)
INSERT [dbo].[Cart_Item] ([ID], [PROD_ADVT_ID], [CART_ID], [QUNT], [UNIT_PRCE], [AMNT], [VNDR_ID], [IsActive]) VALUES (6, 1, 5, 1, 10, 10, 1, 0)
INSERT [dbo].[Cart_Item] ([ID], [PROD_ADVT_ID], [CART_ID], [QUNT], [UNIT_PRCE], [AMNT], [VNDR_ID], [IsActive]) VALUES (7, 3, 5, 1, 500, 500, 2, 0)
INSERT [dbo].[Cart_Item] ([ID], [PROD_ADVT_ID], [CART_ID], [QUNT], [UNIT_PRCE], [AMNT], [VNDR_ID], [IsActive]) VALUES (8, 1, 6, 2, 10, 20, 1, 0)
INSERT [dbo].[Cart_Item] ([ID], [PROD_ADVT_ID], [CART_ID], [QUNT], [UNIT_PRCE], [AMNT], [VNDR_ID], [IsActive]) VALUES (9, 3, 6, 2, 500, 1000, 2, 0)
INSERT [dbo].[Cart_Item] ([ID], [PROD_ADVT_ID], [CART_ID], [QUNT], [UNIT_PRCE], [AMNT], [VNDR_ID], [IsActive]) VALUES (10, 1, 7, 12, 10, 120, 1, 0)
INSERT [dbo].[Cart_Item] ([ID], [PROD_ADVT_ID], [CART_ID], [QUNT], [UNIT_PRCE], [AMNT], [VNDR_ID], [IsActive]) VALUES (11, 3, 7, 12, 500, 6000, 2, 0)
SET IDENTITY_INSERT [dbo].[Cart_Item] OFF
SET IDENTITY_INSERT [dbo].[Customer] ON 

INSERT [dbo].[Customer] ([ID], [FRST_NME], [LAST_NME], [EMAIL], [PHNE], [USR_NME], [PSWD], [IsActive]) VALUES (1, N'ali', N'sher', N'ali@mail.com', N'923001234567', N'ali', N'1000:yPTGMgSksl2s413hGiPiMo9lHEMrKKhx:JmM4Ri9MG1Q/3L4V64wS0jlBmTU=', 1)
INSERT [dbo].[Customer] ([ID], [FRST_NME], [LAST_NME], [EMAIL], [PHNE], [USR_NME], [PSWD], [IsActive]) VALUES (2, N'bilal', N'shahbaz', N'bilal@mail.com', N'923001234567', N'bilal', N'1000:k0VYc+jaouzn/ei9O7Bcfq6ERDR+SLOv:+saRWMCOKDmggkGSDIjevRRaM3Y=', 1)
SET IDENTITY_INSERT [dbo].[Customer] OFF
SET IDENTITY_INSERT [dbo].[Images] ON 

INSERT [dbo].[Images] ([Id], [Path], [FId], [Type], [IsActive]) VALUES (1, N'../../../Resources/images/Annotation 2020-06-18 212643.png', 1, N'Customer', N'1         ')
INSERT [dbo].[Images] ([Id], [Path], [FId], [Type], [IsActive]) VALUES (2, N'../../../images/a.png', 1, N'Vendor', N'1         ')
INSERT [dbo].[Images] ([Id], [Path], [FId], [Type], [IsActive]) VALUES (3, N'../../../Resources/images/1.jpg', 1, N'Advertisement', N'1         ')
INSERT [dbo].[Images] ([Id], [Path], [FId], [Type], [IsActive]) VALUES (4, N'../../../images/a.png', 2, N'Vendor', N'1         ')
INSERT [dbo].[Images] ([Id], [Path], [FId], [Type], [IsActive]) VALUES (5, N'../../../Resources/images/1.jpg', 2, N'Advertisement', N'1         ')
INSERT [dbo].[Images] ([Id], [Path], [FId], [Type], [IsActive]) VALUES (6, N'../../../Resources/images/2.jpg', 3, N'Advertisement', N'1         ')
INSERT [dbo].[Images] ([Id], [Path], [FId], [Type], [IsActive]) VALUES (7, N'../../../images/a.png', 2, N'Customer', N'1         ')
INSERT [dbo].[Images] ([Id], [Path], [FId], [Type], [IsActive]) VALUES (8, N'../../../images/a.png', 3, N'Vendor', N'1         ')
INSERT [dbo].[Images] ([Id], [Path], [FId], [Type], [IsActive]) VALUES (9, N'../../../images/a.png', 4, N'Vendor', N'1         ')
SET IDENTITY_INSERT [dbo].[Images] OFF
SET IDENTITY_INSERT [dbo].[Prod_Advt] ON 

INSERT [dbo].[Prod_Advt] ([ID], [PROD_TYPE_ID], [DSCP], [VNDR_ID], [UNIT_PRICE], [MAX_ORDR_LIMT], [DLVRY_AVLB], [POST_DATE], [STUS_NME], [IsDeleted], [IsActive]) VALUES (1, 1, N'qwe rtyuio adsfgh fgh gfhf fgh', 1, 10, 10000, 1, CAST(N'2020-07-30T14:34:29.153' AS DateTime), N'Visible', 0, 1)
INSERT [dbo].[Prod_Advt] ([ID], [PROD_TYPE_ID], [DSCP], [VNDR_ID], [UNIT_PRICE], [MAX_ORDR_LIMT], [DLVRY_AVLB], [POST_DATE], [STUS_NME], [IsDeleted], [IsActive]) VALUES (2, 1, N'qwe rtyuio adsfgh fgh gfhf fgh ad ads aad add adsads', 2, 11, 50000, 0, CAST(N'2020-07-30T17:42:49.967' AS DateTime), N'Visible', 0, 1)
INSERT [dbo].[Prod_Advt] ([ID], [PROD_TYPE_ID], [DSCP], [VNDR_ID], [UNIT_PRICE], [MAX_ORDR_LIMT], [DLVRY_AVLB], [POST_DATE], [STUS_NME], [IsDeleted], [IsActive]) VALUES (3, 2, N'qwe rtyuio adsfgh fgh gfhf fgh  fgh gfhf fgh', 2, 500, 500, 0, CAST(N'2020-07-30T17:44:39.933' AS DateTime), N'Visible', 0, 1)
SET IDENTITY_INSERT [dbo].[Prod_Advt] OFF
SET IDENTITY_INSERT [dbo].[Product_Type] ON 

INSERT [dbo].[Product_Type] ([ID], [NME], [DSCP], [EXT_CODE], [Unit], [IsActive]) VALUES (1, N'Bricks', N'Standard Quality Bricks', 1131, N'Brick', 1)
INSERT [dbo].[Product_Type] ([ID], [NME], [DSCP], [EXT_CODE], [Unit], [IsActive]) VALUES (2, N'Cement', N'Standard Quality Cemenr', 2251, N'Bag', 1)
INSERT [dbo].[Product_Type] ([ID], [NME], [DSCP], [EXT_CODE], [Unit], [IsActive]) VALUES (3, N'Steel', N'Standard Quality Iron', 1478, N'Kg', 1)
INSERT [dbo].[Product_Type] ([ID], [NME], [DSCP], [EXT_CODE], [Unit], [IsActive]) VALUES (4, N'Sand', N'Standard Quality Sand', 1120, N'Bag', 1)
INSERT [dbo].[Product_Type] ([ID], [NME], [DSCP], [EXT_CODE], [Unit], [IsActive]) VALUES (5, N'Gravel', N'Standard Quality', 1130, N'Bag', 1)
SET IDENTITY_INSERT [dbo].[Product_Type] OFF
SET IDENTITY_INSERT [dbo].[Purchase_Order] ON 

INSERT [dbo].[Purchase_Order] ([ID], [CART_ITEM_ID], [VNDR_ID], [CSTMR_ID], [STATUS], [SHPNG_ADRS], [IsActive]) VALUES (1, 1, 1, 1, N'Accepted', N'CG, LHR', 0)
INSERT [dbo].[Purchase_Order] ([ID], [CART_ITEM_ID], [VNDR_ID], [CSTMR_ID], [STATUS], [SHPNG_ADRS], [IsActive]) VALUES (2, 2, 1, 1, N'Rejected', N'CG, LHR', 0)
INSERT [dbo].[Purchase_Order] ([ID], [CART_ITEM_ID], [VNDR_ID], [CSTMR_ID], [STATUS], [SHPNG_ADRS], [IsActive]) VALUES (3, 3, 1, 1, N'Accepted', N'CG, LHR', 0)
INSERT [dbo].[Purchase_Order] ([ID], [CART_ITEM_ID], [VNDR_ID], [CSTMR_ID], [STATUS], [SHPNG_ADRS], [IsActive]) VALUES (4, 4, 1, 1, N'Accepted', N'CG, LHR', 0)
INSERT [dbo].[Purchase_Order] ([ID], [CART_ITEM_ID], [VNDR_ID], [CSTMR_ID], [STATUS], [SHPNG_ADRS], [IsActive]) VALUES (5, 5, 2, 1, N'Accepted', N'CG, LHR', 0)
INSERT [dbo].[Purchase_Order] ([ID], [CART_ITEM_ID], [VNDR_ID], [CSTMR_ID], [STATUS], [SHPNG_ADRS], [IsActive]) VALUES (6, 6, 1, 2, N'Accepted', N'PS, LHR', 0)
INSERT [dbo].[Purchase_Order] ([ID], [CART_ITEM_ID], [VNDR_ID], [CSTMR_ID], [STATUS], [SHPNG_ADRS], [IsActive]) VALUES (7, 7, 2, 2, N'Accepted', N'PS, LHR', 0)
INSERT [dbo].[Purchase_Order] ([ID], [CART_ITEM_ID], [VNDR_ID], [CSTMR_ID], [STATUS], [SHPNG_ADRS], [IsActive]) VALUES (8, 8, 1, 2, N'Accepted', N'PS, LHR', 0)
INSERT [dbo].[Purchase_Order] ([ID], [CART_ITEM_ID], [VNDR_ID], [CSTMR_ID], [STATUS], [SHPNG_ADRS], [IsActive]) VALUES (9, 9, 2, 2, N'Accepted', N'PS, LHR', 0)
INSERT [dbo].[Purchase_Order] ([ID], [CART_ITEM_ID], [VNDR_ID], [CSTMR_ID], [STATUS], [SHPNG_ADRS], [IsActive]) VALUES (10, 10, 1, 1, N'Accepted', N'CG, LHR', 0)
INSERT [dbo].[Purchase_Order] ([ID], [CART_ITEM_ID], [VNDR_ID], [CSTMR_ID], [STATUS], [SHPNG_ADRS], [IsActive]) VALUES (11, 11, 2, 1, N'Rejected', N'CG, LHR', 0)
SET IDENTITY_INSERT [dbo].[Purchase_Order] OFF
SET IDENTITY_INSERT [dbo].[Rates] ON 

INSERT [dbo].[Rates] ([ID], [Prod_Type_ID], [EntryDate], [ExpiryDate], [Rate], [IsActive]) VALUES (2, 1, CAST(N'2020-08-08T18:28:06.863' AS DateTime), CAST(N'2020-08-08T19:50:36.143' AS DateTime), 10, 0)
INSERT [dbo].[Rates] ([ID], [Prod_Type_ID], [EntryDate], [ExpiryDate], [Rate], [IsActive]) VALUES (3, 1, CAST(N'2020-08-08T18:30:04.100' AS DateTime), CAST(N'2020-08-08T19:50:36.143' AS DateTime), 10, 0)
INSERT [dbo].[Rates] ([ID], [Prod_Type_ID], [EntryDate], [ExpiryDate], [Rate], [IsActive]) VALUES (4, 1, CAST(N'2020-08-08T18:30:34.410' AS DateTime), CAST(N'2020-08-08T19:50:36.143' AS DateTime), 12, 0)
INSERT [dbo].[Rates] ([ID], [Prod_Type_ID], [EntryDate], [ExpiryDate], [Rate], [IsActive]) VALUES (5, 1, CAST(N'2020-08-08T18:32:41.023' AS DateTime), CAST(N'2020-08-08T19:50:36.143' AS DateTime), 11, 0)
INSERT [dbo].[Rates] ([ID], [Prod_Type_ID], [EntryDate], [ExpiryDate], [Rate], [IsActive]) VALUES (6, 1, CAST(N'2020-08-08T18:33:01.810' AS DateTime), CAST(N'2020-08-08T19:50:36.143' AS DateTime), 12, 0)
INSERT [dbo].[Rates] ([ID], [Prod_Type_ID], [EntryDate], [ExpiryDate], [Rate], [IsActive]) VALUES (7, 1, CAST(N'2020-08-08T18:34:08.773' AS DateTime), CAST(N'2020-08-08T19:50:36.143' AS DateTime), 10, 0)
INSERT [dbo].[Rates] ([ID], [Prod_Type_ID], [EntryDate], [ExpiryDate], [Rate], [IsActive]) VALUES (8, 1, CAST(N'2020-08-08T19:15:46.470' AS DateTime), CAST(N'2020-08-08T19:50:36.143' AS DateTime), 600, 0)
INSERT [dbo].[Rates] ([ID], [Prod_Type_ID], [EntryDate], [ExpiryDate], [Rate], [IsActive]) VALUES (9, 3, CAST(N'2020-08-08T19:16:04.497' AS DateTime), NULL, 200, 1)
INSERT [dbo].[Rates] ([ID], [Prod_Type_ID], [EntryDate], [ExpiryDate], [Rate], [IsActive]) VALUES (10, 4, CAST(N'2020-08-08T19:16:15.870' AS DateTime), NULL, 80, 1)
INSERT [dbo].[Rates] ([ID], [Prod_Type_ID], [EntryDate], [ExpiryDate], [Rate], [IsActive]) VALUES (11, 5, CAST(N'2020-08-08T19:16:19.780' AS DateTime), NULL, 120, 1)
INSERT [dbo].[Rates] ([ID], [Prod_Type_ID], [EntryDate], [ExpiryDate], [Rate], [IsActive]) VALUES (12, 2, CAST(N'2020-08-08T19:50:12.080' AS DateTime), NULL, 600, 1)
INSERT [dbo].[Rates] ([ID], [Prod_Type_ID], [EntryDate], [ExpiryDate], [Rate], [IsActive]) VALUES (13, 1, CAST(N'2020-08-08T19:50:36.170' AS DateTime), NULL, 10, 1)
SET IDENTITY_INSERT [dbo].[Rates] OFF
SET IDENTITY_INSERT [dbo].[Shopping_Cart] ON 

INSERT [dbo].[Shopping_Cart] ([ID], [CSTMR_ID], [TOTL_AMNT], [IsActive]) VALUES (1, 1, 120, 1)
INSERT [dbo].[Shopping_Cart] ([ID], [CSTMR_ID], [TOTL_AMNT], [IsActive]) VALUES (2, 1, 1000, 1)
INSERT [dbo].[Shopping_Cart] ([ID], [CSTMR_ID], [TOTL_AMNT], [IsActive]) VALUES (3, 1, 1500, 1)
INSERT [dbo].[Shopping_Cart] ([ID], [CSTMR_ID], [TOTL_AMNT], [IsActive]) VALUES (4, 1, 6000, 1)
INSERT [dbo].[Shopping_Cart] ([ID], [CSTMR_ID], [TOTL_AMNT], [IsActive]) VALUES (5, 2, 510, 1)
INSERT [dbo].[Shopping_Cart] ([ID], [CSTMR_ID], [TOTL_AMNT], [IsActive]) VALUES (6, 2, 1020, 1)
INSERT [dbo].[Shopping_Cart] ([ID], [CSTMR_ID], [TOTL_AMNT], [IsActive]) VALUES (7, 1, 6120, 1)
SET IDENTITY_INSERT [dbo].[Shopping_Cart] OFF
INSERT [dbo].[Status] ([NME], [Flag], [DSCP], [IsActive]) VALUES (N'Accepted', N'PurchaseOrder', N'Order Accepted', 1)
INSERT [dbo].[Status] ([NME], [Flag], [DSCP], [IsActive]) VALUES (N'Draft', N'PurchaseOrder', N'Not Seen Yet', 1)
INSERT [dbo].[Status] ([NME], [Flag], [DSCP], [IsActive]) VALUES (N'Invisible', N'PROD_ADVT', N'Advertisement currently not visible to Customers', 1)
INSERT [dbo].[Status] ([NME], [Flag], [DSCP], [IsActive]) VALUES (N'Pending', N'PurchaseOrder', N'No Action Taken Yet', 1)
INSERT [dbo].[Status] ([NME], [Flag], [DSCP], [IsActive]) VALUES (N'Rejected', N'PurchaseOrder', N'Order Rejected', 1)
INSERT [dbo].[Status] ([NME], [Flag], [DSCP], [IsActive]) VALUES (N'Visible', N'PROD_ADVT', N'NULAdvertisement currently visible to CustomersL', 1)
SET IDENTITY_INSERT [dbo].[Vendor] ON 

INSERT [dbo].[Vendor] ([ID], [FRST_NME], [LAST_NME], [EMAIL], [PHNE], [BSNS_NME], [USR_NME], [PSWD], [IsActive]) VALUES (1, N'danish', N'ali', N'danish@mail.com', N'923001234567', N'danish''z', N'danish', N'1000:3/ftBW9tGUBaS6h6jPQHCRIHRZw5mO5Q:TFArsWpPatBxpUoPUuyzAUmElKM=', 1)
INSERT [dbo].[Vendor] ([ID], [FRST_NME], [LAST_NME], [EMAIL], [PHNE], [BSNS_NME], [USR_NME], [PSWD], [IsActive]) VALUES (2, N'mustajab', N'naveed', N'mustajab@mail.com', N'923001234567', N'mustajab''s', N'mustajab', N'1000:ByTmXICASYGBeucONur1sbdYb14xjHSP:BVzEfMSjtRC1BohCQxhNIebNPiA=', 1)
INSERT [dbo].[Vendor] ([ID], [FRST_NME], [LAST_NME], [EMAIL], [PHNE], [BSNS_NME], [USR_NME], [PSWD], [IsActive]) VALUES (3, N'test', N'1', N'ads@mail.com', N'923001234567', N'test''s', N'test', N'1000:xrqd4S4lzQAFnYDV1qDbKjG8eKiiT6ek:VsZJCBarodJDvUc9z8kYvjAnyUE=', 1)
INSERT [dbo].[Vendor] ([ID], [FRST_NME], [LAST_NME], [EMAIL], [PHNE], [BSNS_NME], [USR_NME], [PSWD], [IsActive]) VALUES (4, N'test', N'2', N'test2@mail.com', N'92300123456789', N'test2,s', N'test2', N'1000:eMFvhDST4V4seKmR5H6YF5UFpMDZ2FQJ:Ut52XA8fA+MVnpcnR2yEAmHGXdE=', 1)
SET IDENTITY_INSERT [dbo].[Vendor] OFF
ALTER TABLE [dbo].[Prod_Advt] ADD  CONSTRAINT [DF_Prod_Advt_Active]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[Purchase_Order] ADD  CONSTRAINT [DF_Purchase_Order_Actice]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[Cart_Item]  WITH CHECK ADD  CONSTRAINT [FK_Cart_Item_Prod_Advt] FOREIGN KEY([PROD_ADVT_ID])
REFERENCES [dbo].[Prod_Advt] ([ID])
GO
ALTER TABLE [dbo].[Cart_Item] CHECK CONSTRAINT [FK_Cart_Item_Prod_Advt]
GO
ALTER TABLE [dbo].[Cart_Item]  WITH CHECK ADD  CONSTRAINT [FK_Cart_Item_Shopping_Cart] FOREIGN KEY([CART_ID])
REFERENCES [dbo].[Shopping_Cart] ([ID])
GO
ALTER TABLE [dbo].[Cart_Item] CHECK CONSTRAINT [FK_Cart_Item_Shopping_Cart]
GO
ALTER TABLE [dbo].[Cart_Item]  WITH CHECK ADD  CONSTRAINT [FK_Cart_Item_Vendor] FOREIGN KEY([VNDR_ID])
REFERENCES [dbo].[Vendor] ([ID])
GO
ALTER TABLE [dbo].[Cart_Item] CHECK CONSTRAINT [FK_Cart_Item_Vendor]
GO
ALTER TABLE [dbo].[Prod_Advt]  WITH CHECK ADD  CONSTRAINT [FK_Prod_Advt_Prod_Type] FOREIGN KEY([PROD_TYPE_ID])
REFERENCES [dbo].[Product_Type] ([ID])
GO
ALTER TABLE [dbo].[Prod_Advt] CHECK CONSTRAINT [FK_Prod_Advt_Prod_Type]
GO
ALTER TABLE [dbo].[Prod_Advt]  WITH CHECK ADD  CONSTRAINT [FK_Prod_Advt_Status] FOREIGN KEY([STUS_NME])
REFERENCES [dbo].[Status] ([NME])
GO
ALTER TABLE [dbo].[Prod_Advt] CHECK CONSTRAINT [FK_Prod_Advt_Status]
GO
ALTER TABLE [dbo].[Prod_Advt]  WITH CHECK ADD  CONSTRAINT [FK_Prod_Advt_Vendor] FOREIGN KEY([VNDR_ID])
REFERENCES [dbo].[Vendor] ([ID])
GO
ALTER TABLE [dbo].[Prod_Advt] CHECK CONSTRAINT [FK_Prod_Advt_Vendor]
GO
ALTER TABLE [dbo].[Purchase_Order]  WITH CHECK ADD  CONSTRAINT [FK_Purchase_Order_Cart_Item] FOREIGN KEY([CART_ITEM_ID])
REFERENCES [dbo].[Cart_Item] ([ID])
GO
ALTER TABLE [dbo].[Purchase_Order] CHECK CONSTRAINT [FK_Purchase_Order_Cart_Item]
GO
ALTER TABLE [dbo].[Purchase_Order]  WITH CHECK ADD  CONSTRAINT [FK_Purchase_Order_Customer] FOREIGN KEY([CSTMR_ID])
REFERENCES [dbo].[Customer] ([ID])
GO
ALTER TABLE [dbo].[Purchase_Order] CHECK CONSTRAINT [FK_Purchase_Order_Customer]
GO
ALTER TABLE [dbo].[Purchase_Order]  WITH NOCHECK ADD  CONSTRAINT [FK_Purchase_Order_Status] FOREIGN KEY([STATUS])
REFERENCES [dbo].[Status] ([NME])
GO
ALTER TABLE [dbo].[Purchase_Order] NOCHECK CONSTRAINT [FK_Purchase_Order_Status]
GO
ALTER TABLE [dbo].[Purchase_Order]  WITH CHECK ADD  CONSTRAINT [FK_Purchase_Order_Vendor] FOREIGN KEY([VNDR_ID])
REFERENCES [dbo].[Vendor] ([ID])
GO
ALTER TABLE [dbo].[Purchase_Order] CHECK CONSTRAINT [FK_Purchase_Order_Vendor]
GO
ALTER TABLE [dbo].[Rates]  WITH CHECK ADD  CONSTRAINT [FK_Rates_Prod_Types] FOREIGN KEY([Prod_Type_ID])
REFERENCES [dbo].[Product_Type] ([ID])
GO
ALTER TABLE [dbo].[Rates] CHECK CONSTRAINT [FK_Rates_Prod_Types]
GO
ALTER TABLE [dbo].[Shopping_Cart]  WITH CHECK ADD  CONSTRAINT [FK_Shopping_Cart_Customer] FOREIGN KEY([CSTMR_ID])
REFERENCES [dbo].[Customer] ([ID])
GO
ALTER TABLE [dbo].[Shopping_Cart] CHECK CONSTRAINT [FK_Shopping_Cart_Customer]
GO
USE [master]
GO
ALTER DATABASE [TameerKaroDB] SET  READ_WRITE 
GO

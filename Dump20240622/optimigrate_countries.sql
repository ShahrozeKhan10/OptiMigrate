-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: optimigrate
-- ------------------------------------------------------
-- Server version	8.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `countries`
--

DROP TABLE IF EXISTS `countries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `countries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `name_ur` varchar(255) NOT NULL,
  `code` int NOT NULL,
  `continent` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `has_details` tinyint(1) DEFAULT NULL,
  `details` text,
  `details_ur` text,
  `gdp` int DEFAULT NULL,
  `total_population` bigint DEFAULT NULL,
  `pakistanis` int DEFAULT NULL,
  `muslim_population` int DEFAULT NULL,
  `muslim_percentage` float DEFAULT NULL,
  `world_muslim_percentage` float DEFAULT NULL,
  `flag` text,
  `video_links` json DEFAULT NULL,
  `stats` json DEFAULT NULL,
  `short_description` text,
  `map` varchar(255) DEFAULT NULL,
  `short_description_ur` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `countries`
--

LOCK TABLES `countries` WRITE;
/*!40000 ALTER TABLE `countries` DISABLE KEYS */;
INSERT INTO `countries` VALUES (1,'Pakistan','پاکستان',92,'Asia',1,1,'Details about Pakistan','پاکستان کے بارے میں تفصیلات',300000,220000000,1000000,220000000,96.5,11,'flag_url_PK','{\"video1\": \"link1\", \"video2\": \"link2\"}','{\"stat1\": 10, \"stat2\": 20}','Short description of Pakistan','map_url_PK',NULL),(2,'India','بھارت',91,'Asia',1,0,'Details about India','بھارت کے بارے میں تفصیلات',2700000,1400000000,2000000,200000000,14.2,11.1,'flag_url_IN','{\"video1\": \"link3\", \"video2\": \"link4\"}','{\"stat1\": 30, \"stat2\": 40}','Short description of India','map_url_IN',NULL),(3,'United States','ریاستہائے متحدہ',1,'North America',1,1,'Details about the USA','ریاستہائے متحدہ کے بارے میں تفصیلات',21000000,331000000,500000,3450000,1.1,0.8,'flag_url_US','{\"video1\": \"link5\", \"video2\": \"link6\"}','{\"stat1\": 50, \"stat2\": 60}','Short description of the USA','map_url_US',NULL),(4,'United States','ریاستہائے متحدہ',1,'North America',1,1,'The United States of America is a country primarily located in North America.','ریاستہائے متحدہ امریکہ شمالی امریکہ میں واقع ایک ملک ہے۔',2100000,331000000,500000,3450000,1.04,0.15,'usa_flag.png','[{\"url\": \"https://example.com/usa_intro\", \"title\": \"Introduction\"}]','{\"economy\": \"Developed\", \"currency\": \"USD\"}','A country in North America.','usa_map.png',NULL),(5,'Pakistan','پاکستان',92,'Asia',1,1,'Pakistan, officially the Islamic Republic of Pakistan, is a country in South Asia.','پاکستان، باضابطہ طور پر اسلامی جمہوریہ پاکستان، جنوبی ایشیا میں واقع ہے۔',3000000,216600000,216600000,210000000,96.4,11,'pakistan_flag.png','[{\"url\": \"https://example.com/pakistan_intro\", \"title\": \"Introduction\"}]','{\"economy\": \"Developing\", \"currency\": \"PKR\"}','A country in South Asia.','pakistan_map.png',NULL),(6,'Germany','جرمنی',49,'Europe',1,1,'Germany is a country in Central and Western Europe.','جرمنی وسطی اور مغربی یورپ میں واقع ایک ملک ہے۔',3800000,83000000,150000,5000000,6,0.25,'germany_flag.png','[{\"url\": \"https://example.com/germany_intro\", \"title\": \"Introduction\"}]','{\"economy\": \"Developed\", \"currency\": \"EUR\"}','A country in Europe.','germany_map.png',NULL),(7,'Brazil','برازیل',55,'South America',1,1,'Brazil is the largest country in both South America and Latin America.','برازیل جنوبی امریکہ اور لاطینی امریکہ دونوں میں سب سے بڑا ملک ہے۔',19000000,211000000,90000,12000000,6,0.65,'brazil_flag.png','[{\"url\": \"https://example.com/brazil_intro\", \"title\": \"Introduction\"}]','{\"economy\": \"Developing\", \"currency\": \"BRL\"}','A country in South America.','brazil_map.png',NULL),(8,'Canada','کینیڈا',1,'North America',1,1,'Details about Canada','کینیڈا کے بارے میں تفصیلات',1700000,37590000,200000,1000000,2.7,0.2,'canada_flag.png','{\"video1\": \"link7\", \"video2\": \"link8\"}','{\"stat1\": 70, \"stat2\": 80}','Short description of Canada','canada_map.png','کینیڈا کے بارے میں مختصر تفصیل'),(9,'China','چین',86,'Asia',1,1,'Details about China','چین کے بارے میں تفصیلات',14300000,1400000000,300000,200000000,14.4,1.7,'china_flag.png','{\"video1\": \"link9\", \"video2\": \"link10\"}','{\"stat1\": 90, \"stat2\": 100}','Short description of China','china_map.png','چین کے بارے میں مختصر تفصیل'),(10,'Australia','آسٹریلیا',61,'Australia',1,1,'Details about Australia','آسٹریلیا کے بارے میں تفصیلات',1300000,25000000,120000,600000,2.4,0.2,'australia_flag.png','{\"video1\": \"link11\", \"video2\": \"link12\"}','{\"stat1\": 110, \"stat2\": 120}','Short description of Australia','australia_map.png','آسٹریلیا کے بارے میں مختصر تفصیل'),(11,'Nigeria','نائیجیریا',234,'Africa',1,1,'Details about Nigeria','نائیجیریا کے بارے میں تفصیلات',400000,206000000,150000,100000000,48.3,5.3,'nigeria_flag.png','{\"video1\": \"link13\", \"video2\": \"link14\"}','{\"stat1\": 130, \"stat2\": 140}','Short description of Nigeria','nigeria_map.png','نائیجیریا کے بارے میں مختصر تفصیل'),(12,'France','فرانس',33,'Europe',1,1,'Details about France','فرانس کے بارے میں تفصیلات',2700000,67000000,500000,5000000,7.5,0.9,'france_flag.png','{\"video1\": \"link15\", \"video2\": \"link16\"}','{\"stat1\": 150, \"stat2\": 160}','Short description of France','france_map.png','فرانس کے بارے میں مختصر تفصیل'),(13,'Japan','جاپان',81,'Asia',1,1,'Details about Japan','جاپان کے بارے میں تفصیلات',5000000,126000000,50000,1000000,1.6,0.1,'japan_flag.png','{\"video1\": \"link17\", \"video2\": \"link18\"}','{\"stat1\": 170, \"stat2\": 180}','Short description of Japan','japan_map.png','جاپان کے بارے میں مختصر تفصیل'),(14,'Mexico','میکسیکو',52,'North America',1,1,'Details about Mexico','میکسیکو کے بارے میں تفصیلات',1200000,128000000,300000,2000000,1.6,0.3,'mexico_flag.png','{\"video1\": \"link19\", \"video2\": \"link20\"}','{\"stat1\": 190, \"stat2\": 200}','Short description of Mexico','mexico_map.png','میکسیکو کے بارے میں مختصر تفصیل'),(15,'Russia','روس',7,'Europe/Asia',1,1,'Details about Russia','روس کے بارے میں تفصیلات',1500000,144000000,500000,20000000,14,1,'russia_flag.png','{\"video1\": \"link21\", \"video2\": \"link22\"}','{\"stat1\": 210, \"stat2\": 220}','Short description of Russia','russia_map.png','روس کے بارے میں مختصر تفصیل'),(16,'United Kingdom','برطانیہ',44,'Europe',1,1,'Details about the United Kingdom','برطانیہ کے بارے میں تفصیلات',3000000,66000000,400000,3000000,4.5,0.6,'uk_flag.png','{\"video1\": \"link23\", \"video2\": \"link24\"}','{\"stat1\": 230, \"stat2\": 240}','Short description of the United Kingdom','uk_map.png','برطانیہ کے بارے میں مختصر تفصیل'),(17,'South Africa','جنوبی افریقہ',27,'Africa',1,1,'Details about South Africa','جنوبی افریقہ کے بارے میں تفصیلات',350000,58000000,300000,1000000,1.7,0.1,'southafrica_flag.png','{\"video1\": \"link25\", \"video2\": \"link26\"}','{\"stat1\": 250, \"stat2\": 260}','Short description of South Africa','southafrica_map.png','جنوبی افریقہ کے بارے میں مختصر تفصیل'),(18,'Argentina','ارجنٹائن',54,'South America',1,1,'Details about Argentina','ارجنٹائن کے بارے میں تفصیلات',450000,45000000,100000,1000000,2.2,0.5,'argentina_flag.png','{\"video1\": \"link27\", \"video2\": \"link28\"}','{\"stat1\": 270, \"stat2\": 280}','Short description of Argentina','argentina_map.png','ارجنٹائن کے بارے میں مختصر تفصیل'),(19,'Italy','اٹلی',39,'Europe',1,1,'Details about Italy','اٹلی کے بارے میں تفصیلات',2100000,60000000,100000,2000000,3.3,0.4,'italy_flag.png','{\"video1\": \"link29\", \"video2\": \"link30\"}','{\"stat1\": 290, \"stat2\": 300}','Short description of Italy','italy_map.png','اٹلی کے بارے میں مختصر تفصیل'),(20,'Saudi Arabia','سعودی عرب',966,'Asia',1,1,'Details about Saudi Arabia','سعودی عرب کے بارے میں تفصیلات',790000,34000000,3000000,30000000,88.2,2,'saudiarabia_flag.png','{\"video1\": \"link31\", \"video2\": \"link32\"}','{\"stat1\": 310, \"stat2\": 320}','Short description of Saudi Arabia','saudiarabia_map.png','سعودی عرب کے بارے میں مختصر تفصیل');
/*!40000 ALTER TABLE `countries` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-22  6:37:21

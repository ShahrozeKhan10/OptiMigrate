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
-- Table structure for table `assessmentdesiredcountries`
--

DROP TABLE IF EXISTS `assessmentdesiredcountries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assessmentdesiredcountries` (
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `assessment_id` int NOT NULL,
  `country_id` int NOT NULL,
  PRIMARY KEY (`assessment_id`,`country_id`),
  KEY `country_id` (`country_id`),
  CONSTRAINT `assessmentdesiredcountries_ibfk_1` FOREIGN KEY (`assessment_id`) REFERENCES `assessments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assessmentdesiredcountries`
--

LOCK TABLES `assessmentdesiredcountries` WRITE;
/*!40000 ALTER TABLE `assessmentdesiredcountries` DISABLE KEYS */;
INSERT INTO `assessmentdesiredcountries` VALUES ('2024-06-21 05:06:11','2024-06-21 05:06:11',3,1),('2024-06-21 05:06:11','2024-06-21 05:06:11',3,2),('2024-06-21 05:06:11','2024-06-21 05:06:11',3,5),('2024-06-21 05:06:11','2024-06-21 05:06:11',3,6),('2024-06-22 12:50:28','2024-06-22 12:50:28',4,7),('2024-06-22 12:50:28','2024-06-22 12:50:28',4,10),('2024-06-22 12:50:28','2024-06-22 12:50:28',4,18),('2024-06-22 13:07:12','2024-06-22 13:07:12',5,7),('2024-06-22 13:07:12','2024-06-22 13:07:12',5,10),('2024-06-22 13:07:12','2024-06-22 13:07:12',5,18),('2024-06-22 13:10:35','2024-06-22 13:10:35',6,7),('2024-06-22 13:10:35','2024-06-22 13:10:35',6,10),('2024-06-22 13:10:35','2024-06-22 13:10:35',6,18),('2024-06-22 13:24:10','2024-06-22 13:24:10',7,7),('2024-06-22 13:24:10','2024-06-22 13:24:10',7,10),('2024-06-22 13:24:10','2024-06-22 13:24:10',7,18);
/*!40000 ALTER TABLE `assessmentdesiredcountries` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-22  6:37:22

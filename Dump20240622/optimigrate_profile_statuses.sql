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
-- Table structure for table `profile_statuses`
--

DROP TABLE IF EXISTS `profile_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile_statuses` (
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `general_info` tinyint(1) DEFAULT '0',
  `education` tinyint(1) DEFAULT '0',
  `experience` tinyint(1) DEFAULT '0',
  `skills` tinyint(1) DEFAULT '0',
  `interests` tinyint(1) DEFAULT '0',
  `cv` tinyint(1) DEFAULT '0',
  `certificate` tinyint(1) DEFAULT '0',
  `project` tinyint(1) DEFAULT '0',
  `percentage` varchar(255) DEFAULT '',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile_statuses`
--

LOCK TABLES `profile_statuses` WRITE;
/*!40000 ALTER TABLE `profile_statuses` DISABLE KEYS */;
INSERT INTO `profile_statuses` VALUES ('0b9666b7-afb9-4307-bfdb-14e4571cee25',0,0,0,0,0,0,0,0,'','2024-06-02 05:16:02','2024-06-02 05:16:02'),('3054c0a8-149f-47b5-8279-a122582b0c80',0,0,0,0,0,0,0,0,'','2024-05-26 18:07:56','2024-05-26 18:07:56'),('8f7c61a0-fc37-4ddd-9b16-d747e52c0d7a',0,0,0,0,0,0,0,0,'','2024-06-02 05:52:24','2024-06-02 05:52:24'),('96f1faee-a072-469d-bd0c-f61042ed367c',0,0,0,0,0,0,0,0,'','2024-06-02 05:58:37','2024-06-02 05:58:37'),('bfe00425-9e8e-4bb2-8e42-370f8fa58fa1',0,0,0,0,0,0,0,0,'','2024-06-02 05:54:31','2024-06-02 05:54:31'),('d0abc267-eaa4-448f-bbbf-e4870a49a1ac',0,0,0,0,0,0,0,0,'','2024-06-01 09:48:07','2024-06-01 09:48:07');
/*!40000 ALTER TABLE `profile_statuses` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-22  6:37:19

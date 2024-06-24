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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT '',
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` enum('male','female') NOT NULL,
  `image` varchar(255) DEFAULT '',
  `phone` varchar(255) NOT NULL DEFAULT '',
  `dob` datetime DEFAULT NULL,
  `email_verified` tinyint(1) NOT NULL DEFAULT '1',
  `profession_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `status` enum('active','deactivate','pending') DEFAULT 'active',
  `country` varchar(255) DEFAULT '',
  `city` varchar(255) DEFAULT '',
  `description` text,
  `terms_accepted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `profession_id` (`profession_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`profession_id`) REFERENCES `profession_details` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('0b9666b7-afb9-4307-bfdb-14e4571cee25','Hasnain Adam','hasnainadam7@gmail.com','$2a$10$YC2xrVejcIe59pk1raKHwuNKv2Xmcfjdf55euFIdoLIoEeazbwivm','male','','','1991-06-11 07:00:00',1,NULL,'user','active','','','',0,'2024-06-02 05:16:02','2024-06-22 13:24:10'),('3054c0a8-149f-47b5-8279-a122582b0c80','Pakistan Abc','mbabarwaseem+0066@gmail.com','$2a$10$pRlZSLE6nNtDvNRGVYBsnOBKRCR0ZsuYigElWWmR73i/hh22iKb/i','male','','',NULL,1,NULL,'user','active','','','',0,'2024-05-26 18:07:56','2024-05-26 18:07:56'),('8f7c61a0-fc37-4ddd-9b16-d747e52c0d7a','hasnain adam','hasnainadam@gmail.com','$2a$10$WWQ/eVnKhEFR7Fxh2cP9uOFxko.ESEkEvWPfku3cvzFUbw5xr/kqu','male','','',NULL,1,NULL,'user','active','','','',0,'2024-06-02 05:52:24','2024-06-02 05:52:24'),('96f1faee-a072-469d-bd0c-f61042ed367c','hasnain adam','hasnain@dsu.com','$2a$10$TpbGdGuHu4gePawjF5.wL.uuIa1A3ij71iRDN0SyH4eN8bvacuHD.','male','','',NULL,1,NULL,'user','active','','','',0,'2024-06-02 05:58:37','2024-06-02 05:58:37'),('bfe00425-9e8e-4bb2-8e42-370f8fa58fa1','asdas dasdas','abc@gmail.com','$2a$10$Q4f/nyzm3MWpW1v9HdPRjuHcwPHBy8uaccmgaIH5BLRgp57V0Zj36','male','','',NULL,1,NULL,'user','active','','','',0,'2024-06-02 05:54:31','2024-06-02 05:54:31'),('d0abc267-eaa4-448f-bbbf-e4870a49a1ac','dasdas dasda','mirzashahzadsaleem021+101@gmail.com','$2a$10$B6dJ6oDkVudk63j8.vj40.6VLhBujNoI2m5HoWWbO5nIVoqVWuq6O','male','','','2006-05-30 07:00:00',1,NULL,'user','active','','','',0,'2024-06-01 09:48:07','2024-06-22 13:10:35');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-22  6:37:14

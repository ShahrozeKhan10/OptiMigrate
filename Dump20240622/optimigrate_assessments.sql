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
-- Table structure for table `assessments`
--

DROP TABLE IF EXISTS `assessments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assessments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `savings_in_dollars` int DEFAULT NULL,
  `career_summary` text,
  `career_summary_ur` text,
  `resume_text_content` text,
  `result` json DEFAULT NULL,
  `status` enum('pending','in_progress','completed','failed') DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `origin_country_id` int DEFAULT NULL,
  `residence_country_id` int DEFAULT NULL,
  `profession_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `origin_country_id` (`origin_country_id`),
  KEY `residence_country_id` (`residence_country_id`),
  KEY `profession_id` (`profession_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `assessments_ibfk_3` FOREIGN KEY (`profession_id`) REFERENCES `profession_details` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `assessments_ibfk_4` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assessments`
--

LOCK TABLES `assessments` WRITE;
/*!40000 ALTER TABLE `assessments` DISABLE KEYS */;
INSERT INTO `assessments` VALUES (1,5000,'Experienced software developer with 10 years in the industry...','تجربہ کار سافٹ ویئر ڈویلپر کے طور پر 10 سال کا تجربہ...','John Doe is a seasoned software developer...','{\"assessment_result\": \"Passed\"}','completed','2024-05-31 12:00:00','2024-05-31 12:00:00',1,2,'1','d0abc267-eaa4-448f-bbbf-e4870a49a1ac'),(2,5000,'Experienced software developer with 10 years in the industry...','تجربہ کار سافٹ ویئر ڈویلپر کے طور پر 10 سال کا تجربہ...','John Doe is a seasoned software developer...','{\"assessment_result\": \"Passed\"}','completed','2024-05-31 12:00:00','2024-05-31 12:00:00',1,2,'1','d0abc267-eaa4-448f-bbbf-e4870a49a1ac'),(3,345345,NULL,NULL,NULL,NULL,'pending','2024-06-21 05:06:10','2024-06-21 05:06:10',7,7,'2','d0abc267-eaa4-448f-bbbf-e4870a49a1ac'),(4,323421,NULL,NULL,NULL,NULL,'pending','2024-06-22 12:50:28','2024-06-22 12:50:28',11,11,'6','d0abc267-eaa4-448f-bbbf-e4870a49a1ac'),(5,42423,NULL,NULL,'\n\nCs201070 \nM Hasnain Adam \na) The root word of \"Islam\" is \"Salaam,\" which means peace in Arabic. \n \nb) Islamic teachings advocate for conflict resolution through dialogue and reconciliation, rather than \nthrough aggression. Believers are encouraged to seek peaceful resolutions to disputes and conflicts, \nprioritizing understanding, compassion, and forgiveness. \n \nc) Peace holds significant importance in Islam as it is not merely the absence of war, but a state of \nspiritual and social well-being. The Quran and the Hadiths stress the importance of living a life of \nharmony and non-violence. Islamic principles underscore the pursuit of peace and the promotion of a \njust and equitable society, where justice, compassion, and forgiveness are maintained in interactions \nwith others. Islam teaches that true peace can only be achieved when all members of society are treated \nwith fairness and respect, thus emphasizing the significance of peace in both individual and communal \ncontexts. ',NULL,'in_progress','2024-06-22 13:07:12','2024-06-22 13:24:25',2,8,'5','d0abc267-eaa4-448f-bbbf-e4870a49a1ac'),(6,3145,NULL,NULL,NULL,NULL,'pending','2024-06-22 13:10:35','2024-06-22 13:10:35',7,7,'5','d0abc267-eaa4-448f-bbbf-e4870a49a1ac'),(7,3423,NULL,NULL,NULL,NULL,'pending','2024-06-22 13:24:10','2024-06-22 13:24:10',9,12,'6','0b9666b7-afb9-4307-bfdb-14e4571cee25');
/*!40000 ALTER TABLE `assessments` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-22  6:37:15

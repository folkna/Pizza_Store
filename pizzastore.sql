-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 31, 2025 at 12:41 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pizzastore`
--

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `Address_Id` int(10) NOT NULL,
  `Mem_Id` char(12) NOT NULL,
  `Address_String` varchar(500) NOT NULL,
  `Address_Latitude` decimal(10,6) NOT NULL,
  `Address_Longitude` decimal(10,6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `addresses`
--

INSERT INTO `addresses` (`Address_Id`, `Mem_Id`, `Address_String`, `Address_Latitude`, `Address_Longitude`) VALUES
(4, '20250002', 'The Pizza Company, Pathum Wan Intersection Skywalk, Siam, Pathum Wan Subdistrict, Pathum Wan District, Bangkok, 10330, Thailand', 13.745721, 100.530228),
(5, '20250005', 'Bang Phongphang Subdistrict, Yan Nawa District, Bangkok, 10120, Thailand', 13.678347, 100.542732),
(9, '20250001', 'Soi Sukha 1, Trok Wisut Community, Wat Ratchabophit Subdistrict, Phra Nakhon District, Bangkok, 10200, Thailand', 13.751057, 100.498458),
(11, '20250008', 'Soi Chan 39, ชุมชนจันทร์ร่ำรวย, Thung Wat Don Subdistrict, Sathon District, Bangkok, 10120, Thailand', 13.706366, 100.520607),
(12, '20250009', 'Wat Duang Khae, Soi Wat Duang Khae, Wat Duang Khae Community, Rong Mueang Subdistrict, Pathum Wan District, Bangkok, 10330, Thailand', 13.741886, 100.518379);

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `Cart_Id` int(10) NOT NULL,
  `Mem_Id` char(12) NOT NULL,
  `Address_Id` int(10) DEFAULT NULL,
  `Cart_Sdate` datetime NOT NULL,
  `Cart_Status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`Cart_Id`, `Mem_Id`, `Address_Id`, `Cart_Sdate`, `Cart_Status`) VALUES
(1, '20250001', NULL, '2025-10-28 21:59:22', 'สั่งซื้อเรียบร้อย'),
(2, '20250001', NULL, '2025-10-28 22:00:53', 'สั่งซื้อเรียบร้อย'),
(3, '20250001', NULL, '2025-10-28 22:04:42', 'สั่งซื้อเรียบร้อย'),
(4, '20250001', NULL, '2025-10-28 22:05:48', 'สั่งซื้อเรียบร้อย'),
(5, '20250002', 4, '2025-10-28 22:08:49', 'สั่งซื้อเรียบร้อย'),
(6, '20250002', 4, '2025-10-28 22:09:40', 'สั่งซื้อเรียบร้อย'),
(7, '20250002', 4, '2025-10-28 22:09:55', 'สั่งซื้อเรียบร้อย'),
(8, '20250002', 4, '2025-10-28 22:10:12', 'สั่งซื้อเรียบร้อย'),
(9, '20250002', 4, '2025-10-28 22:14:30', 'สั่งซื้อเรียบร้อย'),
(10, '20250002', NULL, '2025-10-28 22:14:54', 'รอการสั่งซื้อ'),
(11, '20250005', 5, '2025-10-28 22:17:31', 'สั่งซื้อเรียบร้อย'),
(12, '20250005', 5, '2025-10-28 22:18:16', 'สั่งซื้อเรียบร้อย'),
(13, '20250005', 5, '2025-10-28 22:18:31', 'สั่งซื้อเรียบร้อย'),
(14, '20250005', 5, '2025-10-28 22:18:45', 'สั่งซื้อเรียบร้อย'),
(15, '20250005', 5, '2025-10-28 22:18:56', 'สั่งซื้อเรียบร้อย'),
(16, '20250005', NULL, '2025-10-28 22:19:31', 'รอการสั่งซื้อ'),
(17, '20250001', NULL, '2025-10-28 23:11:12', 'สั่งซื้อเรียบร้อย'),
(18, '20250001', NULL, '2025-10-30 13:16:18', 'สั่งซื้อเรียบร้อย'),
(19, '20250001', NULL, '2025-10-30 14:53:38', 'สั่งซื้อเรียบร้อย'),
(20, '20250001', NULL, '2025-10-30 14:58:28', 'สั่งซื้อเรียบร้อย'),
(21, '20250001', 9, '2025-10-31 10:47:35', 'รอการสั่งซื้อ'),
(22, '20250008', 11, '2025-10-31 10:58:10', 'สั่งซื้อเรียบร้อย'),
(23, '20250008', NULL, '2025-10-31 11:00:08', 'รอการสั่งซื้อ'),
(24, '20250009', 12, '2025-10-31 11:23:42', 'สั่งซื้อเรียบร้อย'),
(25, '20250009', NULL, '2025-10-31 11:24:24', 'รอการสั่งซื้อ'),
(26, '20250010', NULL, '2025-10-31 11:33:06', 'รอการสั่งซื้อ');

-- --------------------------------------------------------

--
-- Table structure for table `cart_products`
--

CREATE TABLE `cart_products` (
  `Cartproduct_Id` int(10) NOT NULL,
  `Cart_Id` int(10) NOT NULL,
  `Product_Id` int(6) DEFAULT NULL,
  `Cartproduct_Quantity` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart_products`
--

INSERT INTO `cart_products` (`Cartproduct_Id`, `Cart_Id`, `Product_Id`, `Cartproduct_Quantity`) VALUES
(1, 1, 1, 2),
(3, 1, 2, 1),
(4, 2, 4, 2),
(5, 2, 2, 1),
(6, 3, 1, 1),
(7, 3, 5, 1),
(8, 3, 2, 1),
(9, 3, 3, 1),
(10, 3, 4, 1),
(11, 3, 14, 2),
(12, 5, 5, 2),
(13, 5, 6, 1),
(14, 5, 7, 1),
(15, 5, 8, 1),
(16, 5, 11, 1),
(17, 6, 2, 1),
(18, 7, 2, 1),
(19, 7, 3, 1),
(20, 8, 2, 4),
(21, 8, 5, 1),
(22, 8, 1, 1),
(23, 8, 3, 1),
(24, 9, 1, 1),
(25, 9, 2, 1),
(26, 9, 3, 1),
(27, 9, 4, 1),
(28, 9, 5, 1),
(29, 11, 4, 1),
(30, 11, 5, 1),
(31, 11, 2, 1),
(32, 11, 3, 1),
(33, 11, 7, 1),
(34, 11, 8, 1),
(35, 12, 2, 1),
(36, 12, 11, 2),
(37, 12, 10, 1),
(38, 13, 6, 1),
(39, 13, 7, 1),
(40, 14, 7, 1),
(41, 14, 5, 1),
(42, 15, 12, 2),
(43, 15, 1, 1),
(44, 15, 2, 1),
(45, 15, 3, 2),
(46, 4, 1, 1),
(47, 4, 2, 1),
(48, 4, 3, 1),
(49, 17, 1, 1),
(50, 17, 2, 1),
(52, 17, 7, 1),
(53, 18, 1, 2),
(54, 18, 2, 1),
(56, 19, 29, 2),
(57, 20, 1, 1),
(60, 20, 3, 4),
(61, 22, 2, 1),
(62, 22, 3, 1),
(63, 22, 4, 1),
(66, 24, 2, 1),
(67, 24, 3, 1),
(68, 25, 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `Category_Id` int(6) NOT NULL,
  `Category_Name` varchar(150) NOT NULL,
  `Category_Desc` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`Category_Id`, `Category_Name`, `Category_Desc`) VALUES
(1, 'พิซซ่า', ''),
(2, 'พาสต้า', ''),
(3, 'ของทานเล่น', ''),
(4, 'เครื่องดื่ม', ''),
(5, 'ของหวาน', '');

-- --------------------------------------------------------

--
-- Table structure for table `deliveries`
--

CREATE TABLE `deliveries` (
  `Delivery_Id` int(10) NOT NULL,
  `Order_Id` int(10) NOT NULL,
  `Delivery_Number` char(15) NOT NULL,
  `Delivery_Status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `deliveries`
--

INSERT INTO `deliveries` (`Delivery_Id`, `Order_Id`, `Delivery_Number`, `Delivery_Status`) VALUES
(1, 13, 'OCT202529000001', 'กำลังจัดส่ง'),
(2, 3, 'OCT202529000002', 'จัดส่งสำเร็จ'),
(3, 9, 'OCT202529000003', 'จัดส่งสำเร็จ'),
(4, 7, 'OCT202529000004', 'จัดส่งสำเร็จ'),
(5, 11, 'OCT202529000005', 'กำลังจัดส่ง'),
(6, 4, 'OCT202529000006', 'จัดส่งสำเร็จ'),
(7, 5, 'OCT202529000007', 'กำลังจัดส่ง'),
(8, 6, 'OCT202529000008', 'กำลังจัดส่ง'),
(9, 1, 'OCT202529000009', 'กำลังจัดส่ง'),
(10, 2, 'OCT202529000010', 'กำลังจัดส่ง'),
(11, 8, 'OCT202529000011', 'กำลังจัดส่ง'),
(12, 15, 'OCT202530000001', 'กำลังจัดส่ง'),
(13, 16, 'OCT202530000002', 'กำลังจัดส่ง'),
(14, 19, 'OCT202531000001', 'กำลังจัดส่ง'),
(15, 20, 'OCT202531000002', 'กำลังจัดส่ง');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `Emp_Id` int(10) NOT NULL,
  `Emp_Fname` varchar(100) NOT NULL,
  `Emp_Lname` varchar(100) NOT NULL,
  `Emp_Hnumber` varchar(10) NOT NULL,
  `Emp_Alley` varchar(100) NOT NULL,
  `Emp_Village` varchar(10) NOT NULL,
  `Emp_Street` varchar(100) NOT NULL,
  `Emp_District` varchar(100) NOT NULL,
  `Emp_Subdistrict` varchar(100) NOT NULL,
  `Emp_Province` varchar(100) NOT NULL,
  `Emp_Poscode` varchar(15) NOT NULL,
  `Emp_Tel` varchar(15) NOT NULL,
  `Emp_Email` varchar(100) NOT NULL,
  `Emp_Role` varchar(100) NOT NULL,
  `Emp_Workyear` int(4) NOT NULL,
  `Emp_Salary` int(8) NOT NULL,
  `Emp_Username` varchar(10) NOT NULL,
  `Emp_Password` varchar(15) NOT NULL,
  `Emp_Status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`Emp_Id`, `Emp_Fname`, `Emp_Lname`, `Emp_Hnumber`, `Emp_Alley`, `Emp_Village`, `Emp_Street`, `Emp_District`, `Emp_Subdistrict`, `Emp_Province`, `Emp_Poscode`, `Emp_Tel`, `Emp_Email`, `Emp_Role`, `Emp_Workyear`, `Emp_Salary`, `Emp_Username`, `Emp_Password`, `Emp_Status`) VALUES
(2, 'Somchai', 'Srisuk', '12', 'ซอยสวน 3', 'หมู่1', 'ถนนเพชรเกษม', 'ภาษีเจริญ', 'บางแค', 'กรุงเทพมหานคร', '10160', '0812345678', 'somchai@gmail.com', 'ผู้จัดการ', 2025, 35000, 'somchai01', 'pass123', 'ปกติ'),
(3, 'Panupong', 'Saisopon', '180', 'กรุงเทพนนทบุรี', '-', 'กรุงเทพนนทบุรี', 'บางซืื่อ', 'บางซืื่อ', 'กรุงเทพมหานคร', '10800', '0611396355', 'saisopon64@gmail.com', 'พนักงาน', 2025, 10000, 'folknas', '1234', 'ปกติ'),
(4, 'Malee', 'Wongchai', '45', 'ซอยสาทร 5', 'หมู่2', 'ถนนสาทร', 'บางรัก', 'ยานนาวา', 'กรุงเทพมหานคร', '10500', '0898765432', 'malee@gmail.com', 'พนักงาน', 2025, 20000, 'malee02', 'pass234', 'ปกติ'),
(5, 'Anan', 'Chaiyaphum', '78', 'ซอยลาดพร้าว 12', 'หมู่3', 'ถนนลาดพร้าว', 'จตุจักร', 'ลาดพร้าว', 'กรุงเทพมหานคร', '10900', '0823456789', 'anan@gmail.com', 'พนักงาน', 2025, 15000, 'anan03', 'pass345', 'ลาออก'),
(6, 'Napat', 'Kanjan', '101', 'ซอยสุขุมวิท 7', 'หมู่4', 'ถนนสุขุมวิท', 'คลองเตย', 'คลองเตย', 'กรุงเทพมหานคร ', '10110', '0867890123', 'napat@gmail.com', 'พนักงาน', 2025, 30000, 'napat04', 'pass456', 'ปกติ');

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `Mem_Id` char(12) NOT NULL,
  `Mem_Fname` varchar(100) DEFAULT NULL,
  `Mem_Lname` varchar(100) DEFAULT NULL,
  `Mem_Email` varchar(100) NOT NULL,
  `Mem_Tel` varchar(15) DEFAULT NULL,
  `Mem_Sdate` date NOT NULL,
  `Mem_Status` varchar(50) NOT NULL,
  `Mem_Username` varchar(20) NOT NULL,
  `Mem_Password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`Mem_Id`, `Mem_Fname`, `Mem_Lname`, `Mem_Email`, `Mem_Tel`, `Mem_Sdate`, `Mem_Status`, `Mem_Username`, `Mem_Password`) VALUES
('20250001', 'Panupong', 'Saisopon', 'saisopon64@gmail.com', '0611396355', '2025-09-16', 'ปกติ', 'folknas', '1234'),
('20250002', 'Kanya', 'Phromjai', 'kanya.p@gmail.com', '0811111111', '2025-09-16', 'ปกติ', 'kanya01', 'kp123'),
('20250003', 'Sompop', 'Rattanakul', 'sompop.r@gmail.com', '0822222222', '2025-10-29', 'ปกติ', 'sompop02', 'sr234'),
('20250004', 'Siriporn', 'Lertwimon', 'siriporn.l@gmail.com', '0833333333', '2025-10-29', 'ถูกระงับ', 'siriporn03', 'sl345'),
('20250005', 'Thanawat', 'Jittrakul', 'thanawat.j@gmail.com', '0844444444', '2025-10-29', 'ปกติ', 'thanawat04', 'tj456'),
('20250006', 'Waranya', 'Charoensuk', 'waranya.c@gmail.com', '0855555555', '2025-10-29', 'ปกติ', 'waranya05', 'wc567'),
('20250007', 'Nattaporn', 'Suwannachai', 'nattaporn.s@gmail.com', '0866666666', '2025-10-29', 'ปกติ', 'nattaporn06', 'ns678'),
('20250008', 'Somchai', 'Srisuk', 'somchai@gmail.com', '0812345678', '2025-10-31', 'ปกติ', 'somchai02', '12345'),
('20250009', 'Somchai', 'Sopon', 'somchai@gmail.com', '0812346677', '2025-10-31', 'ปกติ', 'somchai03', '12345'),
('20250010', 'Somchai', 'Sopon', 'somchai@gmail.com', '0812346677', '2025-10-31', 'ปกติ', 'somsak', '123456');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `Order_Id` int(10) NOT NULL,
  `Cart_Id` int(10) NOT NULL,
  `Mem_Id` char(12) NOT NULL,
  `Order_Amount` int(10) NOT NULL,
  `Order_Status` varchar(50) NOT NULL,
  `Order_Date` datetime NOT NULL,
  `Order_Address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`Order_Id`, `Cart_Id`, `Mem_Id`, `Order_Amount`, `Order_Status`, `Order_Date`, `Order_Address`) VALUES
(1, 1, '20250001', 897, 'กำลังจัดส่ง', '2025-10-29 00:00:00', 'Soi Naradhiwas Rajanagarindra 7, Suan Phlu, Thung Maha Mek Subdistrict, Sathon District, Bangkok, 10120, Thailand'),
(2, 2, '20250001', 897, 'กำลังจัดส่ง', '2025-10-29 00:00:00', 'MBK Center, Phaya Thai Road, Wang Mai Subdistrict, Pathum Wan District, Bangkok, 10330, Thailand'),
(3, 3, '20250001', 1645, 'จัดส่งสำเร็จ', '2025-10-29 00:00:00', 'Soi Naradhiwas Rajanagarindra 7, Suan Phlu, Thung Maha Mek Subdistrict, Sathon District, Bangkok, 10120, Thailand'),
(4, 5, '20250002', 1514, 'จัดส่งสำเร็จ', '2025-10-29 00:00:00', 'The Pizza Company, Pathum Wan Intersection Skywalk, Siam, Pathum Wan Subdistrict, Pathum Wan District, Bangkok, 10330, Thailand'),
(5, 6, '20250002', 299, 'กำลังจัดส่ง', '2025-10-29 00:00:00', 'The Pizza Company, Pathum Wan Intersection Skywalk, Siam, Pathum Wan Subdistrict, Pathum Wan District, Bangkok, 10330, Thailand'),
(6, 7, '20250002', 518, 'กำลังจัดส่ง', '2025-10-29 00:00:00', 'The Pizza Company, Pathum Wan Intersection Skywalk, Siam, Pathum Wan Subdistrict, Pathum Wan District, Bangkok, 10330, Thailand'),
(7, 8, '20250002', 2113, 'กำลังจัดส่ง', '2025-10-29 00:00:00', 'The Pizza Company, Pathum Wan Intersection Skywalk, Siam, Pathum Wan Subdistrict, Pathum Wan District, Bangkok, 10330, Thailand'),
(8, 9, '20250002', 1515, 'กำลังจัดส่ง', '2025-10-29 00:00:00', 'The Pizza Company, Pathum Wan Intersection Skywalk, Siam, Pathum Wan Subdistrict, Pathum Wan District, Bangkok, 10330, Thailand'),
(9, 11, '20250005', 1614, 'จัดส่งสำเร็จ', '2025-10-29 00:00:00', 'Bang Phongphang Subdistrict, Yan Nawa District, Bangkok, 10120, Thailand'),
(10, 12, '20250005', 656, 'กำลังจัดเตรียมอาหาร', '2025-10-29 00:00:00', 'Bang Phongphang Subdistrict, Yan Nawa District, Bangkok, 10120, Thailand'),
(11, 13, '20250005', 398, 'กำลังจัดส่ง', '2025-10-29 00:00:00', 'Bang Phongphang Subdistrict, Yan Nawa District, Bangkok, 10120, Thailand'),
(12, 14, '20250005', 598, 'กำลังจัดเตรียมอาหาร', '2025-10-29 00:00:00', 'Bang Phongphang Subdistrict, Yan Nawa District, Bangkok, 10120, Thailand'),
(13, 15, '20250005', 1126, 'กำลังจัดส่ง', '2025-10-29 00:00:00', 'Bang Phongphang Subdistrict, Yan Nawa District, Bangkok, 10120, Thailand'),
(14, 4, '20250001', 817, 'กำลังจัดเตรียมอาหาร', '2025-10-29 00:00:00', 'Soi Naradhiwas Rajanagarindra 7, Suan Phlu, Thung Maha Mek Subdistrict, Sathon District, Bangkok, 10120, Thailand'),
(15, 17, '20250001', 797, 'กำลังจัดส่ง', '2025-10-30 00:00:00', 'MBK Center, Phaya Thai Road, Wang Mai Subdistrict, Pathum Wan District, Bangkok, 10330, Thailand'),
(16, 18, '20250001', 897, 'กำลังจัดส่ง', '2025-10-30 00:00:00', 'Soi Naradhiwas Rajanagarindra 7, Suan Phlu, Thung Maha Mek Subdistrict, Sathon District, Bangkok, 10120, Thailand'),
(17, 19, '20250001', 398, 'กำลังจัดเตรียมอาหาร', '2025-10-30 00:00:00', 'Soi Naradhiwas Rajanagarindra 7, Suan Phlu, Thung Maha Mek Subdistrict, Sathon District, Bangkok, 10120, Thailand'),
(18, 20, '20250001', 1175, 'กำลังจัดเตรียมอาหาร', '2025-10-31 00:00:00', 'ราชเทวี, Soi Phetchaburi 12/2, ชุมชนเภตรารัตน์, Thanon Phetchaburi Subdistrict, Ratchathewi District, Bangkok, 10400, Thailand'),
(19, 22, '20250008', 817, 'กำลังจัดส่ง', '2025-10-31 00:00:00', 'Soi Chan 39, ชุมชนจันทร์ร่ำรวย, Thung Wat Don Subdistrict, Sathon District, Bangkok, 10120, Thailand'),
(20, 24, '20250009', 518, 'กำลังจัดส่ง', '2025-10-31 00:00:00', 'Wat Duang Khae, Soi Wat Duang Khae, Wat Duang Khae Community, Rong Mueang Subdistrict, Pathum Wan District, Bangkok, 10330, Thailand');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `Product_Id` int(6) NOT NULL,
  `Category_id` int(6) NOT NULL,
  `Emp_Id` int(10) NOT NULL,
  `Product_Name` varchar(150) NOT NULL,
  `Product_Price` int(6) NOT NULL,
  `Product_Unitcost` int(12) NOT NULL,
  `Product_Quantity` int(6) NOT NULL,
  `Product_Status` varchar(100) NOT NULL,
  `Product_Image` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`Product_Id`, `Category_id`, `Emp_Id`, `Product_Name`, `Product_Price`, `Product_Unitcost`, `Product_Quantity`, `Product_Status`, `Product_Image`) VALUES
(1, 1, 2, 'พิซซ่าเปปเปอโรนี', 299, 25, 88, 'ปกติ', '/picture/1758715703311-62019604.webp'),
(2, 1, 2, 'พิซซ่าดับเบิ้ลชีส', 299, 35, 82, 'ปกติ', '/picture/1757942278203-122651760.webp'),
(3, 1, 2, 'พิซซ่าแฮมและปูอัด', 219, 25, 84, 'ปกติ', '/picture/1758024540817-667158097.webp'),
(4, 1, 2, 'พิซซ่ามีทเดอลุกซ์', 299, 30, 94, 'ปกติ', '/picture/1758024760205-180826679.webp'),
(5, 1, 2, 'พิซซ่าซีฟู้ด', 399, 25, 93, 'ปกติ', '/picture/1758024776696-350754006.webp'),
(6, 2, 2, 'สปาเก็ตตี้แฮมและเห็ด', 199, 20, 97, 'ปกติ', '/picture/1758025208784-780015908.webp'),
(7, 2, 2, 'สปาเก็ตตี้คาร์โบนาร่า', 199, 15, 92, 'ปกติ', '/picture/1758025603063-392246244.webp'),
(8, 2, 2, 'สปาเก็ตตี้ขี้เมาไส้กรอก', 199, 20, 98, 'ปกติ', '/picture/1758026104937-597065834.webp'),
(9, 3, 2, 'นักเก็ตไก่ 6 ชิ้น', 119, 15, 100, 'ปกติ', '/picture/1758026122982-804142617.webp'),
(10, 3, 2, 'เฟรนช์ฟรายส์', 119, 10, 99, 'ปกติ', '/picture/1758026141937-258624326.webp'),
(11, 3, 2, 'ขนมปังกระเทียม 6 ชิ้น', 119, 15, 97, 'ปกติ', '/picture/1758026165198-526045446.webp'),
(12, 4, 2, 'โค้ก 1.25 ลิตร', 45, 14, 96, 'ปกติ', '/picture/1758026184270-524314673.webp'),
(13, 4, 2, 'โค้ก (ไม่มีน้ำตาล) 1.25 ลิตร', 45, 15, 102, 'ปกติ', '/picture/1758026201915-937913291.webp'),
(14, 5, 2, 'ช็อกโกแล็ตลาวา', 65, 0, 98, 'ปกติ', '/picture/1758026214798-774511419.webp'),
(29, 1, 3, 'พิซซ่าหน้าใหม่', 199, 23123, 2, 'ไม่พร้อมทำการ', '/picture/product-1761908522779-119293009.webp');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`Address_Id`),
  ADD KEY `Mem_Id` (`Mem_Id`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`Cart_Id`),
  ADD KEY `Mem_Id` (`Mem_Id`),
  ADD KEY `carts_ibfk_2` (`Address_Id`);

--
-- Indexes for table `cart_products`
--
ALTER TABLE `cart_products`
  ADD PRIMARY KEY (`Cartproduct_Id`),
  ADD KEY `Cart_Id` (`Cart_Id`),
  ADD KEY `Product_Id` (`Product_Id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`Category_Id`);

--
-- Indexes for table `deliveries`
--
ALTER TABLE `deliveries`
  ADD PRIMARY KEY (`Delivery_Id`),
  ADD KEY `Order_Id` (`Order_Id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`Emp_Id`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`Mem_Id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`Order_Id`),
  ADD KEY `Cart_Id` (`Cart_Id`),
  ADD KEY `Mem_Id` (`Mem_Id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`Product_Id`),
  ADD KEY `Category_id` (`Category_id`),
  ADD KEY `Emp_Id` (`Emp_Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `Address_Id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `Cart_Id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `cart_products`
--
ALTER TABLE `cart_products`
  MODIFY `Cartproduct_Id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `Category_Id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `deliveries`
--
ALTER TABLE `deliveries`
  MODIFY `Delivery_Id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `Emp_Id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `Order_Id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `Product_Id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`Mem_Id`) REFERENCES `members` (`Mem_Id`);

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`Mem_Id`) REFERENCES `members` (`Mem_Id`),
  ADD CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`Address_Id`) REFERENCES `addresses` (`Address_Id`) ON DELETE SET NULL;

--
-- Constraints for table `cart_products`
--
ALTER TABLE `cart_products`
  ADD CONSTRAINT `cart_products_ibfk_1` FOREIGN KEY (`Cart_Id`) REFERENCES `carts` (`Cart_Id`),
  ADD CONSTRAINT `cart_products_ibfk_2` FOREIGN KEY (`Product_Id`) REFERENCES `products` (`Product_Id`);

--
-- Constraints for table `deliveries`
--
ALTER TABLE `deliveries`
  ADD CONSTRAINT `deliveries_ibfk_1` FOREIGN KEY (`Order_Id`) REFERENCES `orders` (`Order_Id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`Cart_Id`) REFERENCES `carts` (`Cart_Id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`Mem_Id`) REFERENCES `members` (`Mem_Id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`Category_id`) REFERENCES `categories` (`Category_Id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`Emp_Id`) REFERENCES `employees` (`Emp_Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2017-08-13 11:11:15
-- 服务器版本： 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `autotool`
--

-- --------------------------------------------------------

--
-- 表的结构 `project`
--

CREATE TABLE `project` (
  `id` int(10) NOT NULL,
  `onlyid` varchar(50) NOT NULL,
  `time` timestamp(2) NULL DEFAULT CURRENT_TIMESTAMP(2),
  `userid` int(10) NOT NULL,
  `workbench` longtext NOT NULL,
  `createdjson` text NOT NULL,
  `state` bit(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- 转存表中的数据 `project`
--

INSERT INTO `project` (`id`, `onlyid`, `time`, `userid`, `workbench`, `createdjson`, `state`) VALUES
(21, '9739bc7e-e229-cb01-2b61-baab76b23273', '2017-08-13 08:13:52.07', 8, '<div id=\"sodatank844\" data-name=\"sodatank\" data-comment=\"\" data-imgw=\"49\" data-imgh=\"72\" data-modify=\"flase\" data-weight=\"\" class=\"WorkbenchSodaTank\" data-type=\"WorkbenchObject\" style=\"left: 144px; top: 95px;\"><div data-type=\"Interface\" data-iconnect=\"\" data-inumber=\"I1\" data-itype=\"InterfaceLine12Up\" class=\"InterfaceLine12 InterfaceLine12ForSodaTankI1\"></div><div data-type=\"Interface\" data-iconnect=\"\" data-inumber=\"I2\" data-itype=\"InterfaceLine12Down\" class=\"InterfaceLine12 InterfaceLine12ForSodaTankI2\"></div></div><div id=\"convert12730\" data-name=\"convert12\" data-comment=\"\" data-imgw=\"11\" data-imgh=\"17\" data-modify=\"flase\" class=\"WorkbenchConvert12 WorkbenchConvert12C\" data-type=\"WorkbenchObject\" style=\"left: 307px; top: 301px;\"><div data-type=\"Interface\" data-iconnect=\"\" data-inumber=\"I1\" data-itype=\"InterfaceLine12Up\" class=\"InterfaceLine12 InterfaceLine12ForConvert12I1\"></div><div data-type=\"Interface\" data-iconnect=\"\" data-inumber=\"I2\" data-itype=\"InterfaceLine12Down\" class=\"InterfaceLine12 InterfaceLine12ForConvert12I2\"></div><div data-type=\"Interface\" data-iconnect=\"\" data-inumber=\"I3\" data-itype=\"InterfaceLine11Left\" class=\"InterfaceLine11 InterfaceLine11ForConvert12I3\"></div></div><div id=\"reactor283\" data-name=\"reactor\" data-comment=\"\" data-imgw=\"92\" data-imgh=\"100\" data-modify=\"flase\" class=\"WorkbenchReactor WorkbenchReactorC\" data-type=\"WorkbenchObject\" style=\"left: 290px; top: 153px;\"><div data-type=\"Interface\" data-iconnect=\"\" data-inumber=\"I1\" data-itype=\"InterfaceLine12Up\" class=\"InterfaceLine12 InterfaceLine12ForReactorI1\"></div><div data-type=\"Interface\" data-iconnect=\"\" data-inumber=\"I2\" data-itype=\"InterfaceLine12Up\" class=\"InterfaceLine12 InterfaceLine12ForReactorI2\"></div><div data-type=\"Interface\" data-iconnect=\"\" data-inumber=\"I3\" data-itype=\"InterfaceLine12Up\" class=\"InterfaceLine12 InterfaceLine12ForReactorI3\"></div><div data-type=\"Interface\" data-iconnect=\"\" data-inumber=\"I4\" data-itype=\"InterfaceLine11Left\" class=\"InterfaceLine11 InterfaceLine11ForReactorI4\"></div><div data-type=\"Interface\" data-iconnect=\"\" data-inumber=\"I5\" data-itype=\"InterfaceLine11Right\" class=\"InterfaceLine11 InterfaceLine11ForReactorI5\"></div></div>', '{\"project_name\":\"上位机\",\"unit\":[{\"uname\":\"u01\",\"controls\":[],\"function\":[]},{\"uname\":\"u02\",\"controls\":[],\"function\":[]}],\"project_id\":\"9739bc7e-e229-cb01-2b61-baab76b23273\",\"unit_sum\":\"2\"}', b'0'),
(23, 'bc6bd4a4-0b83-3585-70a4-5d2a54e9d81e', '2017-08-13 08:25:33.94', 8, '<div id=\"sodatank080\" data-name=\"sodatank\" data-comment=\"\" data-imgw=\"49\" data-imgh=\"72\" data-modify=\"flase\" data-weight=\"\" class=\"WorkbenchSodaTank\" data-type=\"WorkbenchObject\" style=\"left: 184px; top: 71px;\"><div data-type=\"Interface\" data-iconnect=\"\" data-inumber=\"I1\" data-itype=\"InterfaceLine12Up\" class=\"InterfaceLine12 InterfaceLine12ForSodaTankI1\"></div><div data-type=\"Interface\" data-iconnect=\"line12606#I1\" data-inumber=\"I2\" data-itype=\"InterfaceLine12Down\" class=\"InterfaceLine12 InterfaceLine12ForSodaTankI2 IConnected\"></div></div><div id=\"tem_sensor584\" data-name=\"tem_sensor\" data-comment=\"\" data-imgw=\"49\" data-imgh=\"27\" data-modify=\"flase\" class=\"Workbenchtem_sensor\" data-type=\"WorkbenchObject\" style=\"left: 189px; top: 97px;\"></div><div id=\"pump852\" data-name=\"pump\" data-comment=\"\" data-imgw=\"55\" data-imgh=\"55\" data-modify=\"flase\" class=\"WorkbenchPump\" data-type=\"WorkbenchObject\" style=\"left: 36px; top: 254px;\"><div data-type=\"Interface\" data-iconnect=\"\" data-inumber=\"I1\" data-itype=\"InterfaceLine11Left\" class=\"InterfaceLine11 InterfaceLine11ForPumpI1\"></div><div data-type=\"Interface\" data-iconnect=\"line11032#I1\" data-inumber=\"I2\" data-itype=\"InterfaceLine11Right\" class=\"InterfaceLine11 InterfaceLine11ForPumpI2 IConnected\"></div></div><div id=\"line12606\" data-name=\"line12\" data-type=\"WorkbenchObject\" data-comment=\"\" class=\"WorkbenchLine12\" style=\"height: 144.003px; left: 205.99px; top: 135.99px;\"><div data-type=\"Interface\" data-iconnect=\"sodatank080#I2\" data-inumber=\"I1\" data-itype=\"InterfaceLine12Up\" class=\"InterfaceLine12 InterfaceLine12ForLine12I1 IConnected\" style=\"\"></div><div data-type=\"Interface\" data-iconnect=\"convert23043#I1\" data-inumber=\"I2\" data-itype=\"InterfaceLine12Down\" class=\"InterfaceLine12 InterfaceLine12ForLine12I2 IConnected\"></div></div><div id=\"convert23043\" data-name=\"convert23\" data-type=\"WorkbenchObject\" data-comment=\"\" class=\"WorkbenchConvert23\" style=\"left: 199.983px; top: 277.986px;\"><div data-type=\"Interface\" data-iconnect=\"line12606#I2\" data-inumber=\"I1\" data-itype=\"InterfaceLine12Up\" class=\"InterfaceLine12 InterfaceLine12ForConvert23I1 IConnected\" style=\"\"></div><div data-type=\"Interface\" data-iconnect=\"line11032#I2\" data-inumber=\"I2\" data-itype=\"InterfaceLine11Left\" class=\"InterfaceLine11 InterfaceLine11ForConvert23I2 IConnected\"></div></div><div id=\"line11032\" data-name=\"line11\" data-type=\"WorkbenchObject\" data-comment=\"\" class=\"WorkbenchLine11\" style=\"width: 114.003px; left: 87.9861px; top: 283.976px;\"><div data-type=\"Interface\" data-iconnect=\"pump852#I2\" data-inumber=\"I1\" data-itype=\"InterfaceLine11Left\" class=\"InterfaceLine11 InterfaceLine11ForLine11I1 IConnected\"></div><div data-type=\"Interface\" data-iconnect=\"convert23043#I2\" data-inumber=\"I2\" data-itype=\"InterfaceLine11Right\" class=\"InterfaceLine11 InterfaceLine11ForLine11I2 IConnected\" style=\"\"></div></div>', '{\"project_name\":\"上位机\",\"unit\":[{\"uname\":\"u01\",\"controls\":[],\"function\":[]},{\"uname\":\"u02\",\"controls\":[],\"function\":[]}],\"project_id\":\"bc6bd4a4-0b83-3585-70a4-5d2a54e9d81e\",\"unit_sum\":\"2\"}', b'0');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `id` int(5) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `tel` varchar(20) CHARACTER SET utf8mb4 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `tel`) VALUES
(1, 'test1', '123456', '2147483647'),
(8, 'test', '123456', '15652505356'),
(9, 'test2', '123456', '15652505356'),
(10, 'test3', '123456', '15652505356');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `project`
--
ALTER TABLE `project`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

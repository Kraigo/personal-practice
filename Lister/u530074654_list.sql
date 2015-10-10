
-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Апр 11 2015 г., 08:18
-- Версия сервера: 5.1.73
-- Версия PHP: 5.2.17

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `u530074654_list`
--

-- --------------------------------------------------------

--
-- Структура таблицы `accounts`
--

CREATE TABLE IF NOT EXISTS `accounts` (
  `account_id` int(11) NOT NULL AUTO_INCREMENT,
  `account_username` varchar(30) NOT NULL,
  `account_password` varchar(32) NOT NULL,
  `account_hash` varchar(32) NOT NULL,
  `account_firstname` varchar(32) DEFAULT NULL,
  `account_lastname` varchar(32) DEFAULT NULL,
  `account_avatar` text,
  PRIMARY KEY (`account_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;


--
-- Структура таблицы `lists`
--

CREATE TABLE IF NOT EXISTS `lists` (
  `list_id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL,
  `list_title` text NOT NULL,
  `list_category` varchar(32) NOT NULL,
  `list_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `list_rating` tinyint(4) DEFAULT NULL,
  `list_comment` text,
  `list_modified` datetime DEFAULT NULL,
  PRIMARY KEY (`list_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=51 ;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

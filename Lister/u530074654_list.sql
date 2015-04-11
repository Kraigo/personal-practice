
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
-- Дамп данных таблицы `accounts`
--

INSERT INTO `accounts` (`account_id`, `account_username`, `account_password`, `account_hash`, `account_firstname`, `account_lastname`, `account_avatar`) VALUES
(1, 'lister', '28c8edde3d61a0411511d3b1866f0636', 'dd40a99b51f630079ae67250d110bbf3', NULL, NULL, NULL),
(2, 'test', '28c8edde3d61a0411511d3b1866f0636', '07d2e48e75e493d413f523f337faae3e', NULL, NULL, NULL),
(3, 'lister2', '28c8edde3d61a0411511d3b1866f0636', '60ca09fda318378cc55bfaf3d75f4496', NULL, NULL, NULL),
(4, 'user', '28c8edde3d61a0411511d3b1866f0636', 'f1ed4e0a7f4b6d0360e767afb73ee235', NULL, NULL, NULL),
(5, '123', 'd9b1d7db4cd6e70935368a1efb10e377', '6f90528abfbdfa8355617d3b702e67c9', NULL, NULL, NULL),
(6, '', '130811dbd239c97bd9ce933de7349f20', 'ef4a9b3ba6d65751cdbb1908f9024e50', NULL, NULL, NULL),
(7, 'panuka', 'e659d22273a72d60d664453a6faf0ffe', '62a36922c9cc15a9b10364625ac6fb99', NULL, NULL, NULL),
(8, 'iBiZoNiX', '897c8fde25c5cc5270cda61425eed3c8', 'a80b8fd975dd5b3f4b46bc849b4f90af', NULL, NULL, NULL),
(9, 'zanzen', 'd60f4e0377085ea8a0c3b8a7f0241302', '37fac9aa16f54a1eec674433b270ac47', NULL, NULL, NULL);

-- --------------------------------------------------------

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

--
-- Дамп данных таблицы `lists`
--

INSERT INTO `lists` (`list_id`, `account_id`, `list_title`, `list_category`, `list_date`, `list_rating`, `list_comment`, `list_modified`) VALUES
(50, 1, 'Игра престолов', 'serie', '2015-04-10 10:03:14', NULL, NULL, NULL),
(2, 2, 'Test2', 'serie', '2015-04-05 22:21:06', 4, 'Какой-то комментарий, который тут останется! :)', '2015-04-05 22:21:06'),
(14, 1, 'Дарья', 'serie', '2015-04-05 19:02:24', NULL, NULL, NULL),
(17, 1, 'Марсианин', 'book', '2015-04-05 19:02:26', 0, '', '2015-04-10 10:02:59'),
(20, 1, 'Лучше звоните Солу!', 'serie', '2015-04-05 22:45:05', 5, 'Клёвый фильмец!', '2015-04-05 22:45:05'),
(21, 3, 'Test>', 'book', '2015-04-05 21:27:36', NULL, NULL, NULL),
(22, 4, 'FA', 'movie', '2015-04-05 23:01:26', NULL, NULL, NULL),
(23, 4, 'gdfgdfg', 'movie', '2015-04-05 23:01:38', NULL, NULL, NULL),
(24, 4, 'kjl', 'movie', '2015-04-05 23:01:52', NULL, NULL, NULL),
(26, 5, 'asdfasdfdasf', 'book', '2015-04-05 23:04:45', NULL, NULL, NULL),
(27, 6, 'Тестовая книга', 'book', '2015-04-06 07:20:11', 5, '', '2015-04-06 10:00:12'),
(30, 6, 'Тестовый фильм', 'movie', '2015-04-06 08:06:23', NULL, NULL, NULL),
(29, 6, 'Тестовый сериал', 'serie', '2015-04-06 07:20:27', NULL, NULL, NULL),
(31, 6, 'Фильмец', 'movie', '2015-03-05 08:15:00', 5, 'Фильм просто бомба!', '2015-04-06 10:31:57'),
(32, 6, 'Азбука', 'book', '2015-04-06 10:30:03', NULL, NULL, NULL),
(33, 6, 'Новый элемент', '', '2015-04-06 11:07:56', NULL, NULL, NULL),
(34, 6, '23', 'book', '2015-04-06 11:11:02', NULL, NULL, NULL),
(35, 6, 'sdf', '', '2015-04-06 11:13:13', NULL, NULL, NULL),
(36, 6, '123', '', '2015-04-06 11:14:27', NULL, NULL, NULL),
(37, 6, 'gdf', '', '2015-04-06 11:15:01', NULL, NULL, NULL),
(38, 6, 'dfg', '', '2015-04-06 11:15:23', NULL, NULL, NULL),
(39, 6, '123', '', '2015-04-06 11:15:56', NULL, NULL, NULL),
(40, 6, 'афыы', 'book', '2015-04-06 11:19:28', NULL, NULL, NULL),
(41, 6, 'asdas', 'book', '2015-04-06 11:21:20', NULL, NULL, NULL),
(42, 6, 'Нужно', 'book', '2015-04-06 11:21:28', NULL, NULL, NULL),
(43, 6, 'Создать', 'serie', '2015-04-06 11:21:32', NULL, NULL, NULL),
(44, 6, 'Больше', 'movie', '2015-04-06 11:21:37', NULL, NULL, NULL),
(45, 6, 'Текстовых', 'movie', '2015-04-06 11:21:42', NULL, NULL, NULL),
(46, 6, 'Записей', 'serie', '2015-04-06 11:21:46', NULL, NULL, NULL),
(47, 6, 'Проверка?', 'book', '2015-04-06 11:21:58', NULL, NULL, NULL),
(48, 6, 'Не думаю!', 'book', '2015-04-06 11:22:03', NULL, NULL, NULL),
(49, 6, 'Куку', 'book', '2015-04-06 18:40:43', 5, 'ловырларыл', '2015-04-06 18:41:00');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

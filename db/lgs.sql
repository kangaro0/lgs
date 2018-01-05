-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 05. Jan 2018 um 16:43
-- Server-Version: 10.1.16-MariaDB
-- PHP-Version: 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `lgs`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `title` varchar(70) NOT NULL,
  `date` datetime NOT NULL,
  `location` int(11) NOT NULL,
  `organizer` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `events`
--

INSERT INTO `events` (`id`, `title`, `date`, `location`, `organizer`) VALUES
(1, 'Christmas Rockparty', '2016-12-25 20:00:00', 1, 'Michael Minich, Stadtsaal'),
(2, 'Test', '2016-11-24 20:43:00', 1, '123'),
(3, 'Superfeeeeetz', '2016-11-13 13:30:00', 5, 'Johannes Herbert');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `galleries`
--

CREATE TABLE `galleries` (
  `id` int(11) NOT NULL,
  `title` varchar(70) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `galleries`
--

INSERT INTO `galleries` (`id`, `title`, `date`) VALUES
(1, 'Testgallerie', '2016-11-30'),
(2, 'Test', '2016-11-01');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `locations`
--

CREATE TABLE `locations` (
  `id` int(11) NOT NULL,
  `title` varchar(25) NOT NULL,
  `addressLine1` varchar(70) DEFAULT NULL,
  `city` varchar(35) DEFAULT NULL,
  `state` varchar(25) DEFAULT NULL,
  `postcode` varchar(8) DEFAULT NULL,
  `country` varchar(25) DEFAULT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `locations`
--

INSERT INTO `locations` (`id`, `title`, `addressLine1`, `city`, `state`, `postcode`, `country`, `latitude`, `longitude`) VALUES
(1, 'Stadtsaal Gartenstadt', 'Asternweg 2', 'Bad Neustadt an der Saale', NULL, '97616 ', 'Germany', 50.3263, 10.1943),
(2, 'Schlosshof MÃ¼nnerstadt', 'Deutschherrenstrasse 18', 'MÃ¼nnerstadt', '', '97702 ', 'Germany', 50.2498, 10.1963),
(3, 'Daheim', '8 Ostergarten', 'Oberelsbach', 'BY', '97656', 'DE', 50.4234, 10.0971),
(5, 'Antonia Freund', '4 TulpenstraÃŸe', 'Wiesentheid', 'BY', '97353', 'DE', 49.7986, 10.3469);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `location` (`location`);

--
-- Indizes für die Tabelle `galleries`
--
ALTER TABLE `galleries`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT für Tabelle `galleries`
--
ALTER TABLE `galleries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT für Tabelle `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `locations_id` FOREIGN KEY (`location`) REFERENCES `locations` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

CREATE TABLE `categories` (
  `categid` int(11) NOT NULL AUTO_INCREMENT,
  `categdescr` varchar(45) NOT NULL,
  PRIMARY KEY (`categid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

INSERT INTO `categories` (`categid`, `categdescr`) VALUES
(1, 'accessori'),
(2, 'abbigliamento'),
(3, 'calzature');

CREATE TABLE `products` (
  `prodid` int(11) NOT NULL AUTO_INCREMENT,
  `proddescr` varchar(45) NOT NULL,
  `categid` int(11) NOT NULL,
  `prodcost` decimal(8,2) NOT NULL,
  PRIMARY KEY (`prodid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

INSERT INTO `products` (`prodid`, `proddescr`, `categid`, `prodcost`) VALUES
(1, 'pantaloni', 2, 18.99),
(2, 'camicia', 2, 7.30),
(3, 'maglione', 2, 27.45),
(4, 'jeans', 2, 19.90),
(5, 'borsa in pelle', 1, 45.60),
(6, 'cintura in pelle', 1, 13.30),
(7, 'scarpe da tennis', 3, 25.50),
(8, 'scarpe da uomo', 3, 18.90),
(9, 'occhiali da sole', 1, 18.60),
(10, 'scarpe da donna', 3, 31.40),
(11, 'stivali in pelle', 3, 21.20);


CREATE TABLE `users` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `usersurname` varchar(45) NOT NULL,
  `useremail` varchar(45) NOT NULL,
  `userpasswd` varchar(32) NOT NULL,
  `userlevel` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`userid`),
  UNIQUE KEY `useremail_UNIQUE` (`useremail`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

INSERT INTO `users` (`userid`, `username`, `usersurname`, `useremail`, `userpasswd`, `userlevel`) VALUES
(1, 'Mario', 'Rossi', 'mario@rossi.it', '123456', 1);
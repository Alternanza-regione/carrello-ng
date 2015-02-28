CREATE TABLE `categories` (
  `categid` int(11) NOT NULL AUTO_INCREMENT,
  `categdescr` varchar(45) NOT NULL,
  PRIMARY KEY (`categid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;


CREATE TABLE `products` (
  `prodid` int(11) NOT NULL AUTO_INCREMENT,
  `proddescr` varchar(45) NOT NULL,
  `categid` int(11) NOT NULL,
  `prodcost` decimal(8,2) NOT NULL,
  PRIMARY KEY (`prodid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE `users` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `usersurname` varchar(45) NOT NULL,
  `useremail` varchar(45) NOT NULL,
  `userpasswd` varchar(32) NOT NULL,
  `userlevel` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`userid`),
  UNIQUE KEY `useremail_UNIQUE` (`useremail`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

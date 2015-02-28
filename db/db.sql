CREATE TABLE `users` (
  `userid` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `usersurname` VARCHAR(45) NOT NULL,
  `useremail` VARCHAR(45) NOT NULL,
  `userpasswd` VARCHAR(32) NOT NULL,
  `userlevel` INT NOT NULL DEFAULT '1',
  PRIMARY KEY (`userid`),
  UNIQUE INDEX `useremail_UNIQUE`(`useremail`));

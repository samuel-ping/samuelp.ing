# Setting Up and Installing Matomo on AWS EC2 using Nginx

## Setting Up Matomo on EC2 + Nginx

1. Create EC2 instance. Allow HTTP (port 80, for LetEncrypt when getting an SSL cert), and HTTPS.
2. Update apt packages (`sudo apt-get update`).
3. Install nginx package.
4. Install packages with `sudo apt-get install php php-curl php-gd php-cli mysql-server php-mysql php-xml php-mbstring`.
5. (For custom domains) Create an elastic IP for EC2 instance and add it as an A record to NameCheap.
6. To install SSL cert, follow [this guide](https://certbot.eff.org/lets-encrypt/ubuntufocal-nginx). That's for Nginx on Ubuntu 20.04.
   - Note: testing the renewal failed for me... I'll deal with that later
7. Clone this convenient [Nginx configuration](https://github.com/matomo-org/matomo-nginx) for Matomo.
8. Copy the `matomo.conf` file to `/etc/nginx/sites-available`.
9. Run through the file and make the edits you need.
10. Follow the readme to make a soft link between your `sites-available` and `sites-enabled` directories.
11. Delete `default` in `/etc/nginx/sites-available` and `/etc/nginx/sites-enabled`.
12. Start/restart Nginx!
    - I had a problem here- When starting nginx, it failed with the error it could not bind to port 443 and 80. Solution (Courtesy of [this StackOverflow answer](https://stackoverflow.com/a/51664874/13026376)):
      1. Run `sudo pkill -f nginx & wait $!`
      2. Start Nginx again with `sudo systemctl start nginx`
13. Install `php-fpm` package with `sudo apt-get install php-fpm`. This installed `php-fpm7.4` for me.
    - Check that the service is running with `systemctl status php<version>-fpm`.
14. Update `/etc/nginx/sites-available/matomo.conf` accordingly and restart Nginx.
15. Now the Matomo installation page should be shining bright in your face!!

## Installing Matomo

1. The website should be pretty self-explanatory.
2. Creating a db in MySQL:
   1. I had to log into MySQL as root.
   2. `CREATE DATABASE <dbname>;` <- creates database
   3. Create user (named "matomo" in this case): `create user 'matomo'@localhost identified by '<password>';`
   4. Grant user permissions: `GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, INDEX, DROP, ALTER, CREATE TEMPORARY TABLES, LOCK TABLES ON <dbname>.* TO 'matomo'@'localhost';`
   5. You can now use this user to log into your matomo website.

## Adding Matomo to Website

1. Consider [this for Next.js](https://www.npmjs.com/package/@socialgouv/matomo-next). Most frameworks have a Matomo package for them.

## Notes

- If you run into any issues, check the logs! (Located by default at `/var/log/nginx`)

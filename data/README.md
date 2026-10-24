# Data

This subdirectory has some files containing visitor data to the site:
- `goatcounter-country-stats.json` is the visits to my site from Jan 1 2024 to May 25 2025. This is used on `/stats` into the aggregate visitor count.
- `umami-country-stats.json` is a placeholder file for local development. Umami is actively tracking the visits to my site, so there the GitHub Actions `deploy.yml` cron job is running daily to pull the latest numbers into the site.
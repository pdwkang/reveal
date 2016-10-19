# Developer Challenge
Thanks for being interested in a job at Turner.  You will have 24 hours from receipt of this document to:

* Write the code to complete the challenge
* Push it up to a github or bitbucket public repository. We will review this with you during the next step, so don't delete it.
* Send us the URL to your repository.

We will then clone your repository, run the code, and assess your solution.

## The Problem

We would like you to build an application that allows users to:

* Search for a Title by its name.
* Display the titles that match the above criteria.
* Allow the user to pull up detailed information about a selected title from the list.
* Look in the email we sent you for any additional requirements (if any).

## Data

The database that contains the title data is provided in 4 forms: MongoDB, SQL Server Express, SQL Server CE and Azure SQL. For mobile applicants, there is also an HTTP API that returns the data as JSON.  Unless otherwise directed, you can use any one of these for the exercise. Each one has the same data, so only choose one.

### MongoDB
The connect string for the Mongo database is: mongodb://readonly:turner@ds043348.mongolab.com:43348/dev-challenge


### SQL Server [Requires Install]
The SQL Server Express files are in the repository under "database\SQL Server Express...". Look at Readme.txt for clues for getting your database installed.

The SQL Server CE file is in the repository as "database\SQL Server CE\Titles.sdf".


## Code
Unless otherwise directed, you have two options for building a website, .Net and node.js.  **There is a very good chance we will request you to use a specific framework, so double check the email we sent you to ensure you pick the correct one.**

For mobile developers, you will be given the option to write your app targeting either iOS or Android devices.  **Make sure to check the instructions in the email from your recruiter to make sure you choose the correct platform.**

If you are building an Android app, please include the apk with your submission.

## Hints

* Do your best to impress us.
* Expect us to Lint your javascript.
* Form is as important as function.  If your app works, but is written like a website from 2001, that would be bad.
* We're suckers for new technologies (i.e. Angular, media queries, MVC 4, Handlebars).
* Creativity: Don't like our requirements? Feel free to enhance this app as you see fit.
* Feel free to host the app somewhere (Azure, EC2, AppHarbor, etc)
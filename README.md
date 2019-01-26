<p align="center">
<img src="https://github.com/Buroni/vocabin/blob/master/src/assets/vocabin_logo.png" style="text-align: center;" width="228" height="101" />
</p>

##

Vocabin converts raw text to flashcards with English translations, organised by difficulty and ready to import into flashcard applications like Anki.

Vocabin is live at http://vocabin.net

## Running Locally

After cloning this repo and navigating to the project root, follow the steps below to set up the application on your local machine:

1. Run `npm install` in both the /client and /server directories.
2. Upload the word frequency data located in /word_freq_data to a local DB, with tables named `word_freq_{language}` and columns `word, freq, id`.
3. Obtain a google translate API key
4. Create a file `config/dev.json` of the following format:

```
{
  "googleTranslateApiKey": "{api key}",
  "cmdPath": "",
  "mysqlCredentials": {
    "database": "{database name}",
    "username": "{username}",
    "password": "{password}",
    "host": "{host}"
  }
}
```
5. Navigate to /server and run `node server.js`
6. Navigate to /client and run `ng serve`

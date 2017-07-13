# RPS - Riot Pixels Scraper ![riot-pixels-logo](http://static.riotpixels.com/i/bar-icon-logo-nu.png)

A REST-like scraper for [en.riotpixels.com](http://en.riotpixels.com)
(~~please don't sue me~~).

### Endpoints:

   * /games/game-title
    
   e.g.
   
    http://localhost:3000/games/witcher-3-wild-hunt
   *** 
    {
       "title": "Witcher 3: Wild Hunt, The",
       "cover": "http://s01.riotpixels.net/data/ee/44/ee44f63d-ded1-4523-b799-67e826535ea1.jpg.240p.jpg",
       "developers": [
          "CD Projekt RED"
       ],
       "publishers": [
          "Spike Chunsoft"
       ],
       "score": 87,
       "platforms": [
          "PC",
          "Microsoft Xbox One",
          "Sony PlayStation 4"
       ]
    }
    
   * /companies/company-name
   
   e.g.
   
    http://localhost:3000/companies/cd-projekt-red-s-a
   ***
    {
       "title": "CD Projekt RED S.A.",
       "platforms": [
          "PC",
          "Microsoft Xbox One",
          "Sony PlayStation 4",
          "Sony PlayStation 3",
          "Microsoft Xbox 360",
          "Android",
          "Apple iOS",
          "Apple Mac"
       ]
    }
    
***

##### Thanks: http://en.riotpixels.com

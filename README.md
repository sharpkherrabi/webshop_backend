# Webshop Backend
## Docker
* Docker starten, in den Projektordner navigieren und :
    Im Vordergrund:  
    `$ docker-compose up --build`  
    Im Hintergrund:  
    `$ docker-compose up -d --build`  
    **docker-compose stoppen**
    `$ docker-compose down` 
    Bei Problemen: liegt meistens daran, dass benötigte Container schon benutzt werden ->  
    `$ docker container ps -a`  
    `$ docker container stop  <ertsten 3 ID Zeichen>`  
    `$ docker container rm <ersten 3 ID Zeichen>`  


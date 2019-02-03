# Webshop Backend  
## Funktionalität
  Produkte und Bestellungen können angelegt, bearbeitet, angezeigt und gelöscht werden. 
  Produkteigenschaften: Name, Beschreibung, Anzahl(Verfügbar), Preis und Image(URL). 
  Bestellungseigenschaften: Besteller, Producten(id, Anzahl), Adresse(Straße, HausNr, Postleitzahl, Stadt, Land), Email.  
  Beim ertellen des Orders: 1. wird die Anzahl von verfügbaren Produkten reduziert. 2. Preis wird berechnet.  
  Die Suche nach Produkten funktioniert sowie einzeln nach Namen und Beschreibung  als auch nach Namen und Beschreibung zusammen.  
  
## Backend starten  
  * Mongo local installieren  
  * Module installieren:  
  `$ npm install`  
  * Backend starten  
  `$ npm start`  
  * Testdaten befinden sich in product.txt. Einfügen Zeile für Zeile.  
## Routen  
* Produkt (product)  
  &emsp; http://localhost:3000/product/create  
  &emsp; http://localhost:3000/product/get   
  &emsp; http://localhost:3000/product/get/:id  
  &emsp; http://localhost:3000/product/update/:id  
  &emsp; http://localhost:3000/product/delete/:id  
* Productsuche  
  &emsp; http://localhost:3000/product?search?q=blabla (nach Namen und Beschreibung)  
  &emsp; http://localhost:3000/product/search?name=blabla (nur nach Namen)  
  &emsp; http://localhost:3000/product/search?desc=bla (nur nach Beschreibung)  
* Bestellung (order)  
  &emsp; http://localhost:3000/order/create  
  &emsp; http://localhost:3000/order/get  
  &emsp; http://localhost:3000/order/get/:id  
  &emsp; http://localhost:3000/order/update/:id  
  &emsp; http://localhost:3000/order/delete/:id  
  Order JSON Object (product id ersetzen mit der real existierenden):  
    {  
        "orderer": {  
        "firstname": "name,  
        "lastname": "lastname"  
        },  
        "address": {  
           "street": "hilpert 1",  
            "houseNr": "21",  
            "city": "Darmstadt",  
            "zip": "44321",  
            "country": "Deutschland"  
        },  
        "product": {  
            "id": "5c33622792e9f848fb32b4dd",  
            "quantity": 1  
        },  
        {  
            "id": "5c3e2838ee546a91e9e836ce",  
            "quantity": 1  
        }  
        ],  
        "email": "alpha@gmail.com",  
        "price": 191800  
    } 
* PayPal  
  
## Test
  * Mocha und Eslint
  `$ npm test`

## Docker  
* Bug - Umleitung auf die PayPal Seite funktioiert im Docker nicht
* Docker starten, in den Projektordner navigieren und :  
    Im Vordergrund:  
    `$ docker-compose up --build`  
    Im Hintergrund:  
    `$ docker-compose up -d --build`  
    **docker-compose stoppen**  
    `$ docker-compose down`   
    Bei Problemen: liegt meistens daran, dass benötigte Container schon benutzt werden ->  
    `$ docker container ps -a`  
    `$ docker container stop  <die ertsten 3 ID Zeichen>`  
    `$ docker container rm <die ersten 3 ID Zeichen>` 
* Routen unter Windows zugreifbar über 192.168.99.100 (oder über machine IP die angezeigt wird wenn Docker Toolbox gestartet wird)  
  http://192.168.99.100:3000/product/create  



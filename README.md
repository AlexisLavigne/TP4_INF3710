# Integration PostgreSQL pour un site web qui fournit des plans repas

## Description:
Application Web avec Angular qui intègre PostgreSQL.
- Il est possible de visualiser tous les plans repas disponibles.
- Il est possible de supprimer des plans repas.
- Il est possible de modifier des plans repas.
- Il est possible d'ajouter des plans repas.

## Auteurs:
- Laurent Faucher #2074871
- Alexis Lavigne #2074915

## Spécifications: 
- Les trois pages (ajouter, supprimer, modifier) sont représentées par des modales.
- Lorsque l'utilisateur veut ajouter ou modifier un plan, le numéro de plan (numeroplan) n'est pas demandé puisque la base de données utilise serial (incrémentation automatique).
- Lorsque l'utilisateur veut modifier un plan, il peut choisir une catégorie déjà existante dans le menu déroulant. Par contre, pour ajouter un nouveau plan, il n'y a pas de menu déroulant, car on considère que l'utilisateur peut ajouter une catégorie.
- Pour la colonne frequence, on considère que cette valeur peut aller de 1 à 7 puisqu'on considère un seul repas par jour pendant une semaine (7 maximum). Le choix est disponible dans un menu déroulant.
- Pour la colonne nbpersonnes, nous avons imposé une limite de 5 personnes, l'utilisateur à la possibilité de choisir une valeur entre 1 et 5 dans le menu déroulant. On considére qu'une famille a habituellement une taille maximale de 5 personnes, mais que pour familles plus grosses ou des occasions, des plans repas peuvent être combinés.
- Nous considérons qu'un repas ne peut avoir 0 calories et que les calories doivent être des nombres entiers. 

## Pour utiliser l'application:
- Assurez-vous d'avoir installé PostgreSQL (la version ~8.2 est utilisée pour ce projet).
- Assurez-vous d'avoir installé Node (la version ^16 est utilisée pour ce projet).
- Allez dans `/client` et lancez la commande `npm install` dans un terminal.
- Allez dans `/server` et lancez la commande `npm install` dans un terminal.
- Allez dans `/server/app/services/database.service.ts` et modifiez `connectionConfig` avec les bons paramètres de votre BD.
- Allez dans `/server` et faites la commande `npm start` dans un terminal. Le serveur est lancé au `localhost:3000` par défaut.
- Allez dans `/client` et faites la commande `npm start` dans un terminal. Le client est lancé au `localhost:4200` par défaut.
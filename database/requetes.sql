/**************************************************************
	requetes.sql
	Alexis Lavigne
	Laurent Faucher
**************************************************************/
-- 4.1- Affichez les numéros (numéroclient) et les noms (nomclient) des clients qui ont commandé un repas avec un prix compris entre 20 dollars et 40 dollars. (2pts)

SELECT numeroclient, nomclient
FROM "Client"
NATURAL JOIN "Abonner"
NATURAL JOIN "Planrepas"
WHERE prix BETWEEN 20.00 AND 40.00;

-- 4.2- Afficher les numéros des plans repas (numéroplan) qui ne proviennent pas du fournisseur au nom de 'QC Transport'. (2pts) 

SELECT P.numeroplan
FROM "Planrepas" P, "Fournisseur" F
WHERE P.numerofournisseur=F.numerofournisseur
AND (nomfournisseur != 'QC Transport'
OR nomfournisseur IS NULL);

-- 4.3- Affichez la liste des numéros des plans Famille (numéroplan) dont la catégorie du plan repas correspond à 'cétogène'. (2pts) 

SELECT F.numeroplan
FROM "Famille" F, "Planrepas" P
WHERE F.numeroplan=P.numeroplan
AND categorie='cétogène';

-- 4.4- Affichez le nombre de fournisseurs n’ayant pas de nom dans leur dossier (la valeur de nomfournisseur est NULL). (2pts) 

SELECT COUNT(numerofournisseur) AS "Compte"
FROM "Fournisseur"
WHERE nomfournisseur IS NULL;

-- 4.5- Affichez les noms des fournisseurs (nomfournisseur) ayant fait des livraisons de plans repas dont le montant est supérieur aux livraisons faites par le fournisseur dont le nom est 'AB Transport'. (2pts) 

SELECT F1.nomfournisseur
FROM "Fournisseur" F1, "Planrepas" P1, (
	SELECT sum(prix) FROM "Fournisseur" F2, "Planrepas" P2
	WHERE P2.numerofournisseur = F2.numerofournisseur
	AND F2.nomfournisseur = 'AB Transport'
) AS ABPlan
WHERE P1.numerofournisseur = F1.numerofournisseur
Group by (F1.nomfournisseur, ABPlan.sum)
having sum(P1.prix) > ABPlan.sum;

-- 4.6- Affichez les noms des fournisseurs (nomfournisseur), les adresses (adressefournisseur) et le montant total des prix des livraisons de plans repas des fournisseurs ayant les deux plus larges montants de livraison sur la plateforme. (2pts)

SELECT F.nomfournisseur, F.adressefournisseur, SUM(P.prix) AS "Montant total"
FROM "Fournisseur" F, "Planrepas" P
WHERE F.numerofournisseur=P.numerofournisseur
GROUP BY F.nomfournisseur, F.adressefournisseur
ORDER BY SUM(P.prix) DESC
LIMIT 2;

-- 4.7- Affichez le nombre de kit repas qui n’ont jamais été réservés chez les fournisseurs. (2pts) 

SELECT COUNT(numerokitrepas) 
FROM
(
	SELECT numerokitrepas 
	FROM "Kitrepas"
	EXCEPT
	SELECT numerokitrepas
	FROM "Fournisseur" F, "Planrepas" P, "Kitrepas" K
	WHERE F.numerofournisseur = P.numerofournisseur
	AND K.numeroplan = P.numeroplan
) AS kitsnonreserves;

-- 4.8- Affichez les numéros (numéroclient), les noms (nomclient) et les prénoms (prénomclient) des clients dont le prénom ne commence pas par une voyelle (en majuscule ou en minuscule) et qu’ils habitent (villeclient) à la même adresse (adressefournisseur) que le fournisseur 'Benjamin'. Ordonnez ces clients alphabétiquement selon le nom. (2pts) 

SELECT numeroclient, nomclient, prenomclient
FROM "Client", (
	SELECT adressefournisseur
	FROM "Fournisseur" 
	where nomfournisseur = 'Benjamin'
) as adresse
WHERE SUBSTR(prenomclient, 1, 1) NOT IN ('A', 'E', 'I', 'O', 'U', 'Y', 'a', 'e', 'i', 'o', 'u', 'y')
AND villeclient IN (
	SELECT unnest(string_to_array(adresse.adressefournisseur, ', ' )) as parts
)
ORDER BY nomclient ASC;

-- *methode unnest trouvé à: https://learnsql.com/cookbook/how-to-split-a-string-in-postgresql/

-- 4.9- Affichez le pays des ingrédients (paysingrédient) et le nombre d’ingrédients par pays dont le paysingrédient ne contient pas la lettre g à la troisième position de la fin; triés par ordre décroissant selon le pays de l’ingrédient (paysingrédient). (2pts) 

SELECT paysingredient, COUNT(numeroingredient) as nbingredients
FROM "Ingredient"
WHERE paysingredient NOT LIKE '%g__'
GROUP BY paysingredient
ORDER BY paysingredient DESC;

-- 4.10- Créez une vue 'V_fournisseur' contenant la catégorie du plan repas 'V_catégorie', l’adresse du fournisseur 'V_adresse' et le total des prix de tous les plans repas desservis par ce fournisseur 'V_tot'. Cette vue doit uniquement contenir les fournisseurs dont V_tot est supérieur à 12 500$ et dont le nom de la catégorie du plan repas contient la lettre 'e' et la lettre 'o' à la troisième position de la fin; triés par ordre croissant selon le nom de la catégorie du plan repas et par ordre décroissant selon 'V_tot'. Finalement, afficher le résultat de cette vue. 5pts

CREATE OR REPLACE VIEW "V_fournisseur" ("V_catégorie", "V_adresse", "V_tot") AS
SELECT P.categorie, F.adressefournisseur, SUM(P.prix)
FROM "Planrepas" P, "Fournisseur" F
WHERE P.numerofournisseur=F.numerofournisseur
GROUP BY P.categorie, F.adressefournisseur
	HAVING SUM(prix) > 12500
    AND (P.categorie LIKE '%e__'
	OR P.categorie LIKE '%o__')
ORDER BY P.categorie ASC, SUM(P.prix) DESC;
SELECT * FROM "V_fournisseur";

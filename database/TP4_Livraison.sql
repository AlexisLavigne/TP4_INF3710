/**************************************************************
	TP4_Livraison.sql
	Alexis Lavigne
	Laurent Faucher
**************************************************************/

-- DROP SCHEMA IF EXISTS jardinCommMR CASCADE;
-- CREATE SCHEMA jardinCommMR;

-- SET search_path = jardinCommMR;

CREATE TABLE IF NOT EXISTS "Client"
(
    numeroclient serial NOT NULL,
    nomclient VARCHAR(25) NOT NULL,
    prenomclient VARCHAR(25) NOT NULL,
    adressecourrielclient VARCHAR(50) NOT NULL,
    rueclient VARCHAR(25) NOT NULL,
    villeclient VARCHAR(25) NOT NULL,
    codepostalclient VARCHAR(10) NOT NULL,
    PRIMARY KEY (numeroclient)
);

CREATE TABLE IF NOT EXISTS "Fournisseur"
(
    numerofournisseur serial NOT NULL,
    nomfournisseur VARCHAR(25),
    adressefournisseur VARCHAR(25) NOT NULL,
    PRIMARY KEY (numerofournisseur)
);

CREATE TABLE IF NOT EXISTS "Telephone"
(
    numerotelephone VARCHAR(15) NOT NULL,
    numeroclient integer NOT NULL,
    PRIMARY KEY (numerotelephone, numeroclient),
    FOREIGN KEY (numeroclient) REFERENCES "Client" (numeroclient) ON DELETE CASCADE

);

CREATE TABLE IF NOT EXISTS "Planrepas"
(
    numeroplan serial NOT NULL,
    categorie VARCHAR(15) NOT NULL,
    frequence integer NOT NULL,
    CONSTRAINT frequence CHECK (frequence > 0),
    nbpersonnes integer NOT NULL,
    CONSTRAINT nbpersonnes CHECK (nbpersonnes > 0),
    nbcalories integer NOT NULL,
    CONSTRAINT nbcalories CHECK (nbcalories > 0),
    prix numeric NOT NULL,
    CONSTRAINT prix CHECK (prix > 0),
    numerofournisseur integer NOT NULL,
    PRIMARY KEY (numeroplan),
    FOREIGN KEY (numerofournisseur) REFERENCES "Fournisseur" (numerofournisseur) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Kitrepas"
(
    numerokitrepas serial NOT NULL,
    description VARCHAR(255) NOT NULL,
    numeroplan integer NOT NULL,
    PRIMARY KEY (numerokitrepas),
    FOREIGN KEY (numeroplan) REFERENCES "Planrepas" (numeroplan) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Image"
(
    numeroimage serial NOT NULL,
    donnees VARCHAR(255) NOT NULL,
    numerokitrepas integer NOT NULL,
    PRIMARY KEY (numeroimage),
    FOREIGN KEY (numerokitrepas) REFERENCES "Kitrepas" (numerokitrepas) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Ingredient"
(
    numeroingredient serial NOT NULL,
    nomingredient VARCHAR(25) NOT NULL,
    paysingredient VARCHAR(45) NOT NULL,
    PRIMARY KEY (numeroingredient)
);

CREATE TABLE IF NOT EXISTS "Abonner"
(
    numeroclient integer NOT NULL,
    numeroplan integer NOT NULL,
    duree numeric NOT NULL,
    CONSTRAINT duree CHECK (duree > 0),
    PRIMARY KEY (numeroclient, numeroplan),
    FOREIGN KEY (numeroclient) REFERENCES "Client" (numeroclient) ON DELETE CASCADE,
    FOREIGN KEY (numeroplan) REFERENCES "Planrepas" (numeroplan) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Contenir"
(
    numerokitrepas integer NOT NULL,
    numeroingredient integer NOT NULL,
    PRIMARY KEY (numerokitrepas, numeroingredient),
    FOREIGN KEY (numeroingredient) REFERENCES "Ingredient" (numeroingredient) ON DELETE CASCADE,
    FOREIGN KEY (numerokitrepas) REFERENCES "Kitrepas" (numerokitrepas) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Etape"
(
    numerokitrepas integer NOT NULL,
    descriptionetape VARCHAR(255) NOT NULL,
    dureeetape numeric NOT NULL,
    CONSTRAINT dureeetape CHECK (dureeetape > 0),
    etrecomposeede VARCHAR(25),
    PRIMARY KEY (numerokitrepas),
    FOREIGN KEY (numerokitrepas) REFERENCES "Kitrepas" (numerokitrepas) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Famille"
(
    numeroplan integer NOT NULL,
    PRIMARY KEY (numeroplan),
    FOREIGN KEY (numeroplan) REFERENCES "Planrepas" (numeroplan) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Facile"
(
    numeroplan integer NOT NULL,
    nbingredients integer NOT NULL,
    CONSTRAINT nbingredients CHECK (nbingredients > 0),
    PRIMARY KEY (numeroplan),
    FOREIGN KEY (numeroplan) REFERENCES "Famille" (numeroplan) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Pescetarien"
(
    numeroplan integer NOT NULL,
    typepoisson VARCHAR(25) NOT NULL,
    PRIMARY KEY (numeroplan),
    FOREIGN KEY (numeroplan) REFERENCES "Planrepas" (numeroplan) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Rapide"
(
    numeroplan integer NOT NULL,
    tempsdepreparation numeric NOT NULL,
    CONSTRAINT tempsdepreparation CHECK (tempsdepreparation > 0),
    PRIMARY KEY (numeroplan),
    FOREIGN KEY (numeroplan) REFERENCES "Famille" (numeroplan) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Vegetarien"
(
    numeroplan integer NOT NULL,
    typederepas VARCHAR(25) NOT NULL,
    PRIMARY KEY (numeroplan),
    FOREIGN KEY (numeroplan) REFERENCES "Planrepas" (numeroplan) ON DELETE CASCADE
);

INSERT INTO "Client" VALUES (DEFAULT, 'Faucher', 'Laurent', 'laurent.faucher@polymtl.com', '1 rue Oxford', 'NDG', 'H0R 1A2');
INSERT INTO "Client" VALUES (DEFAULT, 'Lavigne', 'Alexis', 'alexis.lavigne@polymtl.com', '2 rue Wiseman', 'Outremont', 'H1R 2A3');

INSERT INTO "Fournisseur" VALUES (DEFAULT, 'Bons Repas', '10 avenue Fruit');
INSERT INTO "Fournisseur" VALUES (DEFAULT, 'Miam et Cie', '4001 rue Legume');
INSERT INTO "Fournisseur" (numerofournisseur, adressefournisseur) VALUES (DEFAULT, '90 rue Viande');
INSERT INTO "Fournisseur" VALUES (DEFAULT, 'QC Transport', '2017 boulevard Produit');
INSERT INTO "Fournisseur" VALUES (DEFAULT, 'AB Transport', '164 chemin Corbeau');
INSERT INTO "Fournisseur" VALUES (DEFAULT, 'Benjamin', 'NDG');
INSERT INTO "Fournisseur" VALUES (DEFAULT, 'IGA', '1 chemin Volaille');

INSERT INTO "Telephone" VALUES ('4509876543', 1);
INSERT INTO "Telephone" VALUES ('5141234567', 2);

INSERT INTO "Planrepas" VALUES (DEFAULT, 'Italien', 3, 4, 500, 49.99, 3);
INSERT INTO "Planrepas" VALUES (DEFAULT, 'Oriental', 5, 3, 800, 27.10, 2);
INSERT INTO "Planrepas" VALUES (DEFAULT, 'Fruits de mer', 1, 5, 400, 71.59, 1);
INSERT INTO "Planrepas" VALUES (DEFAULT, 'Japonais', 2, 2, 400, 20.25, 2);
INSERT INTO "Planrepas" VALUES (DEFAULT, 'Menu salades', 3, 5, 400, 68.79, 2);
INSERT INTO "Planrepas" VALUES (DEFAULT, 'Menu vert', 3, 4, 400, 58.79, 4);
INSERT INTO "Planrepas" VALUES (DEFAULT, 'cétogène', 3, 5, 750, 57.75, 1);
INSERT INTO "Planrepas" VALUES (DEFAULT, 'Comfort food', 4, 4, 600, 47.99, 5);
INSERT INTO "Planrepas" VALUES (DEFAULT, 'Drole', 4, 4, 600, 12501, 6);

INSERT INTO "Kitrepas" VALUES (DEFAULT, 'Pizzaghetti sauce bolognaise', 1);
INSERT INTO "Kitrepas" VALUES (DEFAULT, 'Ramen mega spicy', 2);
INSERT INTO "Kitrepas" VALUES (DEFAULT, 'Sushis', 4);
INSERT INTO "Kitrepas" VALUES (DEFAULT, 'Assiète de pétoncles avec filet de turbo', 3);
INSERT INTO "Kitrepas" VALUES (DEFAULT, 'Salade niçoise', 5);
INSERT INTO "Kitrepas" VALUES (DEFAULT, 'Courge spaghetti', 6);

INSERT INTO "Image" VALUES (DEFAULT, 'https://bp-ca-cdn.tillster.com/menu-images/prod/f5546f6f-04ed-412e-bdce-ca9645fe3631.png', 1);
INSERT INTO "Image" VALUES (DEFAULT, 'https://res.cloudinary.com/serdy-m-dia-inc/image/upload/f_auto/fl_lossy/q_auto:eco/x_0,y_104,w_3840,h_2160,c_crop/w_1200,h_630,c_fill/v1545089694/foodlavie/prod/recettes/soupe-ramen-au-curry-rouge-42123da9', 2);

INSERT INTO "Ingredient" VALUES (DEFAULT, 'Tomate', 'Italie');
INSERT INTO "Ingredient" VALUES (DEFAULT, 'Fromage', 'France');
INSERT INTO "Ingredient" VALUES (DEFAULT, 'Saucisse', 'Allemagne');
INSERT INTO "Ingredient" VALUES (DEFAULT, 'Baguette', 'France');


INSERT INTO "Famille" VALUES (1);
INSERT INTO "Famille" VALUES (2);
INSERT INTO "Famille" VALUES (7);
INSERT INTO "Famille" VALUES (8);

INSERT INTO "Vegetarien" VALUES (5, 'Salades cocasses');
INSERT INTO "Vegetarien" VALUES (6, 'Verdure biologique');

INSERT INTO "Pescetarien" VALUES (3, 'Méditéranéen');
INSERT INTO "Pescetarien" VALUES (4, 'Thon, Saumon');

INSERT INTO "Etape" VALUES (1, 'Mettre le pizzaghetti au four', 15, 'Réchauffer le four');
INSERT INTO "Etape" VALUES (5, 'Couper les tomates et les concombres', 6.8);

INSERT INTO "Rapide" VALUES (7, 15);
INSERT INTO "Rapide" VALUES (2, 20);

INSERT INTO "Facile" VALUES (1, 9);
INSERT INTO "Facile" VALUES (8, 10);

INSERT INTO "Abonner" VALUES (1, 4, 4);
INSERT INTO "Abonner" VALUES (2, 6, 52);

INSERT INTO "Contenir" VALUES (1, 1);
INSERT INTO "Contenir" VALUES (1, 2);

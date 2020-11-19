CREATE TABLE "role"
(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "role_name" VARCHAR(50) NOT NULL
);

CREATE TABLE "admin"
(
    "email" VARCHAR(100) PRIMARY KEY NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "lastname" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(12),
    "branch" INT NOT NULL,
    "role" INT NOT NULL
);


CREATE TABLE "constant"
(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "value" FLOAT NOT NULL
);

CREATE TABLE "component_constant"
(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "cost" MONEY NOT NULL
);

CREATE TABLE "solar_panel"
(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "watts" int NOT NULL,
    "dimension" FLOAT NOT NULL,
    "cost" MONEY
);



CREATE TABLE "inversor"
(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "capacity_kw" FLOAT NOT NULL,
    "cost" MONEY NOT NULL
);

CREATE TABLE "mounting_system"
(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "cost" MONEY NOT NULL
);

CREATE TABLE "consume"
(
    "quotation_id" INT NOT NULL,
    "bimester" INT NOT NULL,
    "num_measure" INT NOT NULL,
    "kw" FLOAT NOT NULL,
    "cost" MONEY NOT NULL,
    PRIMARY KEY ("quotation_id", "bimester","num_measure")
);

CREATE TABLE "quotation_details"
(
    "quotation_id" INT NOT NULL,
    "component_id" INT NOT NULL,
    "component_kind" INT NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "qty" INT NOT NULL,
    "price" MONEY NOT NULL,
    PRIMARY KEY ("quotation_id", "component_id", "component_kind")
);

CREATE TABLE "branch"
(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "branch" VARCHAR(15) NOT NULL
);

CREATE TABLE "component_kind"
(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "kind" VARCHAR(10)
);

CREATE TABLE "user_data"
(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(10) NOT NULL
);

CREATE TABLE "quotation"
(
    "quotation" INT PRIMARY KEY NOT NULL,
    "qto_number" INT,
    "admin" VARCHAR(100) NOT NULL,
    "user" INT NOT NULL,
    "qty" INT NOT NULL,
    "total" MONEY NOT NULL,
    "date" DATE NOT NULL,
    "status" INT DEFAULT 1
);



CREATE TABLE "status"
(
    "id" SERIAL PRIMARY KEY NOT NULL,
    "status" VARCHAR(20) NOT NULL
);



ALTER TABLE "quotation" ADD FOREIGN KEY ("status") REFERENCES "status" ("id");



ALTER TABLE "quotation_details" ADD FOREIGN KEY ("component_kind") REFERENCES "component_kind" ("id");

ALTER TABLE "admin" ADD FOREIGN KEY ("role") REFERENCES "role" ("id");

ALTER TABLE "admin" ADD FOREIGN KEY ("branch") REFERENCES "branch" ("id");



ALTER TABLE "consume" ADD FOREIGN KEY ("quotation_id") REFERENCES "quotation" ("quotation") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "quotation" ADD FOREIGN KEY ("admin") REFERENCES "admin" ("email") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "quotation" ADD FOREIGN KEY ("user") REFERENCES "user_data" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "quotation_details" ADD FOREIGN KEY ("quotation_id") REFERENCES "quotation" ("quotation") ON DELETE CASCADE ON UPDATE CASCADE;




-- ALTER TABLE "solar_panel" ADD FOREIGN KEY ("id") REFERENCES "quotation_details" ("component_id");

-- ALTER TABLE "inversor" ADD FOREIGN KEY ("id") REFERENCES "quotation_details" ("component_id");

-- ALTER TABLE "mounting_system" ADD FOREIGN KEY ("id") REFERENCES "quotation_details" ("component_id");

-- ALTER TABLE "component_constant" ADD FOREIGN KEY ("id") REFERENCES "quotation_details" ("component_id");


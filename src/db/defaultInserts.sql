
--branch 

INSERT INTO branch
    (id,branch)
VALUES
    (1, 'Morelia');
INSERT INTO branch
    (id,branch)
VALUES
    (2, 'Uruapan');
INSERT INTO branch
    (id,branch)
VALUES
    (3, 'Lazaro Cardenas');


-- --Roles

INSERT INTO role
    (role_name)
VALUES('admin');
INSERT INTO role
    (role_name)
VALUES('seller');

-- --Constant

INSERT INTO constant
    (description,value)
VALUES('IVA', 0.16);
INSERT INTO constant
    (description,value)
VALUES('Ganancia Por Componente', 0.17);
INSERT INTO constant
    (description,value)
VALUES('Ganancia General', 0.03);
INSERT INTO constant
    (description,value)
VALUES('Mano de Obra', 0.25);
INSERT INTO constant
    (description,value)
VALUES('Tipo de Cambio', 21);

-- --Component Constant

INSERT INTO component_constant
    (description,cost)
VALUES('Kit Tornillería, Herrajes y Aditamentos para Montaje', 1228.5);
INSERT INTO component_constant
    (description,cost)
VALUES('Kit de instalación: Cajas de Conexión, Cableado, Tierra Física, Conectores', 2825.55);

-- --Component Kind

INSERT INTO component_kind
    (kind)
VALUES('PANEL');
INSERT INTO component_kind
    (kind)
VALUES('INVERSOR');
INSERT INTO component_kind
    (kind)
VALUES('MOUNTING');
INSERT INTO component_kind
    (kind)
VALUES('CONSTANT');

--STATUS

INSERT INTO status
    (status)
VALUES('PENDIENTE');
INSERT INTO status
    (status)
VALUES('ENVIADO');

-- --USER
-- INSERT INTO admin
--     (email,password,name,lastName,role,phone)
-- VALUES('mcuve@outlook.com', 'maotrix1', 'Mauricio', 'Martinez', 2, 4433787404);

-- --Inversor
-- INSERT into inversor
--     (description,capabranch_kw,cost)
-- VALUES('Microinversor 1.2KW', 1.2, 5061.42);


-- --Quotation
-- INSERT INTO quotation
--     (quotation,"user",qty,total,date)
-- VALUES(1, 'mcuve@outlook.com', 1, 10000, '2020-07-12');


-- --quotation_details  
-- INSERT INTO quotation_details
--     (quotation_id,component_id,component_kind,description,qty,price)
-- VALUES(1, 1, 2, 'Microinversor 1.2KW', 2, 6061.42);
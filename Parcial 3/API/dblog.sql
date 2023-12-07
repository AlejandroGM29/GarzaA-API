/*
idea:
puedes obtener un catalogo de los juegos disponibles sin estar logeado y ver sus datos
puedes crear una cuenta, iniciar sesion o cerrar sesion como Usuario
una vez creada la cuenta e iniciada sesion, podrar agregar juegos
se podra agregar puntuacion a los juegos de 1 a 5
el total de la puntacion sera un promedio dependiendo de la puntuaciones que se hayan agregado
solo usuario administrador puede editar y eliminar videojuegos
la valoracion se hara en promedio, al agregar valoracion a x juego, entonces se ejecutara un procedimiento que calcule el promedio de calificaciones de un juego y lo actalice

juegos sera baja logica.
para agregar juego deberas estar logeado.
usuario no se podra actualizar ni eliminar cuenta.

token de usuario durara 1h


*/

CREATE TABLE Juegos (
    idJuego INT PRIMARY KEY,
    nombre VARCHAR(255),
    genero VARCHAR(50),
    lanzamiento INT,
    valoracion DECIMAL(3,2),
    activo int(0,1)
);


CREATE TABLE Usuarios (
    idUsuario INT PRIMARY KEY,
    admin boolean,
    nombre VARCHAR(255),
    correo VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE Valoraciones (
    idValoracion INT PRIMARY KEY,
    idJuego INT,
    idUsuario INT,
    puntuacion INT,
    comentario TEXT,
    FOREIGN KEY (idJuego) REFERENCES Juegos(idJuego),
    FOREIGN KEY (idUsuario) REFERENCES Usuarios(idUsuario)
);

//-----------------procedimientos-----------------//

//agregar juego
DELIMITER //
CREATE PROCEDURE CrearJuego (
    IN p_nombre VARCHAR(255),
    IN p_genero VARCHAR(50),
    IN p_lanzamiento INT,
)
BEGIN
    INSERT INTO Juegos (nombre, genero, lanzamiento)
    VALUES (p_nombre, p_genero, p_lanzamiento);
END //
DELIMITER ;


DELIMITER //

CREATE PROCEDURE calificarJuego (
    IN p_idJuego INT,
    IN p_idUsuario INT,
    IN p_puntuacion INT,
    IN p_comentario TEXT
)
BEGIN
    -- Insertar la nueva valoración
    INSERT INTO Valoraciones (idJuego, idUsuario, puntuacion, comentario)
    VALUES (p_idJuego, p_idUsuario, p_puntuacion, p_comentario);

    -- Calcular y actualizar el promedio de las valoraciones del juego
    DECLARE totalPuntuacion INT;
    DECLARE numValoraciones INT;
    DECLARE promedio DECIMAL(3,2);

    -- Obtener la suma total de las puntuaciones y el número de valoraciones
    SELECT SUM(puntuacion), COUNT(*) INTO totalPuntuacion, numValoraciones
    FROM Valoraciones
    WHERE idJuego = p_idJuego;

    -- Calcular el promedio (evitar división por cero)
    IF numValoraciones > 0 THEN
        SET promedio = totalPuntuacion / numValoraciones;
    ELSE
        SET promedio = 0;
    END IF;

    -- Actualizar la valoración promedio en la tabla de Juegos
    UPDATE Juegos
    SET valoracion = promedio
    WHERE idJuego = p_idJuego;
    
    -- Devolver el promedio calculado
    SELECT promedio AS 'Nuevo Promedio';
END //

DELIMITER ;


DELIMITER //
create procedure EliminarJuego(
    IN p_idJuego INT,
    IN p_idUsuario INT,
)
BEGIN
     DECLARE PADMIN boolean;
     select admin INTO PADMIN from usuario where idUsuario = p_idUsuario;

     if PADMIN THEN
        UPDATE Juegos
        SET activo = 0;
        where idJuego = p_idJuego;
     END IF
     SELECT * from Juegos where idJuego = p_idJuego

END //
DELIMITER;

create procedure activarJuego(
    IN p_idJuego INT,
    IN p_idUsuario INT,
)
BEGIN
     DECLARE PADMIN boolean;
     select admin INTO PADMIN from usuario where idUsuario = p_idUsuario;

     if PADMIN THEN
        UPDATE Juegos
        SET activo = 1;
        where idJuego = p_idJuego;
     END IF
     SELECT * from Juegos where idJuego = p_idJuego

END //
DELIMITER;

CREATE PROCEDURE ObtenerListaJuegos ()
BEGIN
    SELECT * FROM Juegos where activo = 1;
END //
DELIMITER ;

//-------------procedimientos usuario------------------//

create procedure crearUsuario

//agregar usuario
DELIMITER //
CREATE PROCEDURE crearUsuario (
    IN p_nombre VARCHAR(255),
    IN p_correo VARCHAR(255),
    IN p_password VARCHAR(255)
)
BEGIN
    INSERT INTO Usuarios (nombre, correo, password)
    VALUES (p_nombre, p_correo, p_password);
END //
DELIMITER ;

create procedure logearUsuario
(
    IN p_correo VARCHAR(255),
    IN p_password VARCHAR(255)
)
BEGIN
    SELECT * FROM Usuarios WHERE correo = p_correo AND password = p_password
END //
DELIMITER;

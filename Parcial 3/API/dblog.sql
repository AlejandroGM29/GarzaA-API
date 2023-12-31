create database Juegos;

CREATE TABLE Juegos (
    idJuego INT PRIMARY KEY,
    nombre VARCHAR(255),
    genero VARCHAR(50),
    lanzamiento INT,
    valoracion DECIMAL(3,2),
    activo TINYINT(1) CHECK (activo IN (0,1))
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
    IN p_lanzamiento INT
)
BEGIN
    INSERT INTO Juegos (nombre, genero, lanzamiento)
    VALUES (p_nombre, p_genero, p_lanzamiento);
END //

DELIMITER ;


DELIMITER //



DELIMITER //
create procedure activarJuego(
    IN p_idJuego INT,
    IN p_idUsuario INT
)
BEGIN
     DECLARE PADMIN boolean;
     select admin INTO PADMIN from usuario where idUsuario = p_idUsuario;

     if PADMIN THEN
        UPDATE Juegos
        SET activo = 1
        where idJuego = p_idJuego;
     END IF;
     SELECT * from Juegos where idJuego = p_idJuego;

END //
DELIMITER ;

CREATE PROCEDURE activarJuego(
    IN p_idJuego INT,
    IN p_idUsuario INT
)
BEGIN
     DECLARE PADMIN boolean;
     SELECT admin INTO PADMIN FROM usuario WHERE idUsuario = p_idUsuario;
     IF PADMIN THEN
        UPDATE Juegos
        SET activo = 1
        WHERE idJuego = p_idJuego;
     END IF;

     SELECT * FROM Juegos WHERE idJuego = p_idJuego;
END;




DELIMITER //
CREATE PROCEDURE ObtenerListaJuegos ()
BEGIN
    SELECT * FROM Juegos where activo = 1;
END; //
DELIMITER ;

DELIMITER //

CREATE PROCEDURE calificarJuego (
    IN p_idJuego INT,
    IN p_idUsuario INT,
    IN p_puntuacion INT,
    IN p_comentario TEXT
)
BEGIN

	DECLARE totalPuntuacion INT;
    DECLARE numValoraciones INT;
    DECLARE promedio DECIMAL(3,2);
    -- Insertar la nueva valoración
    INSERT INTO Valoraciones (idJuego, idUsuario, puntuacion, comentario)
    VALUES (p_idJuego, p_idUsuario, p_puntuacion, p_comentario);

    -- Calcular y actualizar el promedio de las valoraciones del juego
   

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

CREATE PROCEDURE ObtenerPuntuacionesPorJuego(IN p_idJuego INT)
BEGIN
    -- Declaraciones de variables
    DECLARE juegoNombre VARCHAR(255);

    -- Obtener el nombre del juego
    SELECT nombre INTO juegoNombre
    FROM Juegos
    WHERE idJuego = p_idJuego;

    -- Obtener las puntuaciones del juego
    SELECT
        v.idValoracion,
        v.puntuacion,
        v.comentario,
        u.nombre AS nombreUsuario
    FROM Valoraciones v
    INNER JOIN Usuarios u ON v.idUsuario = u.idUsuario
    WHERE v.idJuego = p_idJuego;

END //

DELIMITER ;


//-------------procedimientos usuario------------------//
DELIMITER //


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

DELIMITER //
create procedure logearUsuario
(
    IN p_correo VARCHAR(255),
    IN p_password VARCHAR(255)
)
BEGIN
    SELECT * FROM Usuarios WHERE correo = p_correo AND password = p_password;
END; //
DELIMITER;

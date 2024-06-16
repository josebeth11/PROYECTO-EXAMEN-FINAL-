CREATE DATABASE SHUNGOLATE;
USE SHUNGOLATE;
CREATE TABLE Usuario (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correoElectronico VARCHAR(100) NOT NULL,
    contrasena VARCHAR(100) NOT NULL
);

INSERT INTO Usuario (nombre, correoElectronico, contrasena)
VALUES 
    ('Juan Pérez', 'juan@gmail.com', 'clave123'),
    ('María López', 'maria@gmail.com', 'clave456'),
    ('Pedro Martinez', 'pedro@gmail.com', 'clave789'),
    ('Ana García', 'ana@gmail.com', 'claveabc'),
    ('Luis Rodríguez', 'luis@gmail.com', 'clavexyz'),
    ('Laura Fernández', 'laura@gmail.com', 'clave567'),
    ('Carlos Sánchez', 'carlos@gmail.com', 'clave890'),
    ('Sofía Ramirez', 'sofia@gmail.com', 'clave1234'),
    ('Daniel Gómez', 'daniel@gmail.com', 'clave5678'),
    ('Elena Torres', 'elena@gmail.com', 'claveabcd');
CREATE TABLE Producto (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    imagen VARCHAR(200),
    stock INT NOT NULL
);

INSERT INTO Producto (nombre, descripcion, precio, imagen, stock)
VALUES 
    ('Chocolate amargo', 'Delicioso chocolate con alto contenido de cacao', 5.99, 'choco1.jpg', 50),
    ('Chocolate con leche', 'Chocolate suave con leche', 4.50, 'choco2.jpg', 75),
    ('Chocolate blanco', 'Chocolate dulce con sabor a vainilla', 3.99, 'choco3.jpg', 30),
    ('Chocolate con almendras', 'Chocolate con trozos de almendras', 6.50, 'choco4.jpg', 40),
    ('Chocolate relleno de caramelo', 'Chocolate con caramelo líquido en su interior', 7.99, 'choco5.jpg', 25),
    ('Chocolate con avellanas', 'Chocolate con trozos de avellanas', 5.75, 'choco6.jpg', 35),
    ('Chocolate con naranja', 'Chocolate con sabor a naranja', 4.75, 'choco7.jpg', 20),
    ('Chocolate con menta', 'Chocolate con sabor a menta', 4.75, 'choco8.jpg', 15),
    ('Chocolate con fresas', 'Chocolate con trozos de fresas', 6.25, 'choco9.jpg', 30),
    ('Chocolate con pasas', 'Chocolate con pasas de uva', 5.50, 'choco10.jpg', 45);
CREATE TABLE Carrito (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    usuarioID INT,
    productoID INT,
    cantidad INT,
    FOREIGN KEY (usuarioID) REFERENCES Usuario(ID),
    FOREIGN KEY (productoID) REFERENCES Producto(ID)
);

-- Ejemplo de registros en la tabla Carrito (relación temporal)
INSERT INTO Carrito (usuarioID, productoID, cantidad)
VALUES
    (1, 1, 2),
    (1, 3, 1),
    (2, 2, 3),
    (3, 5, 2),
    (4, 4, 1),
    (5, 7, 2),
    (6, 6, 3),
    (7, 8, 1),
    (8, 9, 2),
    (9, 10, 1);
CREATE TABLE Resena (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    usuarioID INT,
    productoID INT,
    rating INT,
    comentario TEXT,
    FOREIGN KEY (usuarioID) REFERENCES Usuario(ID),
    FOREIGN KEY (productoID) REFERENCES Producto(ID)
);

-- Ejemplo de registros en la tabla Resena
INSERT INTO Resena (usuarioID, productoID, rating, comentario)
VALUES
    (1, 1, 4, 'Muy buen chocolate, pero un poco amargo para mi gusto.'),
    (2, 3, 5, '¡Mi chocolate favorito! Dulce y suave.'),
    (3, 5, 3, 'Me esperaba más del relleno de caramelo.'),
    (4, 2, 4, 'Buen sabor, pero un poco caro.'),
    (5, 4, 5, 'Excelente combinación de chocolate y almendras.'),
    (6, 6, 2, 'No soy fan de las avellanas, pero el chocolate es bueno.'),
    (7, 7, 4, 'Me encanta el toque de naranja en este chocolate.'),
    (8, 8, 5, 'Perfecto para después de las comidas.'),
    (9, 9, 3, 'Las fresas le dan un sabor fresco al chocolate.'),
    (10, 10, 4, 'El chocolate con pasas es una combinación interesante.');

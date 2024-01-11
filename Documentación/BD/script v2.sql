-- Creación de la BD
--CREATE DATABASE RankingBank;

-- Creación de la tabla Roles
CREATE TABLE Roles (
    rol_id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE
);

-- Inserción de roles
INSERT INTO Roles (rol_id, nombre) VALUES (1, 'Administrador'), (2, 'Asesor de Crédito');

-- Creación de la tabla Usuarios (anteriormente Asesores)
CREATE TABLE Usuarios (
    usuario_id SERIAL PRIMARY KEY,
    cedula VARCHAR(20),
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    telefono VARCHAR(15),
    correo VARCHAR(100),
    rol_id INTEGER,
    CONSTRAINT fk_rol FOREIGN KEY (rol_id) REFERENCES Roles (rol_id)
);

-- Asignación de roles a usuarios (ejemplo)
UPDATE Usuarios SET rol_id = 1 WHERE usuario_id = 1; -- Administrador
UPDATE Usuarios SET rol_id = 2 WHERE usuario_id = 2; -- Asesor de Crédito

-- Modificación de la tabla MetasMensuales
CREATE TABLE MetasMensuales (
    meta_id SERIAL PRIMARY KEY,
    mes_anio DATE,
    montoObjetivo DECIMAL(10, 2),
    estadoMeta VARCHAR(20),
    rol_id INTEGER,
    CONSTRAINT chk_rol_meta CHECK (rol_id = 1), -- Solo administradores pueden establecer metas
    CONSTRAINT fk_rol_meta FOREIGN KEY (rol_id) REFERENCES Roles (rol_id)
);

-- Modificación de la tabla Creditos
CREATE TABLE Creditos (
    credito_id SERIAL PRIMARY KEY,
    asesor_id INTEGER,
    fecha DATE,
    monto DECIMAL(10, 2),
    estado VARCHAR(20),
    rol_id INTEGER,
    CONSTRAINT chk_rol_credito CHECK (rol_id = 2), -- Solo asesores de crédito pueden otorgar créditos
    CONSTRAINT fk_asesor_credito FOREIGN KEY (asesor_id, rol_id) REFERENCES Usuarios (usuario_id, rol_id)
);

-- Modificación de la tabla Ranking
CREATE TABLE Ranking (
    ranking_id SERIAL PRIMARY KEY,
    mes_anio DATE,
    asesor_id INTEGER,
    posicion INTEGER,
    totalCredito INTEGER,
    rol_id INTEGER,
    CONSTRAINT chk_rol_ranking CHECK (rol_id = 2), -- Solo asesores de crédito pueden estar en el ranking
    CONSTRAINT fk_asesor_ranking FOREIGN KEY (asesor_id, rol_id) REFERENCES Usuarios (usuario_id, rol_id)
);

-- Modificación de la tabla Roles (evitar eliminación accidental de roles)
ALTER TABLE Roles
ADD CONSTRAINT chk_rol_protected CHECK (rol_id NOT IN (1, 2)); -- Evita eliminar los roles de Administrador y Asesor de Crédito

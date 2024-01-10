-- Creacion de la BD
CREATE DATABASE RankingBank;

-- Creación de la tabla Asesores
CREATE TABLE Asesores (
    asesor_id SERIAL PRIMARY KEY,
    cedula VARCHAR(20),
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    telefono VARCHAR(15),
    correo VARCHAR(100)
);

-- Creación de la tabla Creditos
CREATE TABLE Creditos (
    credito_id SERIAL PRIMARY KEY,
    asesor_id INTEGER,
    fecha DATE,
    monto DECIMAL(10, 2),
    estado VARCHAR(20),
    FOREIGN KEY (asesor_id) REFERENCES Asesores (asesor_id)
);

-- Creación de la tabla Ranking
CREATE TABLE Ranking (
    ranking_id SERIAL PRIMARY KEY,
    mes_anio DATE,
    asesor_id INTEGER,
    posicion INTEGER,
    totalCredito INTEGER,
    FOREIGN KEY (asesor_id) REFERENCES Asesores (asesor_id)
);

-- Creación de la tabla MetasMensuales
CREATE TABLE MetasMensuales (
    meta_id SERIAL PRIMARY KEY,
    mes_anio DATE,
    montoObjetivo DECIMAL(10, 2),
    estadoMeta VARCHAR(20)
);

from sqlalchemy import create_engine, Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import sessionmaker, declarative_base, relationship


Base = declarative_base()

DB_USERNAME = 'cc5002'
DB_PASSWORD = 'programacionweb'
DB_HOST = 'localhost'
DB_PORT = '3306'
DB_NAME = 'tarea2'


DATABASE_URL = f'mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}'
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)

class Region(Base):
    __tablename__ = 'region'
    id = Column(Integer, primary_key=True)
    nombre = Column(String(200), nullable=False)

    comunas = relationship("Comuna", back_populates="region")

class Comuna(Base):
    __tablename__ = 'comuna'
    id = Column(Integer, primary_key=True)
    nombre = Column(String(200), nullable=False)
    region_id = Column(Integer, ForeignKey('region.id'), nullable=False)

    region = relationship("Region", back_populates="comunas")

class Registro(Base):
    __tablename__ = 'registro'
    id = Column(Integer, primary_key=True)
    avistamiento_id = Column(Integer, ForeignKey('avistamiento.id'), nullable=False)
    nombre_archivo = Column(String(300), nullable=False)
    ruta_archivo = Column(String(300), nullable=False)

    avistamiento = relationship("Avistamiento", back_populates="registros")

class Ave(Base):
    __tablename__ = 'ave'
    id = Column(Integer, primary_key=True)
    nombre = Column(String(80), nullable=False)

    avistamientos = relationship("Avistamiento", back_populates="ave")

class Avistamiento(Base):
    __tablename__ = 'avistamiento'
    id = Column(Integer, primary_key=True)
    voluntario_id = Column(Integer, ForeignKey('voluntario.id'), nullable=False)
    ave_id = Column(Integer, ForeignKey('ave.id'), nullable=False)
    fecha_hora = Column(DateTime, nullable=False)
    lugar = Column(String(200), nullable=False)
    descripcion = Column(Text, nullable=True)
    
    voluntario = relationship("Voluntario", back_populates="avistamientos")
    ave = relationship("Ave", back_populates="avistamientos")
    registros = relationship("Registro", back_populates="avistamiento")

class Voluntario(Base):
    __tablename__ = 'voluntario'
    id = Column(Integer, primary_key=True)
    nombre = Column(String(255), nullable=False)
    email = Column(String(80), nullable=False)
    telefono = Column(String(15), nullable=False)
    fecha_registro = Column(DateTime, nullable=False)
    comuna_id = Column(Integer, ForeignKey('comuna.id'), nullable=False)

    comuna = relationship("Comuna")
    avistamientos = relationship("Avistamiento", back_populates="voluntario")

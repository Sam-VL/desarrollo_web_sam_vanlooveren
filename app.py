from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from database.db import SessionLocal, Region, Comuna, Registro, Ave, Avistamiento, Voluntario, Comentario
from datetime import datetime
from werkzeug.utils import secure_filename
import os
import re

app = Flask(__name__)
app.secret_key = 'clave_secreta'  
UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/', methods=['GET'])
def index():
    db = SessionLocal()
    ultimos_avistamientos = db.query(Avistamiento).order_by(Avistamiento.id.desc()).limit(2).all()
    contenidos = render_template('index.html', ultimos_avistamientos=ultimos_avistamientos)
    db.close()
    return contenidos

@app.route('/registro-voluntario', methods=['GET', 'POST'])
def registro_voluntario():
    db = SessionLocal()
    regiones = db.query(Region).all()

    if request.method == 'POST':
        nombre = request.form.get('nombre', '').strip()
        email = request.form.get('email', '').strip()
        telefono = request.form.get('telefono', '').strip()
        comuna_id = request.form.get('comuna', '')
        region_id = request.form.get('region', '')

        errores = {}

        if len(nombre) < 3:
            errores['nombre'] = 'El nombre debe tener al menos 3 caracteres.'

        if not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', email):
            errores['email'] = 'El email no es válido.'

        if not re.match(r'^[0-9]{9,}$', telefono):
            errores['telefono'] = 'El teléfono debe tener al menos 9 numeros.'

        if not comuna_id:
            errores['comuna'] = 'Debe seleccionar una comuna.'

        if not region_id:
            errores['region'] = 'Debe seleccionar una región.'

        if errores:
            contenido = render_template('registro-voluntario.html', regiones=regiones, errores=errores)
            db.close()
            return contenido

        nuevo_voluntario = Voluntario(
            nombre=nombre,
            email=email,
            telefono=telefono,
            comuna_id=int(comuna_id),
            fecha_registro=datetime.now()

        )
        db.add(nuevo_voluntario)
        db.commit()
        contenido = render_template('voluntario-registrado.html')
        db.close()
        flash('Voluntario registrado exitosamente.')
        return contenido
    
    contenido = render_template('registro-voluntario.html', regiones=regiones, errores={})
    db.close()
    return contenido

@app.route('/comunas/<int:region_id>', methods=['GET'])
def obtener_comunas(region_id):
    db = SessionLocal()
    comunas = db.query(Comuna).filter(Comuna.region_id == region_id).all()
    resultado = []
    for comuna in comunas:
        resultado.append({'id': comuna.id, 'nombre': comuna.nombre})
    db.close()
    return resultado

@app.route('/informar-avistamiento', methods=['GET', 'POST'])
def informar_avistamiento():
    db = SessionLocal()
    aves = db.query(Ave).all()
    if request.method == 'POST':
        email = request.form.get('email', '').strip()
        ave_id = request.form.get('ave', '')
        lugar = request.form.get('lugar', '').strip()
        fecha = request.form.get('fecha', '')
        hora = request.form.get('hora', '')
        archivos = request.files.getlist('archivos')

        errores = {}

        if not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', email):
            errores['email'] = 'El email no es válido.'

        voluntario = db.query(Voluntario).filter(Voluntario.email == email).first()

        if email != '' and voluntario is None:
            errores['email'] = 'El email no está registrado.'

        if ave_id == '':
            errores['ave'] = 'Debe seleccionar un ave.'

        if len(lugar) < 3:
            errores['lugar'] = 'El lugar debe tener al menos 3 caracteres.'

        fecha_hora = None

        if fecha == '':
            errores['fecha'] = 'Debe seleccionar una fecha.'
        elif hora == '':
            errores['hora'] = 'Debe seleccionar una hora.'
        else:
            try:
                fecha_hora = datetime.strptime(f"{fecha} {hora}", "%Y-%m-%d %H:%M")
            
                fecha_actual = datetime.now()
                fecha_minima = fecha_actual.replace(year=fecha_actual.year - 1)
                if fecha_hora < fecha_minima or fecha_hora > fecha_actual:
                    errores['fecha'] = 'La fecha y hora deben estar dentro del último año.'

            except ValueError:
                    errores['fecha'] = 'Fecha u hora no válida.'

        archivos_validos = []
        for archivo in archivos:
            if archivo and archivo.filename:
                archivos_validos.append(archivo)

        if len(archivos_validos) == 0:
            errores['archivos'] = 'Debe subir al menos un archivo.'

        if errores:
            contenido = render_template('informar-avistamiento.html', aves=aves, errores=errores)
            db.close()
            return contenido

 
        
        nuevo_avistamiento = Avistamiento(voluntario_id=voluntario.id, ave_id=int(ave_id), fecha_hora=fecha_hora, lugar=lugar)
        db.add(nuevo_avistamiento)
        db.commit()

        for archivo in archivos_validos:
            nombre_archivo = secure_filename(archivo.filename)
            archivo.save(os.path.join(UPLOAD_FOLDER, nombre_archivo))
            ruta_archivo = f"uploads/{nombre_archivo}"
            nuevo_registro = Registro(avistamiento_id=nuevo_avistamiento.id, nombre_archivo=nombre_archivo, ruta_archivo=ruta_archivo)
            db.add(nuevo_registro)
        db.commit()
        db.close()

        flash('Avistamiento registrado exitosamente.')
        return redirect(url_for('index'))

    contenido = render_template('informar-avistamiento.html', aves=aves, errores={})
    db.close()
    return contenido

@app.route('/listado-avistamiento', methods=['GET'])
def listado_avistamiento():
    db = SessionLocal()

    pagina_actual = request.args.get('pagina', 1, type=int)
    por_pagina = 5
    todos_avistamientos = db.query(Avistamiento).all()
    total_avistamientos = len(todos_avistamientos)
    total_paginas = (total_avistamientos + por_pagina - 1) // por_pagina
    inicio = (pagina_actual - 1) * por_pagina
    fin = inicio + por_pagina
    avistamientos = todos_avistamientos[inicio:fin]
    contenido = render_template('listado-avistamiento.html', avistamientos=avistamientos, pagina_actual=pagina_actual, total_paginas=total_paginas)
    db.close()
    return contenido

@app.route('/avistamiento/<int:avistamiento_id>')
def detalle_avistamiento(avistamiento_id):
    db = SessionLocal()
    avistamiento = db.query(Avistamiento).filter(Avistamiento.id == avistamiento_id).first()
    if avistamiento is None:
        db.close()
        return "Avistamiento no encontrado", 404
    registros = db.query(Registro).filter(Registro.avistamiento_id == avistamiento_id).all()
    contenido = render_template('detalle-avistamiento.html', avistamiento=avistamiento, registros=registros)
    db.close()
    return render_template('detalle-avistamiento.html', avistamiento=avistamiento, registros=registros)

@app.route('/graficos', methods=['GET'])
def graficos():
    return render_template('graficos.html')

@app.route("/get-stats-data", methods=["GET"])
def get_stats_data():
    db = SessionLocal()
    avistamientos = db.query(Avistamiento).all()
    conteo = {}

    for avistamiento in avistamientos:
        fecha = avistamiento.fecha_hora.strftime("%Y-%m-%d")

        if fecha not in conteo:
            conteo[fecha] = 0

        conteo[fecha] += 1

    db.close()
    resultado = []

    for fecha in sorted(conteo):
        resultado.append({
            'date': fecha,
            'count': conteo[fecha]
        })

    return jsonify(resultado)

@app.route("/get-stats-aves", methods=["GET"])
def get_stats_aves():
    db = SessionLocal()
    avistamientos = db.query(Avistamiento).all()
    conteo = {}
    
    for avistamiento in avistamientos:
        nombre = avistamiento.ave.nombre
    
        if nombre not in conteo:
            conteo[nombre] = 0
    
        conteo[nombre] += 1
    
    db.close()
    resultado = []
    
    for nombre in sorted(conteo):
        resultado.append({
            'name': nombre,
            'count': conteo[nombre]
        })
    
    return jsonify(resultado)


@app.route("/get-stats-comunas", methods=["GET"])
def get_stats_comunas():
    db = SessionLocal()
    voluntarios = db.query(Voluntario).all()
    conteo = {}
    
    for voluntario in voluntarios:
        nombre = voluntario.comuna.nombre
    
        if nombre not in conteo:
            conteo[nombre] = 0
    
        conteo[nombre] += 1
    
    db.close()
    resultado = []
    
    for nombre in sorted(conteo):
        resultado.append({
            'name': nombre,
            'count': conteo[nombre]
        })
    
    return jsonify(resultado)


@app.route('/comentarios/<int:avistamiento_id>', methods=['GET'])
def obtener_comentarios(avistamiento_id):
    db = SessionLocal()
    comentarios = db.query(Comentario).filter(Comentario.avistamiento_id == avistamiento_id).all()
    resultado = []
    for comentario in comentarios:
        resultado.append({
            'id': comentario.id,
            'nombre': comentario.nombre,
            'texto': comentario.texto,
            'fecha': comentario.fecha.strftime('%Y-%m-%d %H:%M:%S')
        })
    db.close()
    return jsonify(resultado)

@app.route('/comentarios/<int:avistamiento_id>', methods=['POST'])
def agregar_comentario(avistamiento_id):
    datos = request.get_json(silent=True)
    if not isinstance(datos, dict):
        return jsonify({"status": "error", "data": "Datos inválidos"}), 400
    nombre = datos.get('nombre', '')
    texto = datos.get('texto', '')

    if not isinstance(nombre, str) or not isinstance(texto, str):
        return jsonify({"status": "error", "data": "Datos inválidos"}), 400

    nombre = nombre.strip()
    texto = texto.strip()

    if len(nombre) < 3 or len(nombre) > 50:
        return jsonify({"status": "error", "data": "Nombre inválido"}), 400

    if len(texto) < 5 or len(texto) > 300:
        return jsonify({"status": "error", "data": "Texto inválido"}), 400

    db = SessionLocal()

    avistamiento = db.query(Avistamiento).filter(Avistamiento.id == avistamiento_id).first()

    if avistamiento is None:
        db.close()
        return jsonify({"status": "error", "data": "Avistamiento no se encontro"}), 404

    nuevo_comentario = Comentario(nombre = nombre, texto = texto, fecha = datetime.now(), avistamiento_id = avistamiento_id)
    db.add(nuevo_comentario)
    db.commit()
    db.close()

    return jsonify({"status": "ok"}), 201

if __name__ == '__main__':
    app.run(debug=True)
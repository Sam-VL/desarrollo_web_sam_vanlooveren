# CC5002 - Desarrollo de Aplicaciones Web - Tarea 2
Sam Van Looveren

## Ejecución

Para iniciar la aplicación y que se vea todo en orden hay que ejecutar desde la terminal en app.py.
Y hay que ejecutar: python app.py
Luego ingresar al navegador tocando el: http://127.0.0.1:5000

## Diseño
En el diseño me inspire más que nada en como lo construían en los aux, en específico aux 4, 5 y 6
que además esto fueron mi mayor fuente de información que ocupe para hacer mi código.

## Decisiones
1. Como bien dije mucho del código fue construido siguiendo los ejemplos y contenidos de los auxiliares aunque tambien saqué información de las clases tal y como flash, por otro lado hay una parte donde no encontraba información de cómo hacer lo de la transición de elegir comuna y luego región, para esta parte consulté a la ia para posibles soluciones y decidí ocupar Fitch() para solicitar a Flask las comunas correspondientes a la región seleccionada.

2. Como necesitaba que para informar exista el voluntario decidí ocupar el email para identificar al voluntario. Al registrar un avistamiento se comprueba que el email tenga un formato válido y que corresponda a un voluntario que se encuentre en la base de datos.

3. La parte de app.py me quedo un poco desordenada porque decidí poner todas las validaciones del servidor dentro de ahi, pero estas son las mismas que había ocupado en el JavaScript.

4. Perdón por las fotos que ocupe para lo de avistamiento, necesitaba probar si funcionaba correctamente la tabla entonces
coloque fotos aleatorias que tenia

5. En la parte de registrar avistamiento este tipo, como no decía nada el enunciado del decidí mantenerlo pero no había
columna dentro del SQL asi que devuelve solo - en el listado ya que no hay manera de guardarlo. Además en la tabla lo de 
ordenar por, o filtrar por tipo ya no sirven, y decidí no eliminarlo por si en el futuro se ocupan.



# **PRINCIPIOS DE ARQUITECTURA REST**
REST se ha convertido sin lugar a duda en uno de los estilos arquitectónicos más utilizados en la industria, ya que es común ver que casi todas las aplicaciones tienen un API REST que nos permite interactuar con ellas por medio de servicios. ¿Pero qué es exactamente REST y por qué se ha vuelto tan popular?
Lo primero que tenemos que saber es que REST es un conjunto de restricciones que crean un estilo arquitectónico y que es común utilizarse para crear aplicaciones distribuidas. REST fue nombrado por primera vez por Roy Fielding en el año 2000 donde definió a REST.

## **EN RESMEN**
REST proporciona un conjunto de restricciones arquitectónicas que, cuando se aplican como un todo, enfatizan la escalabilidad de las interacciones de los componentes, la generalidad de las interfaces, la implementación independiente de los componentes y los componentes intermedios para reducir la latencia de interacción, reforzar la seguridad y encapsular los sistemas heredados.

1. **Independencia de Interfaz de Usuario y Lógica del Servidor:**
   - *Cliente:* Se encarga de la interfaz de usuario y la interacción con el usuario final. Puede ser una aplicación web, móvil u otro tipo de interfaz.
   - *Servidor:* Se encarga de la lógica de negocio, el almacenamiento de datos y la gestión de recursos.

2. **Solicitud y Respuesta:**
   - *Cliente:* Inicia solicitudes al servidor para acceder a recursos o realizar operaciones.
   - *Servidor:* Responde a las solicitudes del cliente, proporcionando los recursos solicitados o informando sobre el resultado de una operación.

3. **Independencia Tecnológica:**
   - *Cliente:* Puede evolucionar de forma independiente al servidor. Puede ser actualizado o cambiado sin afectar la lógica del servidor.
   - *Servidor:* Puede actualizarse o modificarse sin afectar la interfaz de usuario del cliente, siempre que se mantenga la compatibilidad con la API.

4. **Escalabilidad:**
   - *Cliente:* Puede ejecutarse en dispositivos con recursos limitados, como dispositivos móviles.
   - *Servidor:* Puede escalar horizontalmente para manejar un mayor volumen de solicitudes sin afectar la interfaz de usuario del cliente.

5. **Desacoplamiento:**
   - *Cliente:* No necesita conocer la implementación interna del servidor. Solo interactúa a través de las interfaces proporcionadas por el servidor.
   - *Servidor:* No necesita conocer la interfaz de usuario específica del cliente. Solo se preocupa por procesar las solicitudes y proporcionar respuestas.

6. **Protocolo de Comunicación:**
   - *Cliente:* Se comunica con el servidor mediante solicitudes HTTP (GET, POST, PUT, DELETE, etc.).
   - *Servidor:* Responde a las solicitudes del cliente con códigos de estado y los recursos solicitados.

Al mantener esta separación clara entre el cliente y el servidor, se logra una arquitectura más flexible y fácil de mantener. Cambios en la interfaz de usuario no afectan la lógica del servidor, y viceversa. Además, permite el desarrollo paralelo de estas dos partes del sistema, facilitando la colaboración en equipos grandes.

**Sin estado (stateless):**

Este principio en la arquitectura REST implica que la comunicación entre el cliente y el servidor debe ser sin estado. Esencialmente, cada solicitud del cliente al servidor se trata de manera independiente y no se almacena información sobre el estado del cliente entre peticiones. Cada solicitud debe contener toda la información necesaria para ser procesada, lo que facilita la gestión y escalabilidad del sistema.

**Características clave del principio de sin estado:**

1. **Independencia de Solicitudes:**
   - Cada solicitud del cliente se considera como una entidad independiente y autónoma.
   - No hay dependencia de solicitudes anteriores, lo que simplifica la lógica de procesamiento en el servidor.

2. **Simplicidad en la Gestión del Estado:**
   - El servidor no almacena información sobre el estado del cliente entre peticiones.
   - Cada solicitud debe llevar consigo toda la información necesaria para ser comprendida y procesada.

3. **Escalabilidad Mejorada:**
   - La falta de dependencia del estado entre solicitudes simplifica la gestión y escala bien para manejar un gran número de solicitudes concurrentes.

4. **Facilita la Tolerancia a Fallos:**
   - Dado que cada solicitud es independiente, el sistema es más robusto ante posibles fallos, ya que no hay una dependencia significativa del estado del cliente.

**Beneficios de un Enfoque Stateless:**

- **Escalabilidad Simplificada:** Al no tener que mantener el estado del cliente entre solicitudes, la arquitectura es más fácilmente escalable.

- **Facilita la Tolerancia a Fallos:** La independencia de solicitudes permite que el sistema sea más resistente a fallos, ya que cada solicitud es autónoma.

- **Simplicidad en el Desarrollo y Mantenimiento:** La falta de dependencia de estado entre solicitudes simplifica el desarrollo y mantenimiento del sistema.

- **Mejora en el Rendimiento:** La eliminación de la necesidad de gestionar y mantener el estado del cliente entre solicitudes puede mejorar el rendimiento general del sistema.

Al seguir el principio de sin estado, la arquitectura REST busca optimizar la eficiencia y la simplicidad, lo que resulta en sistemas web flexibles y fáciles de mantener.

**Identificador único (URI):**

En la arquitectura REST, el principio del identificador único (URI) es crucial para garantizar la unicidad y accesibilidad de los recursos. Cada recurso en el sistema debe tener un identificador único e irrepetible, representado por una Uniform Resource Identifier (URI). Estos identificadores proporcionan una forma estándar de localizar y acceder a los recursos a través de la red.

**Características clave del principio del identificador único:**

1. **Unicidad del Identificador:**
   - Cada recurso debe tener un URI único en la red. Esto significa que no puede haber dos o más recursos con el mismo identificador.

2. **Jerarquía Lógica:**
   - Los URIs deben mantener una jerarquía lógica que refleje la estructura y las relaciones entre los recursos. Esto facilita la organización y navegación de la información.

3. **Accesibilidad:**
   - Los URIs permiten la ubicación precisa de un recurso en la red. Al seguir un URI, se puede acceder al recurso correspondiente, ya sea un documento, servicio o cualquier otra entidad.

4. **Estructura Estándar:**
   - Los URIs siguen una estructura estándar, que incluye esquemas como "http://" o "https://" para recursos web. Esto garantiza consistencia en la forma en que se identifican y acceden a los recursos.

**Beneficios del uso de URIs en REST:**

- **Unicidad y Identificación Precisa:** La asignación de un URI único a cada recurso evita conflictos y garantiza la identificación precisa de cada entidad en la red.

- **Navegación Estructurada:** La jerarquía lógica en los URIs facilita la navegación estructurada de los recursos, mejorando la comprensión y organización del sistema.

- **Interconexión y Enlace:** Los URIs permiten la interconexión de recursos a través de referencias, mejorando la capacidad de enlazar y relacionar información dentro del sistema.

- **Compatibilidad y Estándares:** El uso de URIs sigue estándares web ampliamente aceptados, lo que garantiza la compatibilidad y facilita la integración con otras tecnologías y sistemas.

**Ejemplo Práctico:**
Supongamos un sistema de gestión de libros. Cada libro podría tener un URI único como "https://api.libros.com/libros/{id}", donde "{id}" representa un número único para cada libro. Esta estructura proporciona unicidad y permite acceder directamente a la información de un libro específico.

En resumen, el principio del identificador único (URI) en REST es esencial para la organización, identificación precisa y accesibilidad de los recursos en una red. Al seguir este principio, se construyen sistemas web más robustos, interoperables y fáciles de entender.

**Uso correcto de HTTP:**

En la arquitectura REST, el uso adecuado de HTTP es esencial para garantizar la coherencia y la eficacia en las operaciones entre clientes y servidores. Este principio se centra en respetar tanto los verbos (métodos) como los códigos de estado de HTTP para cada operación específica.

**Aspectos clave del uso correcto de HTTP en REST:**

1. **Verbos HTTP:**
   - **GET:** Utilizado para recuperar información de un recurso. No debería tener efectos secundarios en el servidor ni cambiar el estado del sistema.
   - **POST:** Utilizado para enviar datos y crear un nuevo recurso en el servidor. Puede tener efectos secundarios, como la actualización de recursos relacionados.
   - **PUT:** Utilizado para actualizar un recurso existente en el servidor. Debería ser idempotente, es decir, aplicar la misma operación varias veces no debería tener efectos diferentes a aplicarla una sola vez.
   - **DELETE:** Utilizado para eliminar un recurso en el servidor.
   - **PATCH:** Utilizado para realizar modificaciones parciales a un recurso existente.

2. **Códigos de Estado HTTP:**
   - **2xx (Éxito):**
     - **200 OK:** Indica que la solicitud se completó con éxito.
     - **201 Created:** Se utiliza después de una operación POST para indicar que se ha creado un nuevo recurso.
   - **3xx (Redirección):**
     - **301 Moved Permanently:** Indica que la URI del recurso ha cambiado permanentemente.
   - **4xx (Error del Cliente):**
     - **400 Bad Request:** Indica que la solicitud del cliente es incorrecta o no se puede procesar.
     - **401 Unauthorized:** Indica que la autenticación es necesaria y ha fallado o no se ha proporcionado.
     - **404 Not Found:** Indica que el recurso solicitado no se encuentra en el servidor.
   - **5xx (Error del Servidor):**
     - **500 Internal Server Error:** Indica un error interno en el servidor.

**Beneficios del Uso Correcto de HTTP en REST:**

- **Interoperabilidad:** Al seguir los estándares de HTTP, se mejora la interoperabilidad entre diferentes sistemas y plataformas.
- **Claridad y Consistencia:** El uso coherente de verbos y códigos de estado facilita la comprensión y el mantenimiento del sistema.
- **Manejo Eficiente de Errores:** Los códigos de estado HTTP proporcionan información clara sobre el resultado de una solicitud, facilitando el manejo de errores tanto para el cliente como para el servidor.

**Ejemplo Práctico:**
Supongamos una aplicación de gestión de tareas. Para obtener la lista de tareas, se utilizaría un método GET en la URI "https://api.tareas.com/tareas". Para agregar una nueva tarea, se enviaría una solicitud POST a la misma URI. Si se desea actualizar una tarea específica, se utilizaría el método PUT o PATCH en la URI correspondiente.

En resumen, el uso correcto de HTTP en REST es fundamental para establecer una comunicación clara y eficiente entre clientes y servidores. Al seguir estos estándares, se promueve la coherencia, la interoperabilidad y una mejor comprensión de las operaciones dentro del sistema.

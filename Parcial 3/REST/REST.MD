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


# Tutorial: Autenticación con JSON Web Tokens (JWT)
En esta aplicación, implementamos la autenticación de usuarios utilizando JSON Web Tokens (JWT). Este tutorial te guiará a través del proceso de inicio de sesión y acceso a rutas protegidas utilizando tokens JWT.

## Paso 1: Iniciar Sesión
Para iniciar sesión, realiza una solicitud `POST` a la ruta `/login` con las credenciales del usuario en el cuerpo de la solicitud. Las credenciales incluyen un `username` y `password`. Por ejemplo, usando cURL:

```
curl -X POST -H "Content-Type: application/json" -d '{"username":"tu_usuario", "password":"tu_contraseña"}' http://localhost:3000/login
```
La aplicación generará un token de acceso y lo devolverá en la cabecera authorization de la respuesta.
# Paso 2: Acceder a Rutas Protegidas
Para acceder a rutas protegidas, debes incluir el token de acceso en la cabecera authorization de la solicitud. Por ejemplo, para acceder a la ruta /sistema:
```
curl -H "Authorization: tu_token_de_acceso" http://localhost:3000/sistema
```
Si el token de acceso es válido, la aplicación devolverá un mensaje indicando que el acceso ha sido concedido.

# Consejos de Seguridad
## Secreto de JWT:
Asegúrate de usar un secreto fuerte para firmar los tokens JWT. Puedes configurar el secreto en una variable de entorno (SECRET_KEY) para mayor seguridad.

## HTTPS:
Para proteger la transmisión de datos, utiliza HTTPS en producción. Los tokens JWT no deben enviarse sin cifrar a través de conexiones HTTP no seguras.

## Manejo de Errores:
Implementa un manejo de errores robusto para gestionar errores de autenticación y otros posibles fallos en la aplicación.

¡Con estos pasos, has implementado correctamente la autenticación con JWT en tu aplicación Express!

Nota: Este tutorial es solo una guía básica. Asegúrate de investigar y seguir las mejores prácticas de seguridad al implementar la autenticación en entornos de producción.
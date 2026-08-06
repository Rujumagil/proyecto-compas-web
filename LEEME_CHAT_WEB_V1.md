# Compás One — Chat Web V1

Este cambio crea un widget público y bidireccional para `proyectocompas.com`.

## Funciones

- solicita nombre y correo o teléfono antes de iniciar;
- solicita aceptación del aviso de privacidad;
- registra o reutiliza el contacto en el CRM de Proyecto Compás;
- abre una conversación identificada como `Chat web`;
- envía cada mensaje al Super Agente cuando está en modo Supervisado o Autónomo;
- guarda la clasificación, etapa, datos y citas mediante el motor existente;
- permite que un integrante responda desde Compás One;
- actualiza el widget mediante consulta segura cada cuatro segundos;
- restringe el uso a los dominios autorizados;
- limita mensajes repetidos y evita reprocesar el mismo mensaje.

## Orden

1. Ejecutar `supabase/migrations/20260807001000_web_chat_widget_v1.sql`.
2. Subir los archivos del parche a GitHub conservando sus rutas.
3. Esperar a que Vercel muestre `Ready`.
4. Abrir Compás One → Integraciones y copiar el código del Chat Web.
5. Pegar ese código una sola vez antes de `</body>` en el sitio de Proyecto Compás.

No requiere variables nuevas de Vercel.

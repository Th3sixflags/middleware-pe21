# api-steven

API con express y typescript para la clase de porogramacion en middleware

## como correr el proyecto

```
npm install
npm run dev
```

el servidor corre en http://localhost:3000

## la api key valida es: `secreto-demo`

---

## pruebas con curl

### (a) sin api key → 401

```
curl http://localhost:3000/health
```

respuesta:
```
{"error":"API key inválida o ausente"}
```

---

### (b) con api key valida → 200

```
curl -H "x-api-key: secreto-demo" http://localhost:3000/health
```

respuesta:
```
{"status":"ok","ts":"2026-06-11T02:15:43.021Z"}
```

---

### (c) ruta que no existe → 404

```
curl -H "x-api-key: secreto-demo" http://localhost:3000/otraRuta
```

respuesta:
```
{"error":"ruta no encontrada"}
```

### output del deber "TA-2.1 Pruebas unitarias básicas"
```
chininin@192 api-steven % npm test

> api-steven@1.0.0 test
> node --experimental-vm-modules node_modules/jest/bin/jest.js

ts-jest[config] (WARN) message TS151002: Using hybrid module kind (Node16/18/Next) is only supported in "isolatedModules: true". Please set "isolatedModules: true" in your tsconfig.json. To disable this message, you can set "diagnostics.ignoreCodes" to include 151002 in your ts-jest config. See more at https://kulshekhar.github.io/ts-jest/docs/getting-started/options/diagnostics
(node:49421) ExperimentalWarning: VM Modules is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
 PASS  src/middlewares/logger.test.ts
ts-jest[config] (WARN) message TS151002: Using hybrid module kind (Node16/18/Next) is only supported in "isolatedModules: true". Please set "isolatedModules: true" in your tsconfig.json. To disable this message, you can set "diagnostics.ignoreCodes" to include 151002 in your ts-jest config. See more at https://kulshekhar.github.io/ts-jest/docs/getting-started/options/diagnostics
 PASS  src/middlewares/auth.test.ts

Test Suites: 2 passed, 2 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        0.821 s, estimated 1 s
Ran all test suites.
chininin@192 api-steven % 
```

## Documentación del Endpoint (PE-2.2)

* **Método HTTP:** `GET`
* **Ruta:** `/health`
* **Descripción:** Endpoint que verifica el estado de salud del servidor y retorna la marca de tiempo actual.
* **Datos de entrada:** * **Headers:** Requiere la cabecera `x-api-key` para la autenticación. No recibe body ni parámetros en la URL.
* **Respuesta exitosa:** * **200 OK:** Devuelve un JSON con el estado `ok` y el timestamp.
* **Errores posibles:** * **401 Unauthorized:** Devuelve un JSON con un mensaje de error si la `x-api-key` no se envía o es incorrecta.

## Versionado

**Ejemplo de cambio compatible (Backwards-compatible):**
* **El cambio:** Agregar un nuevo campo llamado `"version": "1.0.0"` dentro del JSON de respuesta exitosa del endpoint `GET /health`.
* **Justificación técnica:** Este cambio no rompe la compatibilidad porque las aplicaciones cliente que ya consumen esta API simplemente ignorarán el campo nuevo que no conocen. Seguirán recibiendo los campos `status` y `ts` que originalmente esperaban, por lo que su código no fallará.

**Ejemplo de cambio incompatible (Breaking change):**
* **El cambio:** Cambiar el nombre de la cabecera de autenticación de `x-api-key` a `authorization-token`.
* **Justificación técnica:** Este cambio rompería inmediatamente la integración. Todos los clientes que estén enviando sus peticiones usando la cabecera `x-api-key` empezarían a recibir errores `401 Unauthorized`, ya que el servidor ahora espera un nombre de cabecera distinto. Para hacer esto sin afectar a los usuarios actuales, habría que crear una nueva versión de la API (ej. `/v2/health`).
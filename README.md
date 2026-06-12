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

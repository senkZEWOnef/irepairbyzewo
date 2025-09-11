# Imágenes de iRepair

Esta carpeta contiene todas las imágenes para el sitio web de iRepair.

## Estructura de Carpetas

### `/products/`
Fotos de productos para la tienda:
- **Teléfonos**: iPhone, Samsung, etc. (reacondicionados)
- **Laptops**: MacBook, Dell, HP, etc. (reacondicionados)
- **Tabletas**: iPad, Samsung Tab, etc.
- **Consolas**: PlayStation, Xbox, Nintendo
- **Accesorios**: AirPods, cables, cargadores, fundas

### `/store/`
Fotos del negocio:
- Fachada de la tienda
- Interior del local
- Área de trabajo
- Mostrador de atención
- Logo y señalización

### `/equipment/`
Equipos y herramientas de reparación:
- Estación de soldadura
- Microscopios
- Herramientas de precisión
- Equipos de diagnóstico
- Área de trabajo técnico

### `/repairs/`
Fotos del proceso de reparación:
- Antes y después de reparaciones
- Proceso de desarme
- Componentes reparados
- Técnico trabajando

### `/gallery/`
Galería general:
- Clientes satisfechos
- Eventos especiales
- Certificaciones
- Premios o reconocimientos

## Formato Recomendado

- **Resolución**: Mínimo 800x600px para productos, 1200x800px para fotos del store
- **Formato**: JPG (para fotos), PNG (para logos/iconos con transparencia)
- **Nombres**: Usar nombres descriptivos sin espacios (ej: `iphone_13_pro_azul.jpg`)

## Uso en el Código

Las imágenes se pueden referenciar en el código como:
```javascript
// Para productos
<img src="/images/products/iphone_13_pro.jpg" alt="iPhone 13 Pro" />

// Para fotos del store
<img src="/images/store/fachada_principal.jpg" alt="Fachada iRepair" />
```
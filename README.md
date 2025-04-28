# Paises 🌎

Aplicación Angular para explorar información de países, utilizando estilos modernos con **TailwindCSS** y componentes UI de **PrimeNG**.

Este proyecto fue generado utilizando [Angular CLI](https://github.com/angular/angular-cli) versión **19.1.5** y gestionado con **nvm** versión **22.13.1**.

---

## Tabla de contenidos

- [Descripción](#descripción)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Configuración TailwindCSS](#configuración-tailwindcss)
- [Configuración PrimeNG Themes](#configuración-primeng-themes)
- [Servidor de desarrollo](#servidor-de-desarrollo)
- [Generación de código (Scaffolding)](#generación-de-código-scaffolding)
- [Construcción del proyecto](#construcción-del-proyecto)
- [Ejecución de pruebas unitarias](#ejecución-de-pruebas-unitarias)
- [Pruebas de extremo a extremo (e2e)](#pruebas-de-extremo-a-extremo-e2e)
- [Recursos adicionales](#recursos-adicionales)

---

## Descripción

Proyecto de práctica para manejar peticiones a APIs, uso de componentes PrimeNG y estilizado moderno usando TailwindCSS, sobre la base de Angular 19.

---

## Tecnologías utilizadas

- **Angular** `^19.1.5`
- **PrimeNG** `^19.1.0`
- **PrimeIcons** `^7.0.0`
- **TailwindCSS** `^4.1.4`
- **TailwindCSS PrimeUI** `^0.6.1`

---

## Instalación

1. Asegúrate de tener **Node.js** y **npm** instalados.
2. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
```

3. Instala las dependencias:

```bash
npm install
```

---

## Configuración TailwindCSS

Este proyecto ya está configurado con **TailwindCSS**.  
Sin embargo, si deseas personalizar Tailwind, puedes modificar:

- `tailwind.config.js` — Para agregar temas, colores o extend custom utilities.
- `src/styles.scss` — Para incluir las directivas de Tailwind:

```scss
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Importante:** Asegúrate de que en el `angular.json`, en el apartado `"styles"`, esté referenciado el archivo correcto (`src/styles.scss`).

---

## Configuración PrimeNG Themes

El proyecto usa temas de PrimeNG. Para personalizarlo:

1. En `angular.json`, bajo `"styles"`, asegúrate de importar un tema de PrimeNG, por ejemplo:

```json
"node_modules/primeng/resources/themes/lara-light-indigo/theme.css",
"node_modules/primeng/resources/primeng.min.css",
"node_modules/primeicons/primeicons.css",
```

2. Si quieres cambiar el tema, puedes sustituir `lara-light-indigo` por cualquier otro disponible en PrimeNG, como `lara-dark-blue`, `saga-green`, etc.

Lista de temas disponibles: [Temas de PrimeNG](https://primeng.org/theming)

---

## Servidor de desarrollo

Para iniciar el servidor de desarrollo:

```bash
ng serve
```

Navega a:  
[http://localhost:4200/](http://localhost:4200/)

La aplicación se recargará automáticamente al modificar archivos fuente.

---

## Generación de código (Scaffolding)

Para crear componentes, servicios, directivas, etc., utiliza:

```bash
ng generate component nombre-del-componente
```

Para más opciones:

```bash
ng generate --help
```

---

## Construcción del proyecto

Para construir el proyecto para producción:

```bash
ng build
```

Los archivos se generarán en la carpeta `/dist`.  
Angular aplica optimizaciones automáticas para un mejor rendimiento.

---

## Ejecución de pruebas unitarias

Para ejecutar las pruebas unitarias usando [Karma](https://karma-runner.github.io):

```bash
ng test
```

---

## Pruebas de extremo a extremo (e2e)

Para correr pruebas end-to-end:

```bash
ng e2e
```

> **Nota:** Este proyecto no incluye un framework e2e preinstalado. Se recomienda integrar **Cypress** o **Protractor** si se desea realizar pruebas e2e.

---

## Recursos adicionales

- [Documentación oficial Angular CLI](https://angular.dev/tools/cli)
- [Documentación PrimeNG](https://primeng.org/)
- [Documentación TailwindCSS](https://tailwindcss.com/)
- [TailwindCSS PrimeUI](https://github.com/primefaces/tailwindcss-primeui)

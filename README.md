# This is a NodeJS Template Project

It provides the following features out of the box -

1. Database agnostic design using TypeOrm
2. Uses TypeDi for dependency injection
3. Uses our in house gc-router for routing -
   * Auto-exposes an endpoint at /openapi with the full swagger documentation including all endpoints and request/response models
   * Allows simple CORS configurtion
4. Has required helm and docker config files for a quick K8 deployment
5. Wired in with our in house gc-logger -
   * Hooks into NodeJs call stack to preserve and include a requestId with every log message allowing easy batching of log messages related to a request
   * Hooks into TypeOrm to auto log (can be turned off in prod) all SQL queries executed via TypeOrm
   * Support for console and file logs. File logs can be configured to auto-roll with custom time windows. Old log files will be auto compressed using gzip.
   * Experimental support for OpenTracing
   * Handles NodeJs unhandled promises and unhandled exception logging
6. Comes with ESLint (airbnb + custom) and Prettier wired in
7. Wired in with Husky, LintStaged and commitLint for auto linting on commits

Replace ATemplate with project name.

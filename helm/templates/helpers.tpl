{{/* vim: set filetype=mustache: */}}

{{/* Expand the name of the chart. */}}
{{- define "corona-backend.name" -}}
{{- default .Chart.Name .Values.nameOverride | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/* Set the default version to helm version if no override is provided. */}}
{{- define "corona-backend.version" -}}
{{- default .Chart.AppVersion .Values.image.versionOverride -}}
{{- end -}}

{{/* Create chart name and version as used by the chart label. */}}
{{- define "corona-backend.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "nats.fullname" -}}
{{- printf "%s-%s" .Release.Name "nats" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "corona-backend.certificateIssuer" -}}
{{ if eq (lower .Values.certificates.issuer) "external" }}{{ .Values.certificates.externalIssuerName }}{{ else }}{{ include "corona-backend.name" . }}-issuer{{ end }}
{{- end -}}

{{/* Common labels */}}
{{- define "corona-backend.labels" -}}
helm.sh/chart: {{ include "corona-backend.chart" . }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
app.kubernetes.io/version: {{ include "corona-backend.version" . }}
app.kubernetes.io/copyright: "GamechangeSolutions"
app.kubernetes.io/author: "Adhityan"

app.kubernetes.io/name: {{ include "corona-backend.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}

{{/* Selector labels for core */}}
{{- define "corona-backend.coreSelectorLabels" -}}
app.kubernetes.io/component: "corana-core"
{{- end -}}

{{/* Docker config json */}}
{{- define "corona-backend.docker-config" -}}
{{ if .Files.Glob "auth.docker.json" }}{{ .Files.Get "auth.docker.json" | b64enc }}
{{- else }}{{- printf "{ \"auths\": { \"https://index.docker.io/v1/\": { \"auth\": \"%s\" } } }" (printf "%s:%s" .Values.image.gcCredentials.username .Values.image.gcCredentials.password | b64enc) | b64enc }}{{- end }}
{{- end -}}

{{/* Pull secrets */}}
{{- define "corona-backend.pull-secrets" -}}
{{ if .Values.image.pullSecrets }}
{{- .Values.image.pullSecrets }}
{{- end -}}
{{ if .Values.image.fromGcHub }}
- name: {{ include "corona-backend.name" . }}-docker-config
{{- end -}}
{{- end -}}
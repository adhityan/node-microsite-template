{{/* vim: set filetype=mustache: */}}

{{/* Expand the name of the chart. */}}
{{- define "ATEMPLATE.name" -}}
{{- default .Chart.Name .Values.nameOverride | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/* Set the default version to helm version if no override is provided. */}}
{{- define "ATEMPLATE.version" -}}
{{- default .Chart.AppVersion .Values.image.versionOverride -}}
{{- end -}}

{{/* Create chart name and version as used by the chart label. */}}
{{- define "ATEMPLATE.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "nats.fullname" -}}
{{- printf "%s-%s" .Release.Name "nats" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "ATEMPLATE.certificateIssuer" -}}
{{ if eq (lower .Values.certificates.issuer) "external" }}{{ .Values.certificates.externalIssuerName }}{{ else }}{{ include "ATEMPLATE.name" . }}-issuer{{ end }}
{{- end -}}

{{/* Common labels */}}
{{- define "ATEMPLATE.labels" -}}
helm.sh/chart: {{ include "ATEMPLATE.chart" . }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
app.kubernetes.io/version: {{ include "ATEMPLATE.version" . }}
app.kubernetes.io/copyright: "GamechangeSolutions"
app.kubernetes.io/author: "Adhityan"

app.kubernetes.io/name: {{ include "ATEMPLATE.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}

{{/* Selector labels for core */}}
{{- define "ATEMPLATE.coreSelectorLabels" -}}
app.kubernetes.io/component: "corana-core"
{{- end -}}

{{/* Docker config json */}}
{{- define "ATEMPLATE.docker-config" -}}
{{ if .Files.Glob "auth.docker.json" }}{{ .Files.Get "auth.docker.json" | b64enc }}
{{- else }}{{- printf "{ \"auths\": { \"https://index.docker.io/v1/\": { \"auth\": \"%s\" } } }" (printf "%s:%s" .Values.image.dockerCredentials.username .Values.image.dockerCredentials.password | b64enc) | b64enc }}{{- end }}
{{- end -}}

{{/* Pull secrets */}}
{{- define "ATEMPLATE.pull-secrets" -}}
{{ if .Values.image.pullSecrets }}
{{- .Values.image.pullSecrets }}
{{- end -}}
{{ if .Values.image.fromPrivateDockerHub }}
- name: {{ include "ATEMPLATE.name" . }}-docker-config
{{- end -}}
{{- end -}}
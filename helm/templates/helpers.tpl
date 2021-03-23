{{/* vim: set filetype=mustache: */}}

{{- define "helm-toolkit.utils.joinListWithComma" -}}
{{- $local := dict "first" true -}}
{{- range $k, $v := . -}}{{- if not $local.first -}},{{- end -}}{{- $v -}}{{- $_ := set $local "first" false -}}{{- end -}}
{{- end -}}

{{/* Expand the name of the chart. */}}
{{- define "atemplate.name" -}}
{{- default .Chart.Name .Values.nameOverride | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/* Create chart name and version as used by the chart label. */}}
{{- define "atemplate.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "atemplate.certificateIssuer" -}}
{{ if eq (lower .Values.certificates.issuer) "external" }}{{ .Values.certificates.externalIssuerName }}{{ else }}{{ include "atemplate.name" . }}-issuer{{ end }}
{{- end -}}

{{/* Common labels */}}
{{- define "atemplate.labels" -}}
helm.sh/chart: {{ include "atemplate.chart" . }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
app.kubernetes.io/version: "{{ .Release.Revision }}"
app.kubernetes.io/author: "Adhityan"

app.kubernetes.io/name: {{ include "atemplate.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}

{{/* Selector labels for core */}}
{{- define "atemplate.coreSelectorLabels" -}}
app.kubernetes.io/component: "atemplate-core"
{{- end -}}

{{/* Docker config json */}}
{{- define "atemplate.docker-config" -}}
{{ if .Files.Glob "auth.docker.json" }}{{ .Files.Get "auth.docker.json" | b64enc }}
{{- else }}{{- printf "{ \"auths\": { \"https://index.docker.io/v1/\": { \"auth\": \"%s\" } } }" (printf "%s:%s" .Values.image.hubCredentials.username .Values.image.hubCredentials.password | b64enc) | b64enc }}{{- end }}
{{- end -}}

{{/* Pull secrets */}}
{{- define "atemplate.pull-secrets" -}}
{{ if .Values.image.pullSecrets }}
{{- .Values.image.pullSecrets }}
{{- end -}}
{{ if .Values.image.fromGcHub }}
- name: {{ include "atemplate.name" . }}-docker-config
{{- end -}}
{{- end -}}
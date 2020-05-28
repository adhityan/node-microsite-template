{{- define "gc-chat.nats-env-config" -}}
- name: NATS_HOST
  {{- if .Values.nats.enabled }}
  value: {{ include "nats.fullname" . }}-client
  {{- else }}
  value: {{ .Values.externalNats.host }}
  {{- end }}
- name: NATS_PORT
  {{- if .Values.nats.enabled }}
  value: {{ .Values.nats.client.service.port | quote }}
  {{- else }}
  value: {{ .Values.externalNats.port | quote }}
  {{- end }}
- name: NATS_USERNAME
  {{- if .Values.nats.enabled }}
  value: {{ .Values.nats.auth.user }}
  {{- else }}
  value: {{ .Values.externalNats.username }}
  {{- end }}
- name: NATS_PASSWORD
  {{- if .Values.nats.enabled }}
  value: {{ .Values.nats.auth.password }}
  {{- else }}
  value: {{ .Values.externalNats.password }}
  {{- end }}
# - name: NATS_CLUSTER_NAME
#   {{- if .Values.nats.enabled }}
#   value: {{ .Values.nats.clusterName }}
#   {{- else }}
#   value: {{ .Values.externalNats.clusterName }}
#   {{- end }}
{{- end -}}

{{- define "gc-chat.default-env-config" -}}
- name: NODE_ENV
  valueFrom:
    configMapKeyRef:
      name: {{ include "gc-chat.name" . }}-environment
      key: NODE_ENV
{{ include "gc-chat.nats-env-config" . }}
{{- end -}}
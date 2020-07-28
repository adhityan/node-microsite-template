{{- define "ATEMPLATE.default-env-config" -}}
- name: NODE_ENV
  valueFrom:
    configMapKeyRef:
      name: {{ include "ATEMPLATE.name" . }}-environment
      key: NODE_ENV
{{- end -}}
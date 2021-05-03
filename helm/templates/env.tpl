{{- define "atemplate.default-env-config" -}}
- name: HOST
  valueFrom:
    configMapKeyRef:
      name: {{ include "atemplate.name" . }}-environment
      key: HOST
- name: NODE_ENV
  valueFrom:
    configMapKeyRef:
      name: {{ include "atemplate.name" . }}-environment
      key: NODE_ENV

- name: EXAMPLE
  valueFrom:
    secretKeyRef:
      name: {{ include "atemplate.name" . }}-secret
      key: EXAMPLE

- name: CONTAINER_NAME
  valueFrom:
    fieldRef:
      fieldPath: metadata.name
      
- name: DEBUG
  value: "GCNats:*"
{{- end -}}
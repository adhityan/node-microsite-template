{{- define "atemplate.default-env-config" -}}
- name: NODE_ENV
  valueFrom:
    configMapKeyRef:
      name: {{ include "atemplate.name" . }}-environment
      key: NODE_ENV
- name: INIT_TRACER
  valueFrom:
    configMapKeyRef:
      name: {{ include "atemplate.name" . }}-environment
      key: INIT_TRACER
- name: JAEGER_AGENT_PORT
  valueFrom:
    configMapKeyRef:
      name: {{ include "atemplate.name" . }}-environment
      key: JAEGER_AGENT_PORT
- name: JAEGER_AGENT_HOST
  valueFrom:
    configMapKeyRef:
      name: {{ include "atemplate.name" . }}-environment
      key: JAEGER_AGENT_HOST
- name: JAEGER_SAMPLER_MANAGER_HOST_PORT
  valueFrom:
    configMapKeyRef:
      name: {{ include "atemplate.name" . }}-environment
      key: JAEGER_SAMPLER_MANAGER_HOST_PORT
- name: PRIMARY_HOST_URL
  valueFrom:
    configMapKeyRef:
      name: {{ include "atemplate.name" . }}-environment
      key: PRIMARY_HOST_URL
- name: JAEGER_SERVICE_NAME
  valueFrom:
    configMapKeyRef:
      name: {{ include "atemplate.name" . }}-environment
      key: JAEGER_SERVICE_NAME
- name: JAEGER_SAMPLER_PARAM
  valueFrom:
    configMapKeyRef:
      name: {{ include "atemplate.name" . }}-environment
      key: JAEGER_SAMPLER_PARAM
- name: JAEGER_SAMPLER_TYPE
  valueFrom:
    configMapKeyRef:
      name: {{ include "atemplate.name" . }}-environment
      key: JAEGER_SAMPLER_TYPE
{{- end -}}
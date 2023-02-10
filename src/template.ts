const SCRIPT_TEMPLATE = {
  options: `export default {
  name: '{{componentName}}',
  props: {},
  data() {
    return {};
  },
  mounted() { },
  methods: {}
};`,
  composition: `import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Hola',
  props: {},
  setup() {
    return {};
  }
});`,
};

const getTemplate = (useSetupAttribute: boolean, apiStyle: string) => {
  if (useSetupAttribute) {
    return ``;
  }
  return SCRIPT_TEMPLATE[apiStyle];
};

export function useTemplate(
  componentName: string,
  useSetupAttribute: boolean,
  { apiStyle, scriptLang, templateLang, styleLang }
) {
  debugger;
  const scriptTemplate = getTemplate(useSetupAttribute, apiStyle);

  const template = `${
    useSetupAttribute ? `<script setup lang="${scriptLang}">` : "<script>"
  }
${scriptTemplate.replace(/{{componentName}}/g, componentName)}
</script>

<template lang="${templateLang}">

</template>
  
<style lang="${styleLang}">

</style>
`;

  return template.trimStart();
}

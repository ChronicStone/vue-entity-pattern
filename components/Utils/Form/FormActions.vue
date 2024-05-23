<script setup lang="ts">
const mode = defineProp<'create' | 'update'>('mode', { required: true });
const emit = defineEmits<{
  submit: [];
  cancel: [];
}>();
</script>

<template>
  <div class="mt-6 flex items-center gap-4">
    <NButton @click="emit('cancel')">
      <template #icon>
        <Icon name="mdi:arrow-left" />
      </template>
      <slot name="cancel"> Cancel </slot>
    </NButton>
    <NButton type="primary" @click="emit('submit')">
      <template #icon>
        <Icon :name="mode === 'create' ? 'mdi:content-save' : 'mdi:content-save-edit'" />
      </template>
      <slot name="submit">
        {{ mode === 'create' ? 'Create' : 'Update' }}
      </slot>
    </NButton>
  </div>
</template>

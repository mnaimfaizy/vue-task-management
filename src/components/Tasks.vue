<template>
    <div :key="task.ID" v-for="task in tasks">
        <Task 
            @toggle-reminder="$emit('toggle-reminder', task.ID)"
            @delete-task="$emit('delete-task', task.ID)" 
            :task="task" 
        />
    </div>
</template>

<script>
import Task from './Task'

export default {
    name: 'Tasks',
    props: {
        tasks: Array
    },
    components: {
        Task
    },
    emits: ['delete-task', 'toggle-reminder']
}
</script>